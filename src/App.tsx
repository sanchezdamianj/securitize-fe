/* eslint-disable @typescript-eslint/no-explicit-any */
import './App.css'
import { Heading, Flex, Image, Box,Button,Input,FormControl, Spinner, AlertIcon,Alert } from '@chakra-ui/react'
import logo  from '/securitizeLogo.svg'
// import { WalletList } from './components/WalletList'
import {  useState } from 'react'
import { WalletWrapper } from './components/WalletWrapper'
import { useQuery,useMutation } from "react-query";
import axios from 'axios'
import useWalletsStore from './store/store'
// import { WalletInputSearch } from './components/WalletInputSearch'



function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [address, setAddress] = useState('')
  const [ wallets, setWallets] = useState([])
  const [spinner, setSpinner] = useState(false)


  const createWallet = async (address: string) => {
    setSpinner(true)
    await axios.put('http://localhost:3000/api/v1/wallets', 
    {
        address: address,
        isFavorite: false,
    },
    );
    const newWallet = {
      address: address,
      isFavorite: false,
    }
    useWalletsStore.getState().addWallet(newWallet) 

    const res = await axios.get(`http://localhost:3000/api/v1/wallets/${address}`,
    { withCredentials: true })
    const wallets = res.data
    setWallets(wallets)
    console.log(wallets)
    setSpinner(false)

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
      {/* <WalletInputSearch /> */}
    {
        isOpen && 
         <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"} gap={4} my={8}>
          {
            wallets?.isOld && 
              <Alert status='error'>
              <AlertIcon />
                This Wallet is Old
             </Alert>
          }
          {
            spinner
            ?
              <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
            />
            :
            <WalletWrapper balance={wallets?.balance} address={address}/>

          }
         </Flex>
  
        
    }

    
    </Box>
  )
}

export default App
