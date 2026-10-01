/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { QuickIndices } from './components/QuickIndices';
import { WorldIndicesTable } from './components/WorldIndicesTable';
import { StocksMovers } from './components/StocksMovers';
import { CryptoSection } from './components/CryptoSection';
import { EarningsCalendar } from './components/EarningsCalendar';
import { Footer } from './components/Footer';
import { AssetDetailModal } from './components/AssetDetailModal';
import { SearchModal } from './components/SearchModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { GetStartedModal } from './components/GetStartedModal';
import {
  INITIAL_QUICK_INDICES,
  INITIAL_WORLD_INDICES,
  INITIAL_CRYPTO,
  INITIAL_EARNINGS,
  INITIAL_FUTURES_COMMODITIES,
  INITIAL_FOREX,
  INITIAL_BONDS,
  VOLUME_STOCKS,
  generateHistory,
} from './data/mockMarketData';
import { MarketAsset, AssetCategory } from './types/market';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<AssetCategory>('indices');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLiveTicking, setIsLiveTicking] = useState(true);

  // Market datasets in state so live ticks update prices
  const [quickIndices, setQuickIndices] = useState<MarketAsset[]>(INITIAL_QUICK_INDICES);
  const [worldIndices, setWorldIndices] = useState<MarketAsset[]>(INITIAL_WORLD_INDICES);
  const [cryptoList, setCryptoList] = useState<MarketAsset[]>(INITIAL_CRYPTO);
  const [futuresList, setFuturesList] = useState<MarketAsset[]>(INITIAL_FUTURES_COMMODITIES);
  const [forexList, setForexList] = useState<MarketAsset[]>(INITIAL_FOREX);
  const [bondsList, setBondsList] = useState<MarketAsset[]>(INITIAL_BONDS);
  const [earningsList] = useState(INITIAL_EARNINGS);

  // Watchlist state
  const [watchlistIds, setWatchlistIds] = useState<string[]>(['spx', 'ndx', 'btcusd']);

  // Modals & Panels
  const [selectedAsset, setSelectedAsset] = useState<MarketAsset | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  // Ticking flash animation state
  const [tickingAssetId, setTickingAssetId] = useState<string | undefined>(undefined);
  const [tickingDirection, setTickingDirection] = useState<'up' | 'down' | undefined>(undefined);

  // Aggregate all assets for search modal & watchlist lookup
  const allAssets = useMemo(() => {
    const map = new Map<string, MarketAsset>();
    [
      ...quickIndices,
      ...worldIndices,
      ...cryptoList,
      ...futuresList,
      ...forexList,
      ...bondsList,
    ].forEach((item) => {
      if (!map.has(item.id)) {
        map.set(item.id, item);
      }
    });

    // Also include volume movers as assets if not present
    VOLUME_STOCKS.forEach((v) => {
      const id = v.ticker.toLowerCase();
      if (!map.has(id)) {
        map.set(id, {
          id,
          ticker: v.ticker,
          name: v.name,
          exchange: 'NASDAQ',
          category: 'us-stocks',
          price: v.price,
          change: Number(((v.price * v.changePercent) / 100).toFixed(2)),
          changePercent: v.changePercent,
          high: Number((v.price * 1.02).toFixed(2)),
          low: Number((v.price * 0.98).toFixed(2)),
          open: Number((v.price * 0.99).toFixed(2)),
          prevClose: Number((v.price * 0.99).toFixed(2)),
          volume: v.volumeOrCap,
          sparkline: [18, 14, 16, 11, 8, 4],
          history: generateHistory(v.price, v.changePercent),
          badgeColor: v.iconBg,
          badgeText: v.iconText,
        });
      }
    });

    return Array.from(map.values());
  }, [quickIndices, worldIndices, cryptoList, futuresList, forexList, bondsList]);

  // Watchlisted asset objects
  const watchlistAssets = useMemo(() => {
    return allAssets.filter((item) => watchlistIds.includes(item.id));
  }, [allAssets, watchlistIds]);

  // Toggle watchlist
  const handleToggleWatchlist = (assetId: string) => {
    setWatchlistIds((prev) =>
      prev.includes(assetId) ? prev.filter((id) => id !== assetId) : [...prev, assetId]
    );
  };

  const handleAddPresetWatchlist = (asset: MarketAsset) => {
    if (!watchlistIds.includes(asset.id)) {
      setWatchlistIds((prev) => [...prev, asset.id]);
    }
  };

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Real-time market tick simulation
  useEffect(() => {
    if (!isLiveTicking) return;

    const interval = setInterval(() => {
      // Pick random group: 0 = quick, 1 = world, 2 = crypto
      const groupChoice = Math.floor(Math.random() * 3);
      const isUp = Math.random() > 0.45;
      const direction = isUp ? 'up' : 'down';
      const factor = isUp ? 1 + (Math.random() * 0.0008 + 0.0001) : 1 - (Math.random() * 0.0008 + 0.0001);

      if (groupChoice === 0) {
        const randIndex = Math.floor(Math.random() * quickIndices.length);
        const target = quickIndices[randIndex];
        if (!target) return;

        const newPrice = Number((target.price * factor).toFixed(2));
        const delta = newPrice - target.prevClose;
        const newPct = Number(((delta / target.prevClose) * 100).toFixed(2));

        setQuickIndices((prev) =>
          prev.map((item, idx) =>
            idx === randIndex
              ? {
                  ...item,
                  price: newPrice,
                  change: Number(delta.toFixed(2)),
                  changePercent: newPct,
                  high: Math.max(item.high, newPrice),
                  low: Math.min(item.low, newPrice),
                }
              : item
          )
        );

        setTickingAssetId(target.id);
        setTickingDirection(direction);
      } else if (groupChoice === 1) {
        const randIndex = Math.floor(Math.random() * worldIndices.length);
        const target = worldIndices[randIndex];
        if (!target) return;

        const newPrice = Number((target.price * factor).toFixed(2));
        const delta = newPrice - target.prevClose;
        const newPct = Number(((delta / target.prevClose) * 100).toFixed(2));

        setWorldIndices((prev) =>
          prev.map((item, idx) =>
            idx === randIndex
              ? {
                  ...item,
                  price: newPrice,
                  change: Number(delta.toFixed(2)),
                  changePercent: newPct,
                  high: Math.max(item.high, newPrice),
                  low: Math.min(item.low, newPrice),
                }
              : item
          )
        );

        setTickingAssetId(target.id);
        setTickingDirection(direction);
      } else {
        const randIndex = Math.floor(Math.random() * cryptoList.length);
        const target = cryptoList[randIndex];
        if (!target) return;

        const newPrice = Number((target.price * factor).toFixed(target.price < 5 ? 4 : 2));
        const delta = newPrice - target.prevClose;
        const newPct = Number(((delta / target.prevClose) * 100).toFixed(2));

        setCryptoList((prev) =>
          prev.map((item, idx) =>
            idx === randIndex
              ? {
                  ...item,
                  price: newPrice,
                  change: Number(delta.toFixed(target.price < 5 ? 4 : 2)),
                  changePercent: newPct,
                  high: Math.max(item.high, newPrice),
                  low: Math.min(item.low, newPrice),
                }
              : item
          )
        );

        setTickingAssetId(target.id);
        setTickingDirection(direction);
      }

      // Clear flash after 1200ms
      setTimeout(() => {
        setTickingAssetId(undefined);
      }, 1200);
    }, 2800);

    return () => clearInterval(interval);
  }, [isLiveTicking, quickIndices, worldIndices, cryptoList]);

  // Sync selectedAsset price if active in modal
  useEffect(() => {
    if (selectedAsset) {
      const updated = allAssets.find((a) => a.id === selectedAsset.id);
      if (updated && (updated.price !== selectedAsset.price || updated.change !== selectedAsset.change)) {
        setSelectedAsset(updated);
      }
    }
  }, [allAssets, selectedAsset]);

  // Handle clicking an earnings ticker
  const handleSelectEarningsTicker = (ticker: string) => {
    const found = allAssets.find((a) => a.ticker === ticker);
    if (found) {
      setSelectedAsset(found);
    } else {
      setSelectedAsset({
        id: ticker.toLowerCase(),
        ticker,
        name: `${ticker} Corporation`,
        exchange: 'NASDAQ',
        category: 'us-stocks',
        price: 84.50,
        change: 1.25,
        changePercent: 1.5,
        high: 86.00,
        low: 83.20,
        open: 83.50,
        prevClose: 83.25,
        volume: '4.2M',
        sparkline: [18, 14, 16, 11, 8, 4],
        history: generateHistory(84.50, 1.5),
        badgeColor: '#2962ff',
        badgeText: ticker.slice(0, 2),
      });
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans antialiased selection:bg-tv-blue selection:text-white transition-colors ${
        isDarkMode ? 'bg-[#131722] text-[#d1d4dc]' : 'bg-[#ffffff] text-tv-text'
      }`}
    >
      {/* Top Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isLiveTicking={isLiveTicking}
        onToggleLiveTicking={() => setIsLiveTicking(!isLiveTicking)}
        watchlistCount={watchlistIds.length}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-[1440px] mx-auto w-full px-4 lg:px-6 py-6 space-y-10">
        {/* Category Navigation & Hero Title */}
        <CategoryNav
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            if (cat === 'crypto') {
              const el = document.querySelector('[data-purpose="crypto-section"]');
              el?.scrollIntoView({ behavior: 'smooth' });
            } else if (cat === 'us-stocks') {
              const el = document.querySelector('[data-purpose="us-stocks-and-movers"]');
              el?.scrollIntoView({ behavior: 'smooth' });
            } else if (cat === 'indices' || cat === 'world-stocks') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          isDarkMode={isDarkMode}
        />

        {/* Specialized Views based on Active Category */}
        {activeCategory === 'futures' ? (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-tv-text'}`}>
                Futures &amp; Commodities
              </h2>
              <span className="text-xs text-tv-muted font-semibold">CME &amp; NYMEX Globex Feed</span>
            </div>
            <WorldIndicesTable
              indices={futuresList}
              onSelectAsset={setSelectedAsset}
              isDarkMode={isDarkMode}
              tickingAssetId={tickingAssetId}
              tickingDirection={tickingDirection}
            />
          </section>
        ) : activeCategory === 'forex' ? (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-tv-text'}`}>
                Forex &amp; Currencies
              </h2>
              <span className="text-xs text-tv-muted font-semibold">Interbank Spot Exchange Rates</span>
            </div>
            <WorldIndicesTable
              indices={forexList}
              onSelectAsset={setSelectedAsset}
              isDarkMode={isDarkMode}
              tickingAssetId={tickingAssetId}
              tickingDirection={tickingDirection}
            />
          </section>
        ) : activeCategory === 'bonds' || activeCategory === 'corp-bonds' ? (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-tv-text'}`}>
                Government &amp; Treasury Yields
              </h2>
              <span className="text-xs text-tv-muted font-semibold">Sovereign Benchmark Curves</span>
            </div>
            <WorldIndicesTable
              indices={bondsList}
              onSelectAsset={setSelectedAsset}
              isDarkMode={isDarkMode}
              tickingAssetId={tickingAssetId}
              tickingDirection={tickingDirection}
            />
          </section>
        ) : (
          /* Default Full Markets Screen Matching Provided Screenshot & HTML */
          <>
            {/* Quick Indices Cards */}
            <QuickIndices
              indices={quickIndices}
              onSelectAsset={setSelectedAsset}
              isDarkMode={isDarkMode}
              tickingAssetId={tickingAssetId}
              tickingDirection={tickingDirection}
            />

            {/* Major World Indices Table */}
            <WorldIndicesTable
              indices={worldIndices}
              onSelectAsset={setSelectedAsset}
              isDarkMode={isDarkMode}
              tickingAssetId={tickingAssetId}
              tickingDirection={tickingDirection}
            />

            {/* US stocks & Movers Section */}
            <StocksMovers
              onSelectAsset={setSelectedAsset}
              isDarkMode={isDarkMode}
            />

            {/* Crypto Market Section */}
            <CryptoSection
              cryptoList={cryptoList}
              onSelectAsset={setSelectedAsset}
              isDarkMode={isDarkMode}
              tickingAssetId={tickingAssetId}
              tickingDirection={tickingDirection}
            />

            {/* Earnings Calendar Preview */}
            <EarningsCalendar
              earnings={earningsList}
              isDarkMode={isDarkMode}
              onSelectTicker={handleSelectEarningsTicker}
            />
          </>
        )}
      </main>

      {/* Main Footer */}
      <Footer
        isDarkMode={isDarkMode}
        onSelectCategoryLink={(cat) => {
          setActiveCategory(cat as AssetCategory);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Interactive Asset Detail Modal (TradingView Chart) */}
      {selectedAsset && (
        <AssetDetailModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          isDarkMode={isDarkMode}
          isWatchlisted={watchlistIds.includes(selectedAsset.id)}
          onToggleWatchlist={handleToggleWatchlist}
        />
      )}

      {/* Global Search Dialog (Ctrl+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        allAssets={allAssets}
        onSelectAsset={setSelectedAsset}
        isDarkMode={isDarkMode}
      />

      {/* Watchlist Side Drawer */}
      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlistAssets={watchlistAssets}
        onSelectAsset={setSelectedAsset}
        onRemoveFromWatchlist={handleToggleWatchlist}
        onAddPreset={handleAddPresetWatchlist}
        recommendedAssets={allAssets.slice(0, 5)}
        isDarkMode={isDarkMode}
      />

      {/* Get Started Sign Up Modal */}
      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
