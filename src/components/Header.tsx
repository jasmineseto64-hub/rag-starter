import React, { useState } from 'react';
import { Search, Globe, User, Moon, Sun, Check, Bookmark, Bell, Activity, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenWatchlist: () => void;
  onOpenGetStarted: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isLiveTicking: boolean;
  onToggleLiveTicking: () => void;
  watchlistCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenWatchlist,
  onOpenGetStarted,
  isDarkMode,
  onToggleDarkMode,
  isLiveTicking,
  onToggleLiveTicking,
  watchlistCount,
}) => {
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages = [
    { code: 'EN', name: 'English (US)' },
    { code: 'ES', name: 'Español' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'FR', name: 'Français' },
    { code: 'JA', name: '日本語' },
    { code: 'ZH', name: '中文' },
  ];

  return (
    <header className={`sticky top-0 z-40 transition-colors border-b ${
      isDarkMode 
        ? 'bg-[#131722]/95 backdrop-blur border-[#2a2e39] text-[#d1d4dc]' 
        : 'bg-white/95 backdrop-blur border-tv-border text-tv-text'
    }`}>
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: TV Logo + Search Bar */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="TradingView Home"
            className="flex items-center group cursor-pointer focus:outline-none"
          >
            <svg
              className={`w-9 h-7 transition-transform group-hover:scale-105 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              fill="currentColor"
              viewBox="0 0 36 28"
            >
              <path d="M4 14.5C4 12.0147 6.01472 10 8.5 10H14V24H8.5C6.01472 24 4 21.9853 4 19.5V14.5Z" />
              <path d="M16 4H22V24H16V4Z" />
              <path d="M24 18H29.5C31.9853 18 34 19.9853 34 22.45V24H24V18Z" />
            </svg>
          </button>

          {/* Global Search Bar with Ctrl+K shortcut */}
          <div className="relative hidden sm:block w-64 md:w-80">
            <button
              onClick={onOpenSearch}
              className={`w-full flex items-center justify-between pl-10 pr-3 py-2 text-sm rounded-full transition-all text-left group ${
                isDarkMode 
                  ? 'bg-[#1e222d] hover:bg-[#2a2e39] text-[#d1d4dc] border border-[#2a2e39]' 
                  : 'bg-tv-card hover:bg-tv-card-hover text-tv-text border border-transparent'
              }`}
            >
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-tv-muted">
                <Search className="w-4 h-4" />
              </div>
              <span className="text-tv-muted text-sm truncate">Search (Ctrl+K)</span>
              <kbd className={`hidden md:inline-block text-[11px] font-mono px-1.5 py-0.5 rounded ${
                isDarkMode ? 'bg-[#2a2e39] text-gray-400' : 'bg-white text-gray-500 shadow-xs'
              }`}>
                ⌘K
              </kbd>
            </button>
          </div>
        </div>

        {/* Center: Main Navigation */}
        <nav className="hidden xl:flex items-center gap-6 text-[15px] font-semibold tracking-tight">
          <a
            href="#products"
            className={`transition-colors ${isDarkMode ? 'hover:text-[#2962ff]' : 'hover:text-tv-blue'}`}
          >
            Products
          </a>
          <a
            href="#community"
            className={`transition-colors ${isDarkMode ? 'hover:text-[#2962ff]' : 'hover:text-tv-blue'}`}
          >
            Community
          </a>
          <a
            href="#markets"
            className="text-tv-blue font-bold border-b-2 border-tv-blue py-5"
          >
            Markets
          </a>
          <a
            href="#brokers"
            className={`transition-colors ${isDarkMode ? 'hover:text-[#2962ff]' : 'hover:text-tv-blue'}`}
          >
            Brokers
          </a>
          <a
            href="#more"
            className={`transition-colors ${isDarkMode ? 'hover:text-[#2962ff]' : 'hover:text-tv-blue'}`}
          >
            More
          </a>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Watchlist Quick Button */}
          <button
            onClick={onOpenWatchlist}
            title="Watchlist"
            className={`relative p-2 rounded-full transition-colors ${
              isDarkMode ? 'hover:bg-[#1e222d] text-[#d1d4dc]' : 'hover:bg-tv-card text-tv-text'
            }`}
          >
            <Bookmark className="w-5 h-5" />
            {watchlistCount > 0 && (
              <span className="absolute 1 top-0.5 right-0.5 w-4 h-4 bg-tv-blue text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Theme Quick Toggle */}
          <button
            onClick={onToggleDarkMode}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode ? 'hover:bg-[#1e222d] text-yellow-400' : 'hover:bg-tv-card text-tv-text'
            }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 font-semibold text-sm px-2 py-1.5 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-[#1e222d] text-[#d1d4dc]' : 'hover:bg-tv-card text-tv-text'
              }`}
            >
              <Globe className="w-4 h-4 text-tv-muted" />
              <span>{selectedLang}</span>
            </button>

            {langOpen && (
              <div
                className={`absolute right-0 mt-2 w-44 rounded-xl shadow-lg border py-1.5 z-50 animate-in fade-in-50 zoom-in-95 ${
                  isDarkMode
                    ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
                    : 'bg-white border-tv-border text-tv-text'
                }`}
              >
                <div className="px-3 py-1 text-xs font-semibold text-tv-muted uppercase tracking-wider">
                  Select Language
                </div>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setSelectedLang(l.code);
                      setLangOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-sm flex items-center justify-between text-left transition-colors ${
                      selectedLang === l.code
                        ? 'text-tv-blue font-bold'
                        : isDarkMode
                        ? 'hover:bg-[#2a2e39]'
                        : 'hover:bg-tv-card'
                    }`}
                  >
                    <span>{l.name}</span>
                    {selectedLang === l.code && <Check className="w-4 h-4 text-tv-blue" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Avatar Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              aria-label="Account"
              className={`p-2 rounded-full transition-colors ${
                isDarkMode ? 'hover:bg-[#1e222d] text-[#d1d4dc]' : 'hover:bg-tv-card text-tv-text'
              }`}
            >
              <User className="w-5 h-5" />
            </button>

            {profileOpen && (
              <div
                className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-xl border p-2 z-50 animate-in fade-in-50 zoom-in-95 ${
                  isDarkMode
                    ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
                    : 'bg-white border-tv-border text-tv-text'
                }`}
              >
                <div className="p-3 border-b border-tv-border/50">
                  <div className="font-bold text-sm">TradingView Guest</div>
                  <div className="text-xs text-tv-muted">Free Market Tier</div>
                </div>

                <div className="py-2 space-y-1">
                  <button
                    onClick={() => {
                      onOpenWatchlist();
                      setProfileOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                      isDarkMode ? 'hover:bg-[#2a2e39]' : 'hover:bg-tv-card'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Bookmark className="w-4 h-4 text-tv-blue" />
                      <span>My Watchlist</span>
                    </div>
                    <span className="text-xs bg-tv-card text-tv-muted px-2 py-0.5 rounded-full font-bold">
                      {watchlistCount}
                    </span>
                  </button>

                  <button
                    onClick={onToggleLiveTicking}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                      isDarkMode ? 'hover:bg-[#2a2e39]' : 'hover:bg-tv-card'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Activity className={`w-4 h-4 ${isLiveTicking ? 'text-tv-green' : 'text-tv-muted'}`} />
                      <span>Live Price Ticker</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                      isLiveTicking ? 'bg-tv-green-bg text-tv-green' : 'bg-tv-card text-tv-muted'
                    }`}>
                      {isLiveTicking ? 'ON' : 'PAUSED'}
                    </span>
                  </button>

                  <button
                    onClick={onToggleDarkMode}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                      isDarkMode ? 'hover:bg-[#2a2e39]' : 'hover:bg-tv-card'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {isDarkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-tv-muted" />}
                      <span>Appearance</span>
                    </div>
                    <span className="text-xs text-tv-muted font-medium">
                      {isDarkMode ? 'Dark' : 'Light'}
                    </span>
                  </button>
                </div>

                <div className="pt-2 border-t border-tv-border/50">
                  <button
                    onClick={() => {
                      onOpenGetStarted();
                      setProfileOpen(false);
                    }}
                    className="w-full py-2 bg-gradient-to-r from-[#2962ff] to-[#9c27b0] text-white font-semibold text-xs rounded-xl shadow-xs text-center block"
                  >
                    Sign in to sync charts
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Get Started Button (Vibrant Indigo-Violet Gradient Pill) */}
          <button
            onClick={onOpenGetStarted}
            className="bg-gradient-to-r from-[#2962ff] to-[#9c27b0] hover:opacity-95 text-white font-medium text-sm px-5 py-2.5 rounded-full shadow-sm shadow-blue-500/20 transition-transform active:scale-95 whitespace-nowrap cursor-pointer"
          >
            Get started
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-tv-muted hover:text-tv-text"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className={`xl:hidden border-b px-4 py-3 space-y-2 ${
          isDarkMode ? 'bg-[#1e222d] border-[#2a2e39]' : 'bg-white border-tv-border'
        }`}>
          <button
            onClick={() => {
              onOpenSearch();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 bg-tv-card rounded-lg text-sm text-tv-muted"
          >
            <Search className="w-4 h-4" />
            <span>Search symbols (Ctrl+K)</span>
          </button>
          <div className="flex flex-col gap-1 text-sm font-semibold pt-1">
            <a href="#products" className="py-2 px-2 hover:text-tv-blue">Products</a>
            <a href="#community" className="py-2 px-2 hover:text-tv-blue">Community</a>
            <a href="#markets" className="py-2 px-2 text-tv-blue font-bold">Markets</a>
            <a href="#brokers" className="py-2 px-2 hover:text-tv-blue">Brokers</a>
            <a href="#more" className="py-2 px-2 hover:text-tv-blue">More</a>
          </div>
        </div>
      )}
    </header>
  );
};
