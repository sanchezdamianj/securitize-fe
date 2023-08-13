/* eslint-disable @typescript-eslint/no-explicit-any */
import './App.css'
import { Heading, Flex, Image, Box,Button,Input,FormControl, Spinner} from '@chakra-ui/react'
import logo  from '/securitizeLogo.svg'
import {  useState } from 'react'
import { WalletWrapper } from './components/WalletWrapper'
import { useMutation } from "react-query";
import axios from 'axios'
import useWalletsStore from './store/store'


function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [address, setAddress] = useState('')
  const [spinner, setSpinner] = useState(false)

  const createWallet = async (address: string) => {
    setSpinner(true)
    await axios.put('http://localhost:3000/api/v1/wallets', 
    {
        address: address,
        isFavorite: false,
    },
    );

    const res = await axios.get(`http://localhost:3000/api/v1/wallets/${address}`,
    { withCredentials: true })
    const wallets = res.data
  
    const newWallet = {
      address: address,
      balance: +(wallets.balance),
      isFavorite: false,
      isOld: wallets?.isOld,
    }
    useWalletsStore.getState().addWallet(newWallet) 
    setSpinner(false)
    return  <WalletWrapper />
  };

  const {mutate} = useMutation(createWallet)

  const handleClick = () => { 
    setIsOpen(true)
    mutate(address)
  }

  const handleChange = (event:any) => {
    setAddress(event.target.value)
  }


  return (
    <Box mt={8}>
    <Flex justifyContent={"center"} alignItems={"center"} gap={4} m={8} >
      <Heading color={'#F39D39'}>Securitize app </Heading>
      <Image src={logo} alt='securitize' boxSize='50px'
    objectFit='cover'/>
    </Flex>

      <FormControl display={"flex"} justifyContent={"center"} alignItems={"center"} gap={1}>
        <Button onClick={handleClick} type='submit'>Insert
        </Button>
          <Input
              placeholder="Enter an address"
              size="md"
              type="text"
              value={address? address : ''}
              onChange={handleChange}
          />
      </FormControl>
    {
        isOpen && 
         <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"} my={8}>
          {spinner ? <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                         />
                   :
                      (<>
                        {/* <WalletList /> */}
                        <WalletWrapper />
                      </>
                      )
          }
         </Flex>
          }

    </Box>
  )
}

export default App
