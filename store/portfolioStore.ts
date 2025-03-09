import { create } from 'zustand';

// Mock data for demo purposes since Yahoo Finance API doesn't work well on web
const MOCK_PRICES: Record<string, number> = {
  AAPL: 175.43,
  GOOGL: 142.65,
  MSFT: 390.27,
  AMZN: 170.98,
  META: 480.42,
  TSLA: 185.10,
  NVDA: 840.35,
  AMD: 170.50,
};

interface Stock {
  symbol: string;
  shares: number;
  averagePrice: number;
  currentPrice?: number;
  totalValue?: number;
  gainLoss?: number;
  gainLossPercentage?: number;
}

interface PortfolioStore {
  stocks: Stock[];
  totalValue: number;
  isLoading: boolean;
  addStock: (stock: Omit<Stock, 'currentPrice' | 'totalValue' | 'gainLoss' | 'gainLossPercentage'>) => void;
  removeStock: (symbol: string) => void;
  updateStockPrices: () => Promise<void>;
}

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  stocks: [],
  totalValue: 0,
  isLoading: false,

  addStock: (stock) => {
    // Validate stock symbol
    if (!MOCK_PRICES[stock.symbol.toUpperCase()]) {
      console.error('Invalid stock symbol');
      return;
    }

    set((state) => ({
      stocks: [...state.stocks, {
        ...stock,
        symbol: stock.symbol.toUpperCase()
      }],
    }));
    get().updateStockPrices();
  },

  removeStock: (symbol) => {
    set((state) => ({
      stocks: state.stocks.filter((s) => s.symbol !== symbol),
    }));
    get().updateStockPrices();
  },

  updateStockPrices: async () => {
    const { stocks } = get();
    if (stocks.length === 0) {
      set({ totalValue: 0 });
      return;
    }

    set({ isLoading: true });

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const updatedStocks = stocks.map((stock) => {
        const currentPrice = MOCK_PRICES[stock.symbol] * (1 + (Math.random() * 0.02 - 0.01)); // Add small random variation
        const totalValue = currentPrice * stock.shares;
        const gainLoss = totalValue - stock.shares * stock.averagePrice;
        const gainLossPercentage = (gainLoss / (stock.shares * stock.averagePrice)) * 100;

        return {
          ...stock,
          currentPrice,
          totalValue,
          gainLoss,
          gainLossPercentage,
        };
      });

      const totalValue = updatedStocks.reduce((sum, stock) => sum + (stock.totalValue || 0), 0);

      set({
        stocks: updatedStocks,
        totalValue,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error updating stock prices:', error);
      set({ isLoading: false });
    }
  },
}));