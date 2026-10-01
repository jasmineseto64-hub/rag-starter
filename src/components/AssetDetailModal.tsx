import React, { useState } from 'react';
import { X, Bookmark, BookmarkCheck, TrendingUp, BarChart2, Bell, Share2, Compass } from 'lucide-react';
import { MarketAsset } from '../types/market';

interface AssetDetailModalProps {
  asset: MarketAsset;
  onClose: () => void;
  isDarkMode: boolean;
  isWatchlisted: boolean;
  onToggleWatchlist: (assetId: string) => void;
}

type Timeframe = '1D' | '1W' | '1M' | '1Y' | 'ALL';
type ChartStyle = 'area' | 'candles';

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  asset,
  onClose,
  isDarkMode,
  isWatchlisted,
  onToggleWatchlist,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [chartStyle, setChartStyle] = useState<ChartStyle>('area');
  const [hoveredPoint, setHoveredPoint] = useState<{
    time: string;
    price: number;
    volume: number;
    x: number;
    y: number;
  } | null>(null);
  const [alertSuccess, setAlertSuccess] = useState(false);

  const series = asset.history[timeframe] || asset.history['1D'];
  const minPrice = Math.min(...series.map((p) => p.price));
  const maxPrice = Math.max(...series.map((p) => p.price));
  const priceRange = maxPrice - minPrice || 1;
  const maxVol = Math.max(...series.map((p) => p.volume));

  const chartWidth = 720;
  const chartHeight = 280;
  const paddingBottom = 40;
  const paddingTop = 20;
  const usableHeight = chartHeight - paddingTop - paddingBottom;

  // Calculate coordinates for SVG area/line chart
  const points = series.map((pt, index) => {
    const x = (index / (series.length - 1)) * (chartWidth - 20) + 10;
    const y = chartHeight - paddingBottom - ((pt.price - minPrice) / priceRange) * usableHeight;
    return { ...pt, x, y };
  });

  const pathD = points.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x},${pt.y}`, '');
  const areaD = `${pathD} L ${points[points.length - 1].x},${chartHeight - paddingBottom} L ${points[0].x},${chartHeight - paddingBottom} Z`;

  const isPositive = asset.changePercent >= 0;
  const strokeColor = isPositive ? '#089981' : '#f23645';
  const fillColor = isPositive ? 'rgba(8, 153, 129, 0.12)' : 'rgba(242, 54, 69, 0.12)';

  const handleSetAlert = () => {
    setAlertSuccess(true);
    setTimeout(() => setAlertSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border shadow-2xl flex flex-col ${
          isDarkMode
            ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
            : 'bg-white border-tv-border text-tv-text'
        }`}
      >
        {/* Modal Top Bar */}
        <div
          className={`flex items-center justify-between p-5 border-b sticky top-0 z-20 ${
            isDarkMode ? 'bg-[#1e222d] border-[#2a2e39]' : 'bg-white border-tv-border'
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              style={{ backgroundColor: asset.badgeColor || '#0052cc' }}
              className="w-9 h-9 rounded-full text-white text-xs font-bold flex items-center justify-center shadow-xs"
            >
              {asset.badgeText || asset.ticker.slice(0, 3)}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xl font-extrabold ${isDarkMode ? 'text-white' : 'text-tv-text'}`}>
                  {asset.ticker}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-tv-card text-tv-muted font-medium">
                  {asset.exchange}
                </span>
                <span className="text-xs text-tv-muted font-medium hidden sm:inline">
                  {asset.category.toUpperCase()}
                </span>
              </div>
              <div className="text-xs text-tv-muted font-medium">{asset.name}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWatchlist(asset.id)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                isWatchlisted
                  ? 'bg-tv-blue text-white border-tv-blue'
                  : isDarkMode
                  ? 'border-[#2a2e39] hover:bg-[#2a2e39]'
                  : 'border-tv-border hover:bg-tv-card'
              }`}
            >
              {isWatchlisted ? (
                <>
                  <BookmarkCheck className="w-4 h-4" />
                  <span className="hidden sm:inline">Watchlisted</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span className="hidden sm:inline">Watchlist</span>
                </>
              )}
            </button>

            <button
              onClick={handleSetAlert}
              className={`p-2 rounded-xl border transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                alertSuccess
                  ? 'bg-tv-green text-white border-tv-green'
                  : isDarkMode
                  ? 'border-[#2a2e39] hover:bg-[#2a2e39]'
                  : 'border-tv-border hover:bg-tv-card'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">{alertSuccess ? 'Alert Active' : 'Set Alert'}</span>
            </button>

            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isDarkMode ? 'hover:bg-[#2a2e39] text-gray-400' : 'hover:bg-tv-card text-tv-muted'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Price Header & Dynamic Point display */}
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <div
                className={`text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums ${
                  isDarkMode ? 'text-white' : 'text-tv-text'
                }`}
              >
                $
                {(hoveredPoint ? hoveredPoint.price : asset.price).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: asset.price < 5 ? 4 : 2,
                })}
              </div>

              <div className="flex items-center gap-2 mt-1 text-sm font-semibold tabular-nums">
                <span className={isPositive ? 'text-tv-green' : 'text-tv-red'}>
                  {isPositive ? '+' : ''}
                  {asset.change.toFixed(2)} ({isPositive ? '+' : ''}
                  {asset.changePercent.toFixed(2)}%)
                </span>
                <span className="text-tv-muted text-xs">
                  {hoveredPoint ? `at ${hoveredPoint.time}` : 'Today / Regular hours'}
                </span>
              </div>
            </div>

            {/* Timeframe & Chart Style Toolbar */}
            <div className="flex flex-wrap items-center gap-2">
              <div
                className={`flex items-center p-1 rounded-xl text-xs font-bold ${
                  isDarkMode ? 'bg-[#2a2e39]' : 'bg-tv-card'
                }`}
              >
                {(['1D', '1W', '1M', '1Y', 'ALL'] as Timeframe[]).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      timeframe === tf
                        ? isDarkMode
                          ? 'bg-[#1e222d] text-white shadow-xs'
                          : 'bg-white text-tv-text shadow-xs'
                        : isDarkMode
                        ? 'text-gray-400 hover:text-white'
                        : 'text-tv-muted hover:text-tv-text'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              <div
                className={`flex items-center p-1 rounded-xl text-xs font-bold ${
                  isDarkMode ? 'bg-[#2a2e39]' : 'bg-tv-card'
                }`}
              >
                <button
                  onClick={() => setChartStyle('area')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    chartStyle === 'area'
                      ? isDarkMode
                        ? 'bg-[#1e222d] text-white'
                        : 'bg-white text-tv-text'
                      : 'text-tv-muted'
                  }`}
                  title="Area Chart"
                >
                  <TrendingUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setChartStyle('candles')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    chartStyle === 'candles'
                      ? isDarkMode
                        ? 'bg-[#1e222d] text-white'
                        : 'bg-white text-tv-text'
                      : 'text-tv-muted'
                  }`}
                  title="Candlestick Chart"
                >
                  <BarChart2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Chart Canvas */}
          <div
            className={`relative rounded-2xl border p-2 sm:p-4 overflow-hidden select-none ${
              isDarkMode ? 'bg-[#131722] border-[#2a2e39]' : 'bg-[#fafbfc] border-tv-border'
            }`}
          >
            <svg
              className="w-full h-64 sm:h-72 overflow-visible"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              preserveAspectRatio="none"
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={strokeColor} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={strokeColor} stopOpacity={0.0} />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line
                x1="0"
                y1={paddingTop}
                x2={chartWidth}
                y2={paddingTop}
                stroke={isDarkMode ? '#2a2e39' : '#e0e3eb'}
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1={chartHeight / 2}
                x2={chartWidth}
                y2={chartHeight / 2}
                stroke={isDarkMode ? '#2a2e39' : '#e0e3eb'}
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1={chartHeight - paddingBottom}
                x2={chartWidth}
                y2={chartHeight - paddingBottom}
                stroke={isDarkMode ? '#2a2e39' : '#e0e3eb'}
                strokeDasharray="4 4"
                strokeWidth="1"
              />

              {/* Volume Bars at bottom */}
              {series.map((pt, i) => {
                const barWidth = (chartWidth / series.length) * 0.45;
                const barHeight = (pt.volume / maxVol) * 35;
                const x = (i / (series.length - 1)) * (chartWidth - 20) + 10 - barWidth / 2;
                const y = chartHeight - paddingBottom - barHeight;
                return (
                  <rect
                    key={i}
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill={isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}
                    rx="1"
                  />
                );
              })}

              {/* Area Chart Mode */}
              {chartStyle === 'area' ? (
                <>
                  <path d={areaD} fill="url(#chartGradient)" />
                  <path
                    d={pathD}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              ) : (
                /* Candlestick Style Representation */
                series.map((pt, i) => {
                  const candleWidth = 14;
                  const x = (i / (series.length - 1)) * (chartWidth - 20) + 10;
                  const prevP = i > 0 ? series[i - 1].price : pt.price * 0.99;
                  const candleUp = pt.price >= prevP;
                  const bodyColor = candleUp ? '#089981' : '#f23645';

                  const yHigh = chartHeight - paddingBottom - ((Math.max(pt.price, prevP) * 1.004 - minPrice) / priceRange) * usableHeight;
                  const yLow = chartHeight - paddingBottom - ((Math.min(pt.price, prevP) * 0.996 - minPrice) / priceRange) * usableHeight;
                  const yTop = chartHeight - paddingBottom - ((Math.max(pt.price, prevP) - minPrice) / priceRange) * usableHeight;
                  const yBottom = chartHeight - paddingBottom - ((Math.min(pt.price, prevP) - minPrice) / priceRange) * usableHeight;
                  const bodyHeight = Math.max(yBottom - yTop, 3);

                  return (
                    <g key={i}>
                      <line x1={x} y1={yHigh} x2={x} y2={yLow} stroke={bodyColor} strokeWidth="1.5" />
                      <rect
                        x={x - candleWidth / 2}
                        y={yTop}
                        width={candleWidth}
                        height={bodyHeight}
                        fill={bodyColor}
                        rx="1"
                      />
                    </g>
                  );
                })
              )}

              {/* Interactive Hover Point & Crosshairs */}
              {hoveredPoint && (
                <>
                  <line
                    x1={hoveredPoint.x}
                    y1="0"
                    x2={hoveredPoint.x}
                    y2={chartHeight - paddingBottom}
                    stroke="#2962ff"
                    strokeDasharray="3 3"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="0"
                    y1={hoveredPoint.y}
                    x2={chartWidth}
                    y2={hoveredPoint.y}
                    stroke="#2962ff"
                    strokeDasharray="3 3"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={hoveredPoint.x}
                    cy={hoveredPoint.y}
                    r="5"
                    fill="#2962ff"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                  />
                </>
              )}

              {/* Invisible interactive hover hit areas */}
              {points.map((pt, i) => (
                <rect
                  key={i}
                  x={pt.x - chartWidth / series.length / 2}
                  y="0"
                  width={chartWidth / series.length}
                  height={chartHeight}
                  fill="transparent"
                  className="cursor-crosshair"
                  onMouseEnter={() => setHoveredPoint(pt)}
                />
              ))}
            </svg>

            {/* Time labels bottom axis */}
            <div className="flex justify-between items-center px-2 text-[11px] text-tv-muted font-medium">
              {series.map((pt, i) => (
                <span key={i}>{pt.time}</span>
              ))}
            </div>
          </div>

          {/* Key Fundamentals & Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div
              className={`p-3.5 rounded-xl border ${
                isDarkMode ? 'bg-[#2a2e39]/40 border-[#2a2e39]' : 'bg-tv-card/60 border-tv-border'
              }`}
            >
              <div className="text-xs text-tv-muted">Day Low / High</div>
              <div className="font-bold text-sm mt-1 tabular-nums">
                ${asset.low.toFixed(2)} — ${asset.high.toFixed(2)}
              </div>
            </div>

            <div
              className={`p-3.5 rounded-xl border ${
                isDarkMode ? 'bg-[#2a2e39]/40 border-[#2a2e39]' : 'bg-tv-card/60 border-tv-border'
              }`}
            >
              <div className="text-xs text-tv-muted">Open Price</div>
              <div className="font-bold text-sm mt-1 tabular-nums">
                ${asset.open.toFixed(2)}
              </div>
            </div>

            <div
              className={`p-3.5 rounded-xl border ${
                isDarkMode ? 'bg-[#2a2e39]/40 border-[#2a2e39]' : 'bg-tv-card/60 border-tv-border'
              }`}
            >
              <div className="text-xs text-tv-muted">24h Volume</div>
              <div className="font-bold text-sm mt-1 tabular-nums">
                {asset.volume}
              </div>
            </div>

            <div
              className={`p-3.5 rounded-xl border ${
                isDarkMode ? 'bg-[#2a2e39]/40 border-[#2a2e39]' : 'bg-tv-card/60 border-tv-border'
              }`}
            >
              <div className="text-xs text-tv-muted">Technical Rating</div>
              <div className="font-bold text-sm mt-1 flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    asset.rating?.includes('Buy')
                      ? 'bg-tv-green'
                      : asset.rating?.includes('Sell')
                      ? 'bg-tv-red'
                      : 'bg-yellow-400'
                  }`}
                />
                <span className={asset.rating?.includes('Buy') ? 'text-tv-green' : ''}>
                  {asset.rating || 'Buy'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Simulation Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="text-xs text-tv-muted">
              Live quote feed simulated with regular trading hours precision.
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => onToggleWatchlist(asset.id)}
                className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-semibold text-xs border transition-colors cursor-pointer ${
                  isWatchlisted
                    ? 'border-tv-blue text-tv-blue hover:bg-tv-blue/10'
                    : 'border-tv-border hover:bg-tv-card'
                }`}
              >
                {isWatchlisted ? 'Remove from Watchlist' : '+ Add to Watchlist'}
              </button>

              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-semibold text-xs bg-tv-blue hover:bg-tv-blue-hover text-white transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
