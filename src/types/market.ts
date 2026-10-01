export type AssetCategory =
  | 'indices'
  | 'us-stocks'
  | 'world-stocks'
  | 'crypto'
  | 'futures'
  | 'forex'
  | 'bonds'
  | 'corp-bonds'
  | 'etfs'
  | 'economy';

export interface MarketAsset {
  id: string;
  ticker: string;
  name: string;
  exchange: string;
  category: AssetCategory;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  prevClose: number;
  volume: string;
  marketCap?: string;
  peRatio?: string;
  sparkline: number[]; // normalized 0-100 or values for svg polyline
  history: {
    '1D': { time: string; price: number; volume: number }[];
    '1W': { time: string; price: number; volume: number }[];
    '1M': { time: string; price: number; volume: number }[];
    '1Y': { time: string; price: number; volume: number }[];
    'ALL': { time: string; price: number; volume: number }[];
  };
  badgeColor?: string;
  badgeText?: string;
  country?: string;
  currency?: string;
  rating?: 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';
}

export interface EarningReport {
  id: string;
  ticker: string;
  company: string;
  timing: 'After close' | 'Before open';
  estimate: string;
  reported?: string;
  date: string;
}

export interface MarketMover {
  ticker: string;
  name: string;
  price: number;
  changePercent: number;
  volumeOrCap: string;
  iconBg: string;
  iconText: string;
  rank?: number;
}
