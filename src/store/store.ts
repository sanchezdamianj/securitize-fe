
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
}

const useWalletsStore = create<WalletsState>((set) => ({
  wallets: [],
  exchangeRates: {},
  addWallet: (wallet) => set((state) => ({ wallets: [...state.wallets, wallet] })),
  //actualizar el balance de la walllet con el nuevo valor
  // updateWalletAmount: (address, amount) => set((state) =>({wallets: [...state.wallets,]})),
  // pickOne:  (wallet) => set((state) => ({ wallets: [...state.wallets, {...wallet, balance: }] })),
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
