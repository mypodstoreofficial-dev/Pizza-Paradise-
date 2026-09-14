import React, { useState } from 'react';
import { 
  Search, 
  Flame, 
  Sparkles, 
  Star, 
  Plus, 
  Check, 
  SlidersHorizontal,
  UtensilsCrossed,
  Filter
} from 'lucide-react';
import { MENU_ITEMS, CATEGORIES } from '../data/menuData';
import { MenuItem, CategoryId, PageId } from '../types';
import { ReturnToHomeButton } from '../components/ReturnToHomeButton';

interface MenuPageProps {
  activeCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectItem: (item: MenuItem) => void;
  onAddToCartDirect: (item: MenuItem) => void;
  onNavigate?: (page: PageId) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSelectItem,
  onAddToCartDirect,
  onNavigate,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');


  const tags = ['all', 'Bestseller', 'Spicy', 'Cheesy', 'Chef Special', 'Popular'];

  // Filter items by category, search query, and tags
  const filteredItems = MENU_ITEMS.filter((item) => {
    // Category match (if activeCategory is 'deals', show deals, otherwise respect filter)
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;

    // Search match
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.urduName && item.urduName.includes(searchQuery));

    // Tag match
    const matchesTag =
      selectedTag === 'all' || (item.tags && item.tags.includes(selectedTag as any));

    return matchesCategory && matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Return to Home Action Bar */}
      {onNavigate && (
        <div className="flex items-center justify-between pb-2 border-b border-stone-800/80">
          <ReturnToHomeButton onNavigateHome={() => onNavigate('home')} />
          <span className="text-xs text-stone-400 font-bold hidden sm:inline">
            🍕 Explore & customize stone-baked delicacies
          </span>
        </div>
      )}

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-950/80 to-amber-950/80 border border-amber-500/40 text-amber-300 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
          <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
          <span>Pakistan's Sovereign Artisanal Hearth</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-serif tracking-tight">
          Our Full Paradise Menu
        </h1>
        <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
          Handcrafted stone-baked pizzas, loaded colossal burgers, creamy Italian pasta bowls, and signature crispy sides.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-stone-400 pt-1">
          <span className="text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
            🇵🇰 Standardized Nationwide Rates (PKR)
          </span>
          <span className="text-amber-300 font-bold bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
            ✓ 100% Real Wisconsin Dairy Mozzarella
          </span>
          <span className="text-stone-300 bg-stone-900 border border-stone-800 px-2.5 py-0.5 rounded-full">
            ⚡ 30-Min Heat Vault Delivery
          </span>
        </div>
      </div>

      {/* Search & Filter Bar with 4-color running border */}
      <div className="card-run-4colors-subtle p-4 rounded-3xl space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search pizza, crown crust, burger, pasta..."
              className="w-full bg-stone-950 border border-stone-700 rounded-2xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs bg-stone-800 w-5 h-5 rounded-full flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Tag Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-xs text-stone-400 font-bold flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              Filter:
            </span>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedTag === tag
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                    : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
                }`}
              >
                {tag === 'all' ? 'All Tags' : tag}
              </button>
            ))}
          </div>

        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-stone-800/80 scrollbar-none">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id as CategoryId)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg shadow-red-600/25'
                    : 'bg-stone-950 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800'
                }`}
              >
                <span className="text-base">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count Info */}
      <div className="flex items-center justify-between text-xs text-stone-400 px-1">
        <span>Showing <strong className="text-amber-400">{filteredItems.length}</strong> items</span>
        {searchQuery && (
          <span>Searching for: "<span className="text-white">{searchQuery}</span>"</span>
        )}
      </div>

      {/* Menu Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-stone-900/50 rounded-3xl border border-stone-800 space-y-3">
          <div className="text-4xl">🍕</div>
          <h3 className="text-lg font-bold text-white font-serif">No items found</h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            We couldn't find anything matching your search. Try searching for "pizza", "burger", or "fajita".
          </p>
          <button
            onClick={() => {
              onSearchChange('');
              onSelectCategory('all');
              setSelectedTag('all');
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 text-xs font-black"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const hasCustomOptions = Boolean(item.sizes?.length || item.crusts?.length);

            return (
              <div
                key={item.id}
                className="card-run-4colors rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-xl hover:-translate-y-1"
              >
                <div>
                  {/* Item Image & Badges */}
                  <div className="relative h-52 overflow-hidden bg-stone-950">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {item.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow ${
                            tag === 'Bestseller'
                              ? 'bg-red-600 text-white'
                              : tag === 'Chef Special'
                              ? 'bg-amber-500 text-stone-950'
                              : tag === 'Spicy'
                              ? 'bg-orange-600 text-white'
                              : 'bg-stone-900/90 text-stone-200 border border-stone-700'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Review Badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-stone-800 text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-white">{item.rating}</span>
                      <span className="text-[10px] text-stone-400">({item.reviewsCount})</span>
                    </div>

                    {item.originalPrice && (
                      <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                        Save Rs. {item.originalPrice - item.price}
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition font-serif">
                        {item.name}
                      </h3>
                      {item.urduName && (
                        <span className="text-xs text-amber-400/80 font-sans shrink-0">
                          {item.urduName}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    {/* Deal Includes preview if deal */}
                    {item.dealIncludes && (
                      <div className="pt-2 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Combo Includes:</span>
                        <div className="space-y-0.5">
                          {item.dealIncludes.slice(0, 2).map((inc, i) => (
                            <div key={i} className="text-[11px] text-stone-300 flex items-center gap-1">
                              <span className="text-emerald-400">✔</span>
                              <span className="truncate">{inc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Price & Actions */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                    <div>
                      {item.originalPrice && (
                        <span className="text-xs text-stone-500 line-through mr-1 font-mono">
                          Rs. {item.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <div className="text-lg font-black text-amber-400 font-mono leading-none">
                        Rs. {item.price.toLocaleString()}
                      </div>
                      {hasCustomOptions && (
                        <span className="text-[10px] text-stone-400">Starting price</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {hasCustomOptions ? (
                        <button
                          onClick={() => onSelectItem(item)}
                          className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition transform active:scale-95"
                        >
                          <SlidersHorizontal className="w-3.5 h-3.5" />
                          <span>Customize</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onAddToCartDirect(item)}
                          className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition transform active:scale-95"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
