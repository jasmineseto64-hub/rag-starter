import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MarketAsset } from '../types/market';

interface QuickIndicesProps {
  indices: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  isDarkMode: boolean;
  tickingAssetId?: string;
  tickingDirection?: 'up' | 'down';
}

export const QuickIndices: React.FC<QuickIndicesProps> = ({
  indices,
  onSelectAsset,
  isDarkMode,
  tickingAssetId,
  tickingDirection,
}) => {
  return (
    <section className="space-y-4" data-purpose="quick-indices-hero">
      {/* Header with caret and market status */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onSelectAsset(indices[0])}
          className={`group inline-flex items-center gap-2 text-2xl font-bold tracking-tight transition-colors ${
            isDarkMode ? 'text-white hover:text-tv-blue' : 'text-tv-text hover:text-tv-blue'
          }`}
        >
          Indices
          <ChevronRight className="w-5 h-5 text-tv-muted group-hover:translate-x-1 group-hover:text-tv-blue transition-all stroke-[2.5]" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-tv-muted">
          <span className="inline-block w-2 h-2 rounded-full bg-tv-green animate-pulse" />
          <span>US Markets Open</span>
        </div>
      </div>

      {/* Quick Cards Row (6 columns on lg) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {indices.map((item) => {
          const isPositive = item.change >= 0;
          const isTicking = tickingAssetId === item.id;
          const flashClass = isTicking
            ? tickingDirection === 'up'
              ? 'flash-up'
              : 'flash-down'
            : '';

          return (
            <div
              key={item.id}
              onClick={() => onSelectAsset(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectAsset(item)}
              className={`rounded-2xl p-4 transition-all duration-150 flex flex-col justify-between border cursor-pointer select-none group ${
                isDarkMode
                  ? 'bg-[#1e222d] hover:bg-[#2a2e39] border-[#2a2e39] hover:border-gray-600'
                  : 'bg-tv-card hover:bg-tv-card-hover border-transparent hover:border-tv-border'
              } ${flashClass}`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  style={{ backgroundColor: item.badgeColor || '#0052cc' }}
                  className="w-7 h-7 rounded-full text-white text-[10px] font-bold flex items-center justify-center tracking-tight shadow-xs shrink-0"
                >
                  {item.badgeText || item.ticker.slice(0, 3)}
                </span>
                <span
                  className={`font-bold text-sm truncate ${
                    isDarkMode ? 'text-white group-hover:text-tv-blue' : 'text-tv-text group-hover:text-tv-blue'
                  } transition-colors`}
                >
                  {item.name}
                </span>
              </div>

              <div className="mt-3">
                <div
                  className={`text-xl font-bold tracking-tight tabular-nums ${
                    isDarkMode ? 'text-white' : 'text-tv-text'
                  }`}
                >
                  {item.price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div
                  className={`text-xs font-semibold mt-0.5 flex items-center gap-1 tabular-nums ${
                    isPositive ? 'text-tv-green' : 'text-tv-red'
                  }`}
                >
                  <span>
                    {isPositive ? '+' : ''}
                    {item.change.toFixed(2)}
                  </span>
                  <span>
                    ({isPositive ? '+' : ''}
                    {item.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
