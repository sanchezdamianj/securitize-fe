import { Button,Input,FormControl } from '@chakra-ui/react'
import {  SetStateAction, useState } from 'react'
import useWalletsStore from '../store/store'


export const WalletInputSearch = () => {
    const [address, setAddress] = useState('')

    const handleChange = (e: { preventDefault: () => void; target: { value: SetStateAction<string> } }) => {
        e.preventDefault();
        setAddress(e.target.value)
      }

    const onSubmit = (e: { preventDefault: () => void }) => {
        useWalletsStore.getState().addWallet({address})
        e.preventDefault();
        setAddress('');
        console.log(useWalletsStore.getState().wallets)
    }
    
  return (
    <FormControl display={"flex"} justifyContent={"center"} alignItems={"center"} gap={1} >
        <Button type='submit' onSubmit={onSubmit}>Insert</Button>
          <Input
              placeholder="Enter an address"
              size="md"
              type="text"
              value={address? address : ''}
              onChange={handleChange}
          />
      </FormControl>
      )
}
