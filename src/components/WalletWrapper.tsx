
import {Flex, Divider,  AlertIcon,Alert, Button, Spinner}  from '@chakra-ui/react'
import Wallet from './Wallet'
import WalletConvertion from './WalletConvertion'
import useWalletsStore from '../store/store'
import { useState,useEffect } from 'react'


export const WalletWrapper = () => {
  const wallets = useWalletsStore.getState().wallets
  const [sortedWallet, setSortedWallet] = useState<Wallet[]>([])
  
  const handleSortedFavorite = () => {
    useWalletsStore.getState().sortByFavorites()
    setSortedWallet(useWalletsStore.getState().wallets)
  }

  useEffect(()=>{
    setSortedWallet(wallets)
  },[wallets])

  return (
    <div>
      <Flex justifyContent={"end"} alignItems={"stretch"} my={4} gap={2}>
        <Button onClick={handleSortedFavorite}>Sort By Favs</Button>
      </Flex>
      {
      !sortedWallet ? 
         <Flex flexDir={"column"} justifyContent={"center"} alignItems={"stretch"} my={8}>
           <Spinner
                        thickness='4px'
                        alignSelf={"center"}
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                         />
        </Flex>
              :
      <div>{sortedWallet.map((w)=>{return (
        <div key={w.address}>
          {   w.isOld && (
              <Alert status='error'>
                  <AlertIcon />
                  This Wallet is Old
              </Alert>)
          }
          <Flex  gap={8} justifyContent={"center"}  my={4} > 
            <Wallet balance={w.balance} address={w.address} />    
            <WalletConvertion balance={w.balance} address={w.address} />
          </Flex>
          <Divider mt={12} />
        </div> )}) }
      </div>
      } 
    </div>
  )
}
