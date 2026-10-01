import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { EarningReport } from '../types/market';

interface EarningsCalendarProps {
  earnings: EarningReport[];
  isDarkMode: boolean;
  onSelectTicker?: (ticker: string) => void;
}

export const EarningsCalendar: React.FC<EarningsCalendarProps> = ({
  earnings,
  isDarkMode,
  onSelectTicker,
}) => {
  const [showFullCalendar, setShowFullCalendar] = useState(false);

  const displayedEarnings = showFullCalendar ? earnings : earnings.slice(0, 4);

  return (
    <section
      className={`border rounded-2xl p-5 transition-colors ${
        isDarkMode
          ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
          : 'bg-white border-tv-border text-tv-text'
      }`}
      data-purpose="earnings-calendar-preview"
    >
      <div
        className={`flex items-center justify-between pb-3 border-b ${
          isDarkMode ? 'border-[#2a2e39]' : 'border-tv-border'
        }`}
      >
        <div>
          <h2
            className={`text-base font-bold flex items-center gap-2 ${
              isDarkMode ? 'text-white' : 'text-tv-text'
            }`}
          >
            <Calendar className="w-4 h-4 text-tv-blue" />
            Earnings calendar preview
          </h2>
          <span className="text-xs text-tv-muted">Releasing reports today and this week</span>
        </div>

        <button
          onClick={() => setShowFullCalendar(!showFullCalendar)}
          className="text-xs font-bold text-tv-blue hover:underline cursor-pointer"
        >
          {showFullCalendar ? 'Show today only ↑' : 'Full calendar →'}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-sm">
        {displayedEarnings.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectTicker?.(item.ticker)}
            className={`p-3 rounded-xl transition-all cursor-pointer group ${
              isDarkMode
                ? 'bg-[#2a2e39]/60 hover:bg-[#2a2e39] border border-transparent hover:border-[#3b4253]'
                : 'bg-tv-card hover:bg-tv-card-hover border border-transparent hover:border-tv-border'
            }`}
          >
            <div className="flex justify-between items-center text-xs font-semibold text-tv-muted mb-1">
              <span>{item.timing}</span>
              <span className="tabular-nums">Est. {item.estimate}</span>
            </div>
            <div
              className={`font-bold group-hover:text-tv-blue transition-colors ${
                isDarkMode ? 'text-white' : 'text-tv-text'
              }`}
            >
              {item.ticker}
            </div>
            <div className="text-xs text-tv-muted truncate">{item.company}</div>
            {showFullCalendar && (
              <div className="mt-1 text-[11px] text-tv-blue font-semibold">
                {item.date}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
