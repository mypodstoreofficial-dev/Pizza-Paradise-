import React, { useRef, useState, useEffect } from 'react';
import bg3dImage from '../assets/images/pizza_3d_wallpaper_1788603436434.jpg';
import pizza3dCinematicVideo from '../assets/videos/pizza_3d_cinematic.mp4';
import pizza3dLoopVideo from '../assets/videos/pizza_3d_loop.mp4';

interface ThreeDVideoBackgroundProps {
  isEnabled: boolean;
  videoSource?: string;
  className?: string;
  isPaused?: boolean;
}

export const ThreeDVideoBackground: React.FC<ThreeDVideoBackgroundProps> = ({
  isEnabled,
  videoSource = pizza3dCinematicVideo,
  className = '',
  isPaused = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Play / Pause video control
  useEffect(() => {
    if (!isEnabled || !videoRef.current) return;
    if (isPaused) {
      videoRef.current.pause();
    } else {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy or muted playback handler
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
  }, [isEnabled, isPaused]);

  // Subtle 3D rising fire embers and depth particles effect over the video
  useEffect(() => {
    if (!isEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particles simulating wood-fire oven embers and 3D depth floating specks
    const particleCount = 35;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.4 ? 'rgba(251, 146, 60, ' : 'rgba(253, 224, 71, ',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(249, 115, 22, 0.8)';
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 bg-[#0c0d12] transition-colors duration-500">
        <div className="absolute inset-0 bg-radial from-stone-900/60 to-black/95" />
      </div>
    );
  }

  return (
    <div
      id="threed-video-background-layer"
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-700 select-none ${className}`}
    >
      {/* 3D Video Stream */}
      {!hasError ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          poster={bg3dImage}
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover object-center filter brightness-95 contrast-105 transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-85'
          }`}
        >
          <source src={videoSource} type="video/mp4" />
          <source src={pizza3dLoopVideo} type="video/mp4" />
          <source src="/pizza_3d_cinematic.mp4" type="video/mp4" />
          {/* Fallback image */}
          <img
            src={bg3dImage}
            alt="3D Pizza Background"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </video>
      ) : (
        /* Reliable 3D Ultra-Res Wallpaper Fallback */
        <img
          src={bg3dImage}
          alt="3D Pizza Background"
          className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
          referrerPolicy="no-referrer"
        />
      )}

      {/* 3D Rising Embers Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-[1] opacity-70"
      />

      {/* Atmospheric Overlays for national professional UI legibility */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[0.5px] z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 z-[2]" />
      <div className="absolute inset-0 bg-radial from-transparent via-black/15 to-black/75 pointer-events-none z-[2]" />
    </div>
  );
};
