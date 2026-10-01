import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { MarketAsset } from '../types/market';

interface WorldIndicesTableProps {
  indices: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  isDarkMode: boolean;
  tickingAssetId?: string;
  tickingDirection?: 'up' | 'down';
}

type SortField = 'ticker' | 'price' | 'change' | 'changePercent';

export const WorldIndicesTable: React.FC<WorldIndicesTableProps> = ({
  indices,
  onSelectAsset,
  isDarkMode,
  tickingAssetId,
  tickingDirection,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [sortField, setSortField] = useState<SortField>('ticker');
  const [sortAsc, setSortAsc] = useState(false);

  const displayedIndices = showAll ? indices : indices.slice(0, 7);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false); // default desc for financial metrics
    }
  };

  const sortedIndices = [...displayedIndices].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'ticker') {
      comparison = a.ticker.localeCompare(b.ticker);
    } else if (sortField === 'price') {
      comparison = a.price - b.price;
    } else if (sortField === 'change') {
      comparison = a.change - b.change;
    } else if (sortField === 'changePercent') {
      comparison = a.changePercent - b.changePercent;
    }
    return sortAsc ? comparison : -comparison;
  });

  return (
    <section
      className={`border rounded-2xl p-5 shadow-xs transition-colors ${
        isDarkMode
          ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
          : 'bg-white border-tv-border text-tv-text'
      }`}
      data-purpose="world-indices-table-container"
    >
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 gap-2">
        <div>
          <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-tv-text'}`}>
            Major World Indices
          </h2>
          <p className="text-xs text-tv-muted">
            Global equity benchmarks across North America, Europe, and Asia-Pacific
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
              isDarkMode ? 'bg-[#2a2e39] text-gray-300' : 'bg-tv-card text-tv-muted'
            }`}
          >
            Real-time quotes
          </span>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-bold text-tv-blue hover:underline cursor-pointer"
          >
            {showAll ? 'Show fewer indices ↑' : 'View all 80+ indices →'}
          </button>
        </div>
      </div>

      {/* Table container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr
              className={`border-b text-tv-muted text-xs uppercase font-medium ${
                isDarkMode ? 'border-[#2a2e39]' : 'border-tv-border'
              }`}
            >
              <th className="py-3 px-3">
                <button
                  onClick={() => handleSort('ticker')}
                  className="flex items-center gap-1 hover:text-tv-blue font-semibold uppercase"
                >
                  Ticker / Name
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-3 px-3 text-right">
                <button
                  onClick={() => handleSort('price')}
                  className="flex items-center gap-1 ml-auto hover:text-tv-blue font-semibold uppercase"
                >
                  Last Price
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-3 px-3 text-right">
                <button
                  onClick={() => handleSort('change')}
                  className="flex items-center gap-1 ml-auto hover:text-tv-blue font-semibold uppercase"
                >
                  Chg
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-3 px-3 text-right">
                <button
                  onClick={() => handleSort('changePercent')}
                  className="flex items-center gap-1 ml-auto hover:text-tv-blue font-semibold uppercase"
                >
                  Chg %
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-3 px-3 text-center hidden md:table-cell">24h Trend</th>
              <th className="py-3 px-3 text-right hidden sm:table-cell">High</th>
              <th className="py-3 px-3 text-right hidden sm:table-cell">Low</th>
            </tr>
          </thead>

          <tbody
            className={`divide-y font-medium ${
              isDarkMode ? 'divide-[#2a2e39]/60' : 'divide-tv-border/60'
            }`}
          >
            {sortedIndices.map((item) => {
              const isPositive = item.change >= 0;
              const isTicking = tickingAssetId === item.id;
              const flashClass = isTicking
                ? tickingDirection === 'up'
                  ? 'flash-up'
                  : 'flash-down'
                : '';

              // Generate polyline points from sparkline array
              const pts = item.sparkline
                .map((val, idx) => {
                  const x = (idx / (item.sparkline.length - 1)) * 100;
                  return `${x.toFixed(1)},${val}`;
                })
                .join(' ');

              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectAsset(item)}
                  className={`transition-colors cursor-pointer group ${
                    isDarkMode ? 'hover:bg-[#2a2e39]/60' : 'hover:bg-tv-card/50'
                  } ${flashClass}`}
                >
                  {/* Ticker / Name */}
                  <td className="py-3.5 px-3 flex items-center gap-3">
                    <span
                      style={{ backgroundColor: item.badgeColor || '#0052cc' }}
                      className="w-7 h-7 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-xs"
                    >
                      {item.badgeText || item.ticker.slice(0, 2)}
                    </span>
                    <div>
                      <div className="font-bold flex items-center gap-1.5">
                        <span
                          className={`group-hover:text-tv-blue transition-colors ${
                            isDarkMode ? 'text-white' : 'text-tv-text'
                          }`}
                        >
                          {item.ticker}
                        </span>
                        <span className="text-[11px] font-normal text-tv-muted">
                          {item.exchange}
                        </span>
                      </div>
                      <div className="text-xs text-tv-muted">{item.name}</div>
                    </div>
                  </td>

                  {/* Last Price */}
                  <td
                    className={`py-3.5 px-3 text-right font-semibold tabular-nums ${
                      isDarkMode ? 'text-white' : 'text-tv-text'
                    }`}
                  >
                    {item.price.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  {/* Chg */}
                  <td
                    className={`py-3.5 px-3 text-right font-semibold tabular-nums ${
                      isPositive ? 'text-tv-green' : 'text-tv-red'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {item.change.toFixed(2)}
                  </td>

                  {/* Chg % */}
                  <td className="py-3.5 px-3 text-right font-semibold tabular-nums">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
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
                      {item.changePercent.toFixed(2)}%
                    </span>
                  </td>

                  {/* 24h Trend Sparkline */}
                  <td className="py-3.5 px-3 text-center hidden md:table-cell">
                    <svg
                      className={`w-24 h-6 mx-auto ${
                        isPositive ? 'sparkline-green' : 'sparkline-red'
                      }`}
                      viewBox="0 0 100 25"
                    >
                      <polyline points={pts} />
                    </svg>
                  </td>

                  {/* High */}
                  <td className="py-3.5 px-3 text-right text-tv-muted hidden sm:table-cell tabular-nums">
                    {item.high.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  {/* Low */}
                  <td className="py-3.5 px-3 text-right text-tv-muted hidden sm:table-cell tabular-nums">
                    {item.low.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
