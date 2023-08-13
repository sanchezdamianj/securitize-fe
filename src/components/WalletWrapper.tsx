
import {Flex, Divider,  AlertIcon,Alert, Button}  from '@chakra-ui/react'
import Wallet from './Wallet'
import WalletConvertion from './WalletConvertion'
import useWalletsStore from '../store/store'
import { useState,useEffect } from 'react'


export const WalletWrapper = () => {
  const wallets = useWalletsStore.getState().wallets
  const [sortedWallet, setSortedWallet] = useState<Wallet[]>([])

  const handleSortWalletsAsc = () => {
    useWalletsStore.getState().sortWalletsByBalanceAsc()
    setSortedWallet(useWalletsStore.getState().wallets)
  }
  const handleSortWalletsDesc = () => {
    useWalletsStore.getState().sortWalletsByBalanceDes()
    setSortedWallet(useWalletsStore.getState().wallets)
  }
  
  useEffect(()=>{
    setSortedWallet(wallets)
  },[wallets])

  return (
    <>
    <Flex justifyContent={"end"} alignItems={"center"} my={4} gap={2}>
      <Button onClick={handleSortWalletsAsc}>Sort Asc</Button>
      <Button onClick={handleSortWalletsDesc}>Sort Desc</Button>
    </Flex>
    <div>{sortedWallet.map((w)=>{return (
      <div key={w.address}>
        {   w.isOld && (
            <Alert status='error'>
                <AlertIcon />
                This Wallet is Old
            </Alert>)
       }
      <Flex  gap={8} justifyContent={"center"} alignItems={"center"} width={"100%"} my={4} > 
        <Wallet balance={w.balance} address={w.address} />    
        <WalletConvertion balance={w.balance} address={w.address} />
      </Flex>
      <Divider mt={12} />
      </div> )}) }
  
    </div>
    </>
  )
}
