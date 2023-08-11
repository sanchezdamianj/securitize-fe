import {create} from 'zustand';
import { Wallet } from '../types';

interface WalletsState {
  wallets: Wallet[];
  addWallet: (wallet: Wallet) => void;
  toggleFavorite: (walletId: number) => void;
  sortWalletsByBalance: () => void;
}

const useWalletsStore = create<WalletsState>((set) => ({
  wallets: [],
  addWallet: (wallet) => set((state) => ({ wallets: [...state.wallets, wallet] })),
  toggleFavorite: (walletId) =>
    set((state) => ({
      wallets: state.wallets.map((wallet) =>
        wallet.id === walletId ? { ...wallet, isFavorite: !wallet.isFavorite } : wallet
      ),
    })),
  sortWalletsByBalance: () =>
    set((state) => ({
      wallets: [...state.wallets].sort((a, b) => (b.balance || 0) - (a.balance || 0)),
    })),
}));




export default useWalletsStore;
