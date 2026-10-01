import React, { useState } from 'react';
import { X, Check, ArrowRight, ShieldCheck, Zap, BarChart } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden p-6 sm:p-8 relative ${
          isDarkMode
            ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
            : 'bg-white border-tv-border text-tv-text'
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 rounded-full transition-colors cursor-pointer ${
            isDarkMode ? 'hover:bg-[#2a2e39] text-gray-400' : 'hover:bg-tv-card text-tv-muted'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-tv-green-bg text-tv-green rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-tv-text'}`}>
              Welcome to TradingView!
            </h3>
            <p className="text-sm text-tv-muted max-w-sm mx-auto">
              We've activated your live market session for <span className="font-semibold">{email}</span>. You now have access to real-time quotes, technical charts, and synced watchlists.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-tv-blue hover:bg-tv-blue-hover text-white font-semibold text-sm rounded-xl cursor-pointer"
            >
              Start Exploring Markets
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-tv-blue">
                Join 60 Million+ Traders
              </span>
              <h2 className={`text-2xl sm:text-3xl font-extrabold mt-1 ${
                isDarkMode ? 'text-white' : 'text-tv-text'
              }`}>
                Look first / Then leap.
              </h2>
              <p className="text-xs sm:text-sm text-tv-muted mt-1">
                The world's most powerful charting platform and social network for active traders and investors.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-tv-blue/10 text-tv-blue mt-0.5">
                  <BarChart className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-sm">Real-time Global Quotes</div>
                  <div className="text-xs text-tv-muted">
                    Instant tick data across US stocks, World Indices, Crypto, and Bonds.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-tv-green-bg text-tv-green mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-sm">Interactive Supercharts</div>
                  <div className="text-xs text-tv-muted">
                    Technical indicators, area views, candlesticks, and crosshair metrics.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-sm">Zero-Risk Paper Trading</div>
                  <div className="text-xs text-tv-muted">
                    Practice trading strategies with simulated portfolios and real market prices.
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email to get started"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                    isDarkMode
                      ? 'bg-[#131722] border-[#2a2e39] text-white focus:border-tv-blue'
                      : 'bg-tv-card border-tv-border text-tv-text focus:border-tv-blue focus:bg-white'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#2962ff] to-[#9c27b0] hover:opacity-95 text-white font-bold text-sm rounded-xl shadow-md transition-transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Create free account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-[11px] text-tv-muted text-center">
              By proceeding, you agree to our Terms of Use, Privacy Policy, and Cookie Policy.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
