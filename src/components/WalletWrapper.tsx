
import {Flex, Divider}  from '@chakra-ui/react'
import Wallet from './Wallet'
import WalletConvertion from './WalletConvertion'

interface Props {
    address?: string 
    balance?: number

}

export const WalletWrapper = ({address, balance}:Props) => {
  
  return (
    <>
      <Flex gap={10} justifyContent={"center"} width={"100%"}>
        <Wallet balance={balance} address={address} />    
        <WalletConvertion address={address} balance={balance}   />
      </Flex>
      <Divider mt={4} />
    </>
  )
}
