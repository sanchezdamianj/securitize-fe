import {create} from 'zustand';
import { Wallet } from '../types';

const useWalletStore = create((set) => ({
  wallets: [],
  addWallet: (wallet:Wallet) => set((state:Wallet[]) => ({ wallets: [...state, wallet] }))
 
//   toggleFavorite: (address:Wallet) =>
//     set((state:Wallet) => ({
//       wallets: state.address.map((wallet:Wallet) =>
//         wallet.address === address ? { ...wallet, isFavorite: !wallet.isFavorite } : wallet
//       ),
//     })),
}));

export default useWalletStore;
