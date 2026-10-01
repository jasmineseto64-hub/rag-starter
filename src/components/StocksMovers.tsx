import React, { useState } from 'react';
import { ChevronRight, TrendingUp, Star, Flame } from 'lucide-react';
import { MarketMover, MarketAsset } from '../types/market';
import {
  VOLUME_STOCKS,
  TOP_GAINERS,
  TOP_LOSERS,
  BIGGEST_COMPANIES,
  generateHistory,
} from '../data/mockMarketData';

interface StocksMoversProps {
  onSelectAsset: (asset: MarketAsset) => void;
  isDarkMode: boolean;
}

export const StocksMovers: React.FC<StocksMoversProps> = ({
  onSelectAsset,
  isDarkMode,
}) => {
  const [activeFilter, setActiveFilter] = useState<'active' | 'gainers' | 'losers'>('active');

  const createAssetFromMover = (m: MarketMover): MarketAsset => {
    const isPositive = m.changePercent >= 0;
    const price = m.price;
    const change = (price * m.changePercent) / 100;
    return {
      id: m.ticker.toLowerCase(),
      ticker: m.ticker,
      name: m.name,
      exchange: 'NASDAQ',
      category: 'us-stocks',
      price: m.price,
      change: Number(change.toFixed(2)),
      changePercent: m.changePercent,
      high: Number((price * 1.02).toFixed(2)),
      low: Number((price * 0.98).toFixed(2)),
      open: Number((price - change).toFixed(2)),
      prevClose: Number((price - change).toFixed(2)),
      volume: m.volumeOrCap,
      marketCap: m.rank ? m.volumeOrCap : undefined,
      sparkline: isPositive ? [18, 14, 16, 11, 8, 4] : [6, 9, 12, 15, 18, 22],
      history: generateHistory(price, m.changePercent),
      badgeColor: m.iconBg,
      badgeText: m.iconText,
      rating: m.changePercent > 5 ? 'Strong Buy' : m.changePercent < -5 ? 'Sell' : 'Buy',
    };
  };

  const currentMoversList =
    activeFilter === 'active'
      ? TOP_GAINERS
      : activeFilter === 'gainers'
      ? TOP_GAINERS
      : TOP_LOSERS;

  const moversTitle =
    activeFilter === 'losers' ? 'Top Losers' : 'Top Gainers';

  return (
    <section className="space-y-4" data-purpose="us-stocks-and-movers">
      {/* Header and Filter Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onSelectAsset(createAssetFromMover(VOLUME_STOCKS[0]))}
          className={`group inline-flex items-center gap-2 text-2xl font-bold tracking-tight transition-colors ${
            isDarkMode ? 'text-white hover:text-tv-blue' : 'text-tv-text hover:text-tv-blue'
          }`}
        >
          US stocks & Movers
          <ChevronRight className="w-5 h-5 text-tv-muted group-hover:translate-x-1 group-hover:text-tv-blue transition-all stroke-[2.5]" />
        </button>

        <div
          className={`flex items-center p-1 rounded-lg text-xs font-bold ${
            isDarkMode ? 'bg-[#1e222d]' : 'bg-tv-card text-tv-muted'
          }`}
        >
          <button
            onClick={() => setActiveFilter('active')}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              activeFilter === 'active'
                ? isDarkMode
                  ? 'bg-[#2a2e39] text-white shadow-xs'
                  : 'bg-white text-tv-text shadow-xs'
                : isDarkMode
                ? 'text-[#787b86] hover:text-white'
                : 'text-tv-muted hover:text-tv-text'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveFilter('gainers')}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              activeFilter === 'gainers'
                ? isDarkMode
                  ? 'bg-[#2a2e39] text-white shadow-xs'
                  : 'bg-white text-tv-text shadow-xs'
                : isDarkMode
                ? 'text-[#787b86] hover:text-white'
                : 'text-tv-muted hover:text-tv-text'
            }`}
          >
            Gainers
          </button>
          <button
            onClick={() => setActiveFilter('losers')}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              activeFilter === 'losers'
                ? isDarkMode
                  ? 'bg-[#2a2e39] text-white shadow-xs'
                  : 'bg-white text-tv-text shadow-xs'
                : isDarkMode
                ? 'text-[#787b86] hover:text-white'
                : 'text-tv-muted hover:text-tv-text'
            }`}
          >
            Losers
          </button>
        </div>
      </div>

      {/* Grid of 3 Column Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Box 1: Highest Volume Stocks */}
        <div
          className={`border rounded-2xl p-5 space-y-4 transition-colors ${
            isDarkMode
              ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
              : 'bg-white border-tv-border text-tv-text'
          }`}
        >
          <div
            className={`flex items-center justify-between border-b pb-3 ${
              isDarkMode ? 'border-[#2a2e39]' : 'border-tv-border'
            }`}
          >
            <h3
              className={`font-bold text-base flex items-center gap-2 ${
                isDarkMode ? 'text-white' : 'text-tv-text'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-tv-blue" />
              Highest volume stocks
            </h3>
            <span className="text-xs text-tv-muted font-medium">Vol</span>
          </div>

          <div className="space-y-2 font-medium text-sm">
            {VOLUME_STOCKS.map((stock) => {
              const isPositive = stock.changePercent >= 0;
              return (
                <div
                  key={stock.ticker}
                  onClick={() => onSelectAsset(createAssetFromMover(stock))}
                  className={`flex items-center justify-between p-2 rounded-xl transition-colors cursor-pointer group ${
                    isDarkMode ? 'hover:bg-[#2a2e39]' : 'hover:bg-tv-card'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      style={{ backgroundColor: stock.iconBg }}
                      className="w-7 h-7 rounded-md text-white text-[11px] font-black flex items-center justify-center shrink-0 shadow-xs"
                    >
                      {stock.iconText}
                    </span>
                    <div>
                      <div
                        className={`font-bold group-hover:text-tv-blue transition-colors ${
                          isDarkMode ? 'text-white' : 'text-tv-text'
                        }`}
                      >
                        {stock.ticker}
                      </div>
                      <div className="text-[11px] text-tv-muted">{stock.name}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`font-bold tabular-nums ${
                        isDarkMode ? 'text-white' : 'text-tv-text'
                      }`}
                    >
                      ${stock.price.toFixed(2)}
                    </div>
                    <div
                      className={`text-xs font-semibold tabular-nums ${
                        isPositive ? 'text-tv-green' : 'text-tv-red'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {stock.changePercent.toFixed(2)}% · {stock.volumeOrCap}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Box 2: Stock Gainers / Losers */}
        <div
          className={`border rounded-2xl p-5 space-y-4 transition-colors ${
            isDarkMode
              ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
              : 'bg-white border-tv-border text-tv-text'
          }`}
        >
          <div
            className={`flex items-center justify-between border-b pb-3 ${
              isDarkMode ? 'border-[#2a2e39]' : 'border-tv-border'
            }`}
          >
            <h3
              className={`font-bold text-base flex items-center gap-2 ${
                isDarkMode ? 'text-white' : 'text-tv-text'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  activeFilter === 'losers' ? 'bg-tv-red' : 'bg-tv-green'
                }`}
              />
              {moversTitle}
            </h3>
            <span className="text-xs text-tv-muted font-medium">Regular hours</span>
          </div>

          <div className="space-y-2 font-medium text-sm">
            {currentMoversList.map((stock) => {
              const isPositive = stock.changePercent >= 0;
              return (
                <div
                  key={stock.ticker}
                  onClick={() => onSelectAsset(createAssetFromMover(stock))}
                  className={`flex items-center justify-between p-2 rounded-xl transition-colors cursor-pointer group ${
                    isDarkMode ? 'hover:bg-[#2a2e39]' : 'hover:bg-tv-card'
                  }`}
                >
                  <div>
                    <div
                      className={`font-bold group-hover:text-tv-blue transition-colors ${
                        isDarkMode ? 'text-white' : 'text-tv-text'
                      }`}
                    >
                      {stock.ticker}
                    </div>
                    <div className="text-[11px] text-tv-muted">{stock.name}</div>
                  </div>

                  <div className="text-right flex items-center gap-3">
                    <div
                      className={`font-bold tabular-nums ${
                        isDarkMode ? 'text-white' : 'text-tv-text'
                      }`}
                    >
                      ${stock.price.toFixed(2)}
                    </div>
                    <div
                      className={`text-xs font-bold px-2 py-0.5 rounded tabular-nums min-w-[70px] text-center ${
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
                      {stock.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Box 3: World's Biggest Companies */}
        <div
          className={`border rounded-2xl p-5 space-y-4 transition-colors ${
            isDarkMode
              ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
              : 'bg-white border-tv-border text-tv-text'
          }`}
        >
          <div
            className={`flex items-center justify-between border-b pb-3 ${
              isDarkMode ? 'border-[#2a2e39]' : 'border-tv-border'
            }`}
          >
            <h3
              className={`font-bold text-base flex items-center gap-2 ${
                isDarkMode ? 'text-white' : 'text-tv-text'
              }`}
            >
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              World biggest companies
            </h3>
            <span className="text-xs text-tv-muted font-medium">Market cap</span>
          </div>

          <div className="space-y-2 font-medium text-sm">
            {BIGGEST_COMPANIES.map((company) => {
              const isPositive = company.changePercent >= 0;
              return (
                <div
                  key={company.ticker}
                  onClick={() => onSelectAsset(createAssetFromMover(company))}
                  className={`flex items-center justify-between p-2 rounded-xl transition-colors cursor-pointer group ${
                    isDarkMode ? 'hover:bg-[#2a2e39]' : 'hover:bg-tv-card'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold text-tv-muted w-4">
                      {company.rank}
                    </span>
                    <div>
                      <div
                        className={`font-bold group-hover:text-tv-blue transition-colors ${
                          isDarkMode ? 'text-white' : 'text-tv-text'
                        }`}
                      >
                        {company.name}
                      </div>
                      <div className="text-[11px] text-tv-muted">{company.ticker}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`font-bold tabular-nums ${
                        isDarkMode ? 'text-white' : 'text-tv-text'
                      }`}
                    >
                      {company.volumeOrCap}
                    </div>
                    <div
                      className={`text-xs font-semibold tabular-nums ${
                        isPositive ? 'text-tv-green' : 'text-tv-red'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {company.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
