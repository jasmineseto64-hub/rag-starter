import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { MarketAsset } from '../types/market';

interface CryptoSectionProps {
  cryptoList: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  isDarkMode: boolean;
  tickingAssetId?: string;
  tickingDirection?: 'up' | 'down';
}

export const CryptoSection: React.FC<CryptoSectionProps> = ({
  cryptoList,
  onSelectAsset,
  isDarkMode,
  tickingAssetId,
  tickingDirection,
}) => {
  const [showFullScreener, setShowFullScreener] = useState(false);

  const displayedList = showFullScreener ? cryptoList : cryptoList.slice(0, 4);

  return (
    <section className="space-y-4" data-purpose="crypto-section">
      {/* Header and Screener Link */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onSelectAsset(cryptoList[0])}
          className={`group inline-flex items-center gap-2 text-2xl font-bold tracking-tight transition-colors ${
            isDarkMode ? 'text-white hover:text-tv-blue' : 'text-tv-text hover:text-tv-blue'
          }`}
        >
          Crypto
          <ChevronRight className="w-5 h-5 text-tv-muted group-hover:translate-x-1 group-hover:text-tv-blue transition-all stroke-[2.5]" />
        </button>

        <button
          onClick={() => setShowFullScreener(!showFullScreener)}
          className="text-xs font-bold text-tv-blue hover:underline cursor-pointer"
        >
          {showFullScreener ? 'Hide extra coins ↑' : 'Full crypto screener →'}
        </button>
      </div>

      {/* Crypto Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedList.map((crypto) => {
          const isPositive = crypto.changePercent >= 0;
          const isTicking = tickingAssetId === crypto.id;
          const flashClass = isTicking
            ? tickingDirection === 'up'
              ? 'flash-up'
              : 'flash-down'
            : '';

          return (
            <div
              key={crypto.id}
              onClick={() => onSelectAsset(crypto)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectAsset(crypto)}
              className={`border rounded-2xl p-4 transition-all duration-150 shadow-xs cursor-pointer select-none group ${
                isDarkMode
                  ? 'bg-[#1e222d] border-[#2a2e39] hover:border-tv-blue/60 hover:shadow-md'
                  : 'bg-white border-tv-border hover:border-tv-blue/50 hover:shadow'
              } ${flashClass}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    style={{ backgroundColor: crypto.badgeColor || '#f7931a' }}
                    className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs"
                  >
                    {crypto.badgeText || 'C'}
                  </div>
                  <div>
                    <div
                      className={`font-bold text-sm group-hover:text-tv-blue transition-colors ${
                        isDarkMode ? 'text-white' : 'text-tv-text'
                      }`}
                    >
                      {crypto.ticker}
                    </div>
                    <div className="text-[11px] text-tv-muted">{crypto.name}</div>
                  </div>
                </div>

                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded tabular-nums ${
                    isPositive
                      ? isDarkMode
                        ? 'bg-[#089981]/20 text-tv-green'
                        : 'bg-tv-green-bg text-tv-green'
                      : isDarkMode
                      ? 'bg-[#f23645]/20 text-tv-red'
                      : 'bg-tv-red-bg text-tv-red'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {crypto.changePercent.toFixed(2)}%
                </span>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <span
                  className={`text-xl font-bold tracking-tight tabular-nums ${
                    isDarkMode ? 'text-white' : 'text-tv-text'
                  }`}
                >
                  $
                  {crypto.price >= 100
                    ? crypto.price.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : crypto.price.toFixed(4)}
                </span>
                <span className="text-xs text-tv-muted tabular-nums">
                  Cap {crypto.marketCap}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
