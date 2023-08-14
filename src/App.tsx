import './App.css'
import { Heading, Flex, Image, Box,Button,Input,FormControl, useToast} from '@chakra-ui/react'
import logo  from '/securitizeLogo.svg'
import {  useState } from 'react'
import { WalletWrapper } from './components/WalletWrapper'
import { useMutation } from "react-query";
import { createWallet, isUniqueInState, validateAddress } from './services/apidata.service'


function App() {
  const [address, setAddress] = useState('')
  const {mutate} = useMutation(createWallet)
  const toast = useToast()
  
  const handleClick = () => { 
    if(validateAddress(address) && isUniqueInState(address)){
      mutate(address)
    }else {
      toast({title:'Invalid address', status:'error', duration:3000})
    }
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
      <WalletWrapper />
    </Box>
  )
}

export default App
