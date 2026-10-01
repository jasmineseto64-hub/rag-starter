import React from 'react';

interface FooterProps {
  isDarkMode: boolean;
  onSelectCategoryLink?: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode, onSelectCategoryLink }) => {
  return (
    <footer
      className={`mt-16 border-t text-xs transition-colors ${
        isDarkMode
          ? 'bg-[#131722] border-[#2a2e39] text-[#787b86]'
          : 'bg-white border-tv-border text-tv-muted'
      }`}
      data-purpose="tradingview-footer"
    >
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-12">
        {/* Categorized Footer Link Columns */}
        <div
          className={`grid grid-cols-2 md:grid-cols-6 gap-8 pb-12 border-b ${
            isDarkMode ? 'border-[#2a2e39]' : 'border-tv-border'
          }`}
        >
          {/* Column 1: Products */}
          <div className="space-y-3">
            <div
              className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-tv-text'}`}
            >
              Products
            </div>
            <ul className="space-y-2 font-medium">
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#products">
                  Supercharts
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#pine">
                  Pine Script™
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#stockscreener">
                  Stock Screener
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#etfscreener">
                  ETF Screener
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#forexscreener">
                  Forex Screener
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#cryptoscreener">
                  Crypto Coins Screener
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-3">
            <div
              className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-tv-text'}`}
            >
              Company
            </div>
            <ul className="space-y-2 font-medium">
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#about">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#features">
                  Features
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#pricing">
                  Pricing
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#social">
                  Social network
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#walloflove">
                  Wall of Love
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#careers">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Community */}
          <div className="space-y-3">
            <div
              className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-tv-text'}`}
            >
              Community
            </div>
            <ul className="space-y-2 font-medium">
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#refer">
                  Refer a friend
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#ideas">
                  Ideas
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#scripts">
                  Scripts
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#streams">
                  Streams
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#houserules">
                  House Rules
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#moderators">
                  Moderators
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: For Business */}
          <div className="space-y-3">
            <div
              className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-tv-text'}`}
            >
              For Business
            </div>
            <ul className="space-y-2 font-medium">
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#widgets">
                  Widgets
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#advertising">
                  Advertising
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#chartlibraries">
                  Charting libraries
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#lightweight">
                  Lightweight Charts™
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#brokerage">
                  Brokerage integration
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#partner">
                  Partner program
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Markets */}
          <div className="space-y-3">
            <div
              className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-tv-text'}`}
            >
              Markets
            </div>
            <ul className="space-y-2 font-medium">
              <li>
                <button
                  onClick={() => onSelectCategoryLink?.('indices')}
                  className="hover:text-tv-blue transition-colors text-left"
                >
                  Indices overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategoryLink?.('us-stocks')}
                  className="hover:text-tv-blue transition-colors text-left"
                >
                  US Stocks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategoryLink?.('crypto')}
                  className="hover:text-tv-blue transition-colors text-left"
                >
                  Crypto prices
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategoryLink?.('forex')}
                  className="hover:text-tv-blue transition-colors text-left"
                >
                  Currencies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategoryLink?.('futures')}
                  className="hover:text-tv-blue transition-colors text-left"
                >
                  Futures
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategoryLink?.('bonds')}
                  className="hover:text-tv-blue transition-colors text-left"
                >
                  Bonds yields
                </button>
              </li>
            </ul>
          </div>

          {/* Column 6: Mobile & Desktop */}
          <div className="space-y-3">
            <div
              className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-tv-text'}`}
            >
              Mobile & Desktop
            </div>
            <ul className="space-y-2 font-medium">
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#ios">
                  Download for iOS
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#android">
                  Download for Android
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#desktop">
                  Desktop app
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#mac">
                  TradingView for Mac
                </a>
              </li>
              <li>
                <a className="hover:text-tv-blue transition-colors" href="#windows">
                  TradingView for Windows
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Line: Brand signature and Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <span
              className={`font-semibold ${isDarkMode ? 'text-white' : 'text-tv-text'}`}
            >
              Made by humans with curiosity &amp; code.
            </span>
            <span>© 2024 TradingView, Inc.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a className="hover:text-tv-blue transition-colors" href="#terms">
              Terms of use
            </a>
            <a className="hover:text-tv-blue transition-colors" href="#privacy">
              Privacy policy
            </a>
            <a className="hover:text-tv-blue transition-colors" href="#cookies">
              Cookies
            </a>
            <a className="hover:text-tv-blue transition-colors" href="#security">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
