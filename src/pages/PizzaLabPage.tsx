import React from 'react';
import { CustomPizzaBuilder } from '../components/CustomPizzaBuilder';
import { CartItem, PageId } from '../types';
import { ReturnToHomeButton } from '../components/ReturnToHomeButton';

interface PizzaLabPageProps {
  onAddCustomPizzaToCart: (customPizza: CartItem) => void;
  onNavigate?: (page: PageId) => void;
}

export const PizzaLabPage: React.FC<PizzaLabPageProps> = ({
  onAddCustomPizzaToCart,
  onNavigate,
}) => {
  return (
    <div className="pb-16 space-y-6">
      {onNavigate && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800/80">
            <ReturnToHomeButton onNavigateHome={() => onNavigate('home')} />
            <span className="text-xs text-amber-400 font-bold hidden sm:inline">
              ✨ Interactive 3D Custom Pizza Lab
            </span>
          </div>
        </div>
      )}
      <CustomPizzaBuilder onAddCustomPizzaToCart={onAddCustomPizzaToCart} />
    </div>
  );
};

