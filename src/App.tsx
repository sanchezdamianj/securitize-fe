import './App.css'
import { Heading, Flex, Image, Box,Button,Input,FormControl, Spinner, AlertIcon,Alert } from '@chakra-ui/react'
import logo  from '/securitizeLogo.svg'
// import { WalletList } from './components/WalletList'
import {  useState } from 'react'
import { WalletWrapper } from './components/WalletWrapper'
import { useQuery } from "react-query";
import axios from 'axios'



function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [address, setAddress] = useState('')
  const { data: wallets, isLoading } = useQuery({
    queryKey: ['wallets'], queryFn: async () => {
        const res = await axios.get(`http://localhost:3000/api/v1/wallets/${address}`,
            { withCredentials: true })
            console.log(res.data)
        return res.data
    }
})


if (isLoading) return <Spinner
    thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
    size='xl'
/>
const createWallet = async (address: string) => {
  await axios.put('http://localhost:3000/api/v1/wallets', 
  {
      address: address,
      isFavorite: false,
  },
  );
  console.log('Created Wallet');
};

  const handleClick = () => { 
    setIsOpen(true)
    createWallet(address)
  }

  const handleChange = (event:any) => {
    event.preventDefault();
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
         <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"} gap={4} my={8}>
          {
            wallets?.isOld && 
              <Alert status='warning'>
              <AlertIcon />
                This Wallet is Old
             </Alert>
          }
           
           <WalletWrapper balance={wallets?.balance} address={address}/>

         </Flex>
  
        
    }

    
    </Box>
  )
}

export default App
