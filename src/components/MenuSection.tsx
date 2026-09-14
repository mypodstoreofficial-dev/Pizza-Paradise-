import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  Sparkles, 
  Star, 
  Plus, 
  Search, 
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { MenuItem, CategoryId } from '../types';

interface MenuSectionProps {
  menuItems: MenuItem[];
  activeCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectItem: (item: MenuItem) => void;
  onAddToCartDirect: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  menuItems,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSelectItem,
  onAddToCartDirect,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const categories = [
    { id: 'all', label: 'All Items', icon: '🍽️' },
    { id: 'pizzas', label: 'Signature Pizzas', icon: '🍕' },
    { id: 'burgers', label: 'Gourmet Burgers', icon: '🍔' },
    { id: 'pastas', label: 'Rich Pastas', icon: '🍝' },
    { id: 'deals', label: 'Mega Deals', icon: '🎁' },
    { id: 'appetizers', label: 'Crispy Sides', icon: '🍗' },
    { id: 'drinks', label: 'Drinks & Desserts', icon: '🥤' },
  ] as const;

  const tagFilters = ['All', 'Bestseller', 'Chef Special', 'Spicy', 'Cheesy', 'Vegetarian'];

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Tag filter
      if (selectedTag !== 'All' && !item.tags?.includes(selectedTag as any)) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesUrdu = item.urduName?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesUrdu) {
          return false;
        }
      }
      return true;
    });
  }, [menuItems, activeCategory, selectedTag, searchQuery]);

  return (
    <section id="full-menu" className="py-16 bg-stone-900/40 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Freshly Prepared On Order
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-serif mt-3">
            Explore The Paradise Menu
          </h2>
          <p className="text-sm sm:text-base text-stone-400 mt-2">
            Handmade stone-baked pizzas, 100% smashed beef & crispy zinger burgers, rich parmesan pastas, and signature appetizers.
          </p>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none no-scrollbar justify-start md:justify-center">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as CategoryId)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20 scale-105'
                    : 'bg-stone-950 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tag Filters & Search Bar Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 mb-8 pt-4 border-t border-stone-800/80">
          
          {/* Tag Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-stone-400 mr-1 hidden lg:inline">Filter:</span>
            {tagFilters.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  selectedTag === tag
                    ? 'bg-red-600 text-white shadow'
                    : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search dishes or ingredients..."
              className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* Results Counter */}
        <div className="text-xs text-stone-400 mb-6">
          Showing <span className="font-bold text-white">{filteredItems.length}</span> delicious items
          {searchQuery && <span> matching "{searchQuery}"</span>}
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-stone-950 border border-stone-800 rounded-3xl p-12 text-center max-w-md mx-auto">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-white">No items found</h3>
            <p className="text-xs text-stone-400 mt-1">
              Try searching with different keywords or reset the category filters.
            </p>
            <button
              onClick={() => {
                onSearchChange('');
                setSelectedTag('All');
                onSelectCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const hasCustomizations = Boolean(item.sizes?.length || item.crusts?.length || item.addons?.length);

              return (
                <div
                  key={item.id}
                  className="group flex flex-col bg-stone-950 border border-stone-800 hover:border-amber-500/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300"
                >
                  {/* Item Image with Tags */}
                  <div className="relative h-52 overflow-hidden cursor-pointer" onClick={() => onSelectItem(item)}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/20" />

                    {/* Tags pill */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {item.tags?.map((t, idx) => (
                        <span
                          key={idx}
                          className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow ${
                            t === 'Bestseller'
                              ? 'bg-amber-500 text-stone-950'
                              : t === 'Spicy'
                              ? 'bg-red-600 text-white'
                              : t === 'Chef Special'
                              ? 'bg-purple-600 text-white'
                              : t === 'Vegetarian'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-stone-800 text-stone-200'
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Rating badge */}
                    <div className="absolute top-3 right-3 bg-stone-900/90 backdrop-blur-xs border border-stone-700 text-amber-400 text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 shadow">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{item.rating}</span>
                      <span className="text-[10px] text-stone-400">({item.reviewsCount})</span>
                    </div>

                    {/* Category Label */}
                    <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-xs text-[10px] font-extrabold uppercase tracking-wider text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                      {item.category.toUpperCase()}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3
                            onClick={() => onSelectItem(item)}
                            className="text-base sm:text-lg font-black text-white group-hover:text-amber-400 transition-colors font-serif leading-tight cursor-pointer"
                          >
                            {item.name}
                          </h3>
                          {item.urduName && (
                            <p className="text-xs text-stone-500 font-sans mt-0.5">{item.urduName}</p>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Sizes preview if available */}
                      {item.sizes && (
                        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-stone-400">
                          <span className="font-semibold text-stone-300">Sizes:</span>
                          <div className="flex flex-wrap gap-1">
                            {item.sizes.map((s, idx) => (
                              <span key={idx} className="bg-stone-900 border border-stone-800 px-1.5 py-0.5 rounded text-[10px] text-stone-300">
                                {s.name.split(' ')[0]}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Price & Add Action */}
                    <div className="pt-4 mt-4 border-t border-stone-800/90 flex items-center justify-between gap-3">
                      <div>
                        {item.originalPrice && (
                          <div className="text-[11px] text-stone-500 line-through">
                            Rs. {item.originalPrice.toLocaleString()}
                          </div>
                        )}
                        <div className="text-lg font-black text-amber-400 font-mono">
                          <span className="text-xs text-stone-400 font-normal">From </span>
                          Rs. {item.price.toLocaleString()}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectItem(item)}
                          className="px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-700 text-xs font-bold transition flex items-center gap-1"
                        >
                          <span>{hasCustomizations ? 'Customize' : 'Details'}</span>
                        </button>

                        <button
                          onClick={() => onAddToCartDirect(item)}
                          className="p-2 sm:px-3 sm:py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition shadow-md flex items-center gap-1"
                          title="Add to Cart"
                        >
                          <Plus className="w-4 h-4 stroke-[3]" />
                          <span className="hidden sm:inline">Add</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
