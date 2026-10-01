import React from 'react';
import { X, Trash2, ArrowUpRight, ArrowDownRight, Bookmark, Plus } from 'lucide-react';
import { MarketAsset } from '../types/market';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlistAssets: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  onRemoveFromWatchlist: (assetId: string) => void;
  onAddPreset: (asset: MarketAsset) => void;
  recommendedAssets: MarketAsset[];
  isDarkMode: boolean;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlistAssets,
  onSelectAsset,
  onRemoveFromWatchlist,
  onAddPreset,
  recommendedAssets,
  isDarkMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className={`w-screen max-w-md border-l shadow-2xl flex flex-col ${
            isDarkMode
              ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
              : 'bg-white border-tv-border text-tv-text'
          }`}
        >
          {/* Header */}
          <div
            className={`p-5 border-b flex items-center justify-between ${
              isDarkMode ? 'border-[#2a2e39]' : 'border-tv-border'
            }`}
          >
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-tv-blue" />
              <h2 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-tv-text'}`}>
                My Watchlist
              </h2>
              <span className="text-xs bg-tv-blue text-white px-2 py-0.5 rounded-full font-bold">
                {watchlistAssets.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isDarkMode ? 'hover:bg-[#2a2e39] text-gray-400' : 'hover:bg-tv-card text-tv-muted'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {watchlistAssets.length === 0 ? (
              <div className="py-12 text-center space-y-4">
                <Bookmark className="w-12 h-12 mx-auto text-tv-muted/40 stroke-1" />
                <div>
                  <div className="font-bold text-base">Your watchlist is empty</div>
                  <p className="text-xs text-tv-muted max-w-xs mx-auto mt-1">
                    Keep track of your favorite stocks, indices, and crypto in one place.
                  </p>
                </div>

                <div className="pt-4 text-left">
                  <div className="text-xs font-bold text-tv-muted uppercase mb-2">
                    Quick suggestions:
                  </div>
                  <div className="space-y-2">
                    {recommendedAssets.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between p-2.5 rounded-xl border ${
                          isDarkMode
                            ? 'bg-[#2a2e39]/40 border-[#2a2e39]'
                            : 'bg-tv-card/60 border-tv-border'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">{item.ticker}</span>
                          <span className="text-xs text-tv-muted">{item.name}</span>
                        </div>
                        <button
                          onClick={() => onAddPreset(item)}
                          className="px-2.5 py-1 bg-tv-blue hover:bg-tv-blue-hover text-white text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              watchlistAssets.map((asset) => {
                const isPositive = asset.changePercent >= 0;
                return (
                  <div
                    key={asset.id}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all group ${
                      isDarkMode
                        ? 'bg-[#2a2e39]/50 border-[#2a2e39] hover:border-tv-blue/50'
                        : 'bg-tv-card/40 border-tv-border hover:border-tv-blue/40'
                    }`}
                  >
                    <div
                      onClick={() => {
                        onSelectAsset(asset);
                        onClose();
                      }}
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <span
                        style={{ backgroundColor: asset.badgeColor || '#0052cc' }}
                        className="w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center shrink-0"
                      >
                        {asset.badgeText || asset.ticker.slice(0, 3)}
                      </span>
                      <div>
                        <div className="font-bold text-sm group-hover:text-tv-blue transition-colors">
                          {asset.ticker}
                        </div>
                        <div className="text-xs text-tv-muted truncate max-w-[120px]">
                          {asset.name}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-right">
                      <div
                        onClick={() => {
                          onSelectAsset(asset);
                          onClose();
                        }}
                        className="cursor-pointer"
                      >
                        <div className="font-bold text-sm tabular-nums">
                          $
                          {asset.price.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: asset.price < 5 ? 4 : 2,
                          })}
                        </div>
                        <div
                          className={`text-xs font-semibold flex items-center justify-end gap-0.5 tabular-nums ${
                            isPositive ? 'text-tv-green' : 'text-tv-red'
                          }`}
                        >
                          {isPositive ? (
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          ) : (
                            <ArrowDownRight className="w-3.5 h-3.5" />
                          )}
                          <span>{asset.changePercent.toFixed(2)}%</span>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveFromWatchlist(asset.id)}
                        title="Remove from watchlist"
                        className="p-1.5 text-tv-muted hover:text-tv-red hover:bg-tv-red-bg/20 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer */}
          <div
            className={`p-4 border-t text-xs text-tv-muted flex justify-between items-center ${
              isDarkMode ? 'border-[#2a2e39]' : 'border-tv-border'
            }`}
          >
            <span>Auto-synced with session</span>
            <button
              onClick={onClose}
              className="text-tv-blue font-bold hover:underline cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
