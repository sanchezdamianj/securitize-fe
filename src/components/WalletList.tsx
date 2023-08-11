import {
    Table,
  
    Tbody,
    Tr,
 
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import {WalletWrapper} from './WalletWrapper'
import { Wallet } from '../types'
import useWalletsStore from '../store/store';


export const WalletList = () => {
  const wallets: Wallet[] = useWalletsStore((state) => state.wallets);
  return (
    <TableContainer>
    <Table variant='simple' colorScheme='teal'>
      <TableCaption>List of Wallets</TableCaption>

      <Tbody gap={4}>
        {wallets &&
         wallets.map((wallet:Wallet) => {
           return (
            <Tr key={wallet.account} mt={2}>
               <Td><WalletWrapper address={wallet?.account} balance={wallet.balance} /></Td> 
               
            </Tr>
            )}
         )
        }

      </Tbody>
    </Table>
  </TableContainer>
  )
}
