import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { AssetCategory } from '../types/market';

interface CategoryNavProps {
  activeCategory: AssetCategory;
  onSelectCategory: (category: AssetCategory) => void;
  isDarkMode: boolean;
}

const CATEGORIES: { id: AssetCategory; label: string }[] = [
  { id: 'indices', label: 'Indices' },
  { id: 'us-stocks', label: 'US stocks' },
  { id: 'world-stocks', label: 'World stocks' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'futures', label: 'Futures & commodities' },
  { id: 'forex', label: 'Forex & currencies' },
  { id: 'bonds', label: 'Government bonds' },
  { id: 'corp-bonds', label: 'Corporate bonds' },
  { id: 'etfs', label: 'ETFs' },
  { id: 'economy', label: 'Economy' },
];

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  isDarkMode,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="space-y-4 pt-4 pb-2">
      {/* Hero Title Section */}
      <div className="relative inline-flex items-center gap-3">
        <h1
          className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
            isDarkMode ? 'text-white' : 'text-tv-text'
          }`}
        >
          Markets, everywhere
        </h1>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-label="Toggle market categories dropdown"
          className={`mt-2 transition-transform ${
            dropdownOpen ? 'rotate-180' : ''
          } ${isDarkMode ? 'text-white hover:text-tv-blue' : 'text-tv-text hover:text-tv-blue'}`}
        >
          <ChevronDown className="w-7 h-7 stroke-[2.5]" />
        </button>

        {dropdownOpen && (
          <div
            className={`absolute left-0 top-full mt-3 w-72 rounded-2xl shadow-2xl border p-3 z-30 animate-in fade-in-50 zoom-in-95 ${
              isDarkMode
                ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
                : 'bg-white border-tv-border text-tv-text'
            }`}
          >
            <div className="text-xs font-bold text-tv-muted px-3 py-1.5 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-tv-blue" />
              Quick Asset Navigation
            </div>
            <div className="grid grid-cols-1 gap-1 mt-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm font-medium rounded-xl transition-colors flex items-center justify-between ${
                    activeCategory === cat.id
                      ? 'bg-tv-blue text-white font-bold'
                      : isDarkMode
                      ? 'hover:bg-[#2a2e39]'
                      : 'hover:bg-tv-card'
                  }`}
                >
                  <span>{cat.label}</span>
                  {activeCategory === cat.id && <span className="text-xs font-semibold">Active</span>}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Market Category Navigation Horizontal Tabs */}
      <nav
        aria-label="Market Categories"
        className={`flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 border-b text-sm font-semibold ${
          isDarkMode ? 'border-[#2a2e39]' : 'border-tv-border'
        }`}
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors cursor-pointer text-sm font-semibold ${
                isActive
                  ? isDarkMode
                    ? 'bg-white text-[#131722]'
                    : 'bg-tv-text text-white'
                  : isDarkMode
                  ? 'bg-[#1e222d] text-[#d1d4dc] hover:bg-[#2a2e39]'
                  : 'bg-tv-card hover:bg-tv-card-hover text-tv-text'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
