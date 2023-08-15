
import {create} from 'zustand';
import { Wallet } from '../types';

interface WalletsState {
  wallets: Wallet[];
  addWallet: (wallet: Wallet) => void;
  toggleFavorite: (walletId: number) => void;
  sortWalletsByBalanceAsc: () => void;
  sortWalletsByBalanceDes: () => void;
  setExchangeRates: (rates: object | undefined) => void;
  exchangeRates: object;
  sortByFavorites: () => void;
  updateWalletAmount: (walletId:any, newAmount:number) => void;
  isloading: boolean;
}

const useWalletsStore = create<WalletsState>((set) => ({
  wallets: [],
  exchangeRates: {},
  isloading: false,
  addWallet: (wallet) => set((state) => ({ wallets: [...state.wallets, wallet] })),
  updateWalletAmount: (address, newAmount:number) =>
    set((state) => ({
      wallets: state.wallets.map((wallet) =>
        wallet.address === address ? { ...wallet, balance: newAmount } : wallet
      ),
  })),
  toggleFavorite: (walletId) =>
    set((state) => ({
      wallets: state.wallets.map((wallet) =>
        wallet.id === walletId ? { ...wallet, isFavorite: !wallet.isFavorite } : wallet
      ),
    })),
    sortByFavorites: () =>
      set((state) => ({
        wallets: [...state.wallets].sort((a, b) =>
        b.isFavorite === a.isFavorite ? 0 : a.isFavorite ? -1 : 1 ),
      })),
  sortWalletsByBalanceAsc: () =>
    set((state) => ({
      wallets: [...state.wallets].sort((a, b) =>(a.balance || 0) - (b.balance || 0)),
    })),
  sortWalletsByBalanceDes: () =>
    set((state) => ({
      wallets: [...state.wallets].sort((a, b) =>(b.balance || 0) - (a.balance || 0)),
    })),
  setExchangeRates: (rates) => set({ exchangeRates: rates }),
  })
);


export default useWalletsStore;
