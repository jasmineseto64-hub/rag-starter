import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { MarketAsset, AssetCategory } from '../types/market';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allAssets: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  isDarkMode: boolean;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  allAssets,
  onSelectAsset,
  isDarkMode,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'indices', label: 'Indices' },
    { id: 'us-stocks', label: 'Stocks' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'futures', label: 'Futures' },
    { id: 'forex', label: 'Forex' },
    { id: 'bonds', label: 'Bonds' },
  ];

  const filteredAssets = allAssets.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      item.category === selectedCategory ||
      (selectedCategory === 'us-stocks' && (item.category === 'us-stocks' || item.category === 'world-stocks'));

    const q = query.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesQuery =
      item.ticker.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q) ||
      item.exchange.toLowerCase().includes(q);

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col ${
          isDarkMode
            ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
            : 'bg-white border-tv-border text-tv-text'
        }`}
      >
        {/* Search Input Bar */}
        <div
          className={`flex items-center px-4 py-3.5 border-b gap-3 ${
            isDarkMode ? 'border-[#2a2e39]' : 'border-tv-border'
          }`}
        >
          <Search className="w-5 h-5 text-tv-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search markets, stocks, crypto, indices... (e.g. NVDA, SPX, BTC)"
            className={`w-full text-base bg-transparent outline-none placeholder-tv-muted ${
              isDarkMode ? 'text-white' : 'text-tv-text'
            }`}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-tv-muted hover:text-tv-text p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd
            onClick={onClose}
            className={`text-xs px-2 py-1 rounded cursor-pointer ${
              isDarkMode ? 'bg-[#2a2e39] text-gray-400' : 'bg-tv-card text-tv-muted'
            }`}
          >
            ESC
          </kbd>
        </div>

        {/* Filter categories bar */}
        <div
          className={`flex items-center gap-1.5 px-4 py-2 border-b overflow-x-auto no-scrollbar text-xs font-semibold ${
            isDarkMode ? 'border-[#2a2e39] bg-[#1a1e27]' : 'border-tv-border bg-tv-card/40'
          }`}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-tv-blue text-white'
                  : isDarkMode
                  ? 'hover:bg-[#2a2e39] text-[#787b86]'
                  : 'hover:bg-tv-card text-tv-muted'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-tv-border/40 p-2">
          {filteredAssets.length === 0 ? (
            <div className="py-12 text-center text-tv-muted space-y-2">
              <Sparkles className="w-8 h-8 mx-auto text-tv-muted/50" />
              <div className="font-semibold text-sm">No symbols match "{query}"</div>
              <div className="text-xs">Try searching for S&P 500, Tesla, Bitcoin, or Apple.</div>
            </div>
          ) : (
            filteredAssets.map((asset) => {
              const isPositive = asset.changePercent >= 0;
              return (
                <div
                  key={asset.id}
                  onClick={() => {
                    onSelectAsset(asset);
                    onClose();
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl transition-colors cursor-pointer group ${
                    isDarkMode ? 'hover:bg-[#2a2e39]' : 'hover:bg-tv-card'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      style={{ backgroundColor: asset.badgeColor || '#0052cc' }}
                      className="w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center shrink-0 shadow-xs"
                    >
                      {asset.badgeText || asset.ticker.slice(0, 3)}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold group-hover:text-tv-blue transition-colors ${
                            isDarkMode ? 'text-white' : 'text-tv-text'
                          }`}
                        >
                          {asset.ticker}
                        </span>
                        <span className="text-[11px] text-tv-muted font-medium">
                          {asset.exchange}
                        </span>
                      </div>
                      <div className="text-xs text-tv-muted truncate max-w-xs sm:max-w-md">
                        {asset.name}
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-4">
                    <div>
                      <div
                        className={`font-bold text-sm tabular-nums ${
                          isDarkMode ? 'text-white' : 'text-tv-text'
                        }`}
                      >
                        $
                        {asset.price.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: asset.price < 5 ? 4 : 2,
                        })}
                      </div>
                      <div
                        className={`text-xs font-semibold tabular-nums ${
                          isPositive ? 'text-tv-green' : 'text-tv-red'
                        }`}
                      >
                        {isPositive ? '+' : ''}
                        {asset.changePercent.toFixed(2)}%
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-tv-muted opacity-0 group-hover:opacity-100 group-hover:text-tv-blue transition-opacity" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Search Modal Footer */}
        <div
          className={`p-3 text-xs text-tv-muted border-t flex justify-between items-center ${
            isDarkMode ? 'border-[#2a2e39] bg-[#1a1e27]' : 'border-tv-border bg-tv-card/20'
          }`}
        >
          <span>Tip: Type any ticker like SPX or NVDA</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
