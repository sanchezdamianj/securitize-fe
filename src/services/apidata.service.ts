import axios from "axios";
import useWalletsStore from "../store/store";

export const getExchangeRate = async () => {  
    const response = await axios.get(`http://localhost:3000/api/v1/exchange-rate`);
    return response.data[0];
}


export const createWallet = async (address: string) => {
    await axios.put('http://localhost:3000/api/v1/wallets', 
    {
        address: address
    });

    const res = await axios.get(`http://localhost:3000/api/v1/wallets/${address}`,
    { withCredentials: true })
    const wallet = res.data

    const newWallet = {
      address: address,
      balance: +(wallet.balance),
      isFavorite: wallet?.isFavorite,
      isOld: wallet?.isOld,
    }
    useWalletsStore.getState().addWallet(newWallet) 
    return 
  };


  export const validateAddress = (address:string) => {
        return (/^(0x){1}[0-9a-fA-F]{40}$/i.test(address))
  }

  export const isUniqueInState = (address:string) => {
    const wallet = useWalletsStore.getState().wallets.find((wallet:any) => wallet.address === address)
    return !wallet
  
  }

  export const updateFavorite = async (address:string, favorite:boolean) => {
   
    await axios.patch(`http://localhost:3000/api/v1/wallets/${address}`,{
      isFavorite: favorite,
    })
  }