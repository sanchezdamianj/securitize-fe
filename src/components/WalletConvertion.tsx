import { Card,  CardBody, Text, Select,FormControl } from '@chakra-ui/react'
import { Wallet } from '../types'
import axios from 'axios';
import { useState } from 'react';


const WalletConvertion = ({balance}:Wallet) => {
  const [currency, setCurrency] = useState<string>("Select currency");
  const [exchangeRate, setExchangeRate] = useState<number>(0);

  const getEchangeRate = async (currency:string) => {  
  const response = await axios.get(`http://localhost:3000/api/v1/exchange-rate`);
  const res = response.data[0]
  setExchangeRate(+res[currency]) 
}

const handleChange = (e:any) => {
  e.preventDefault();
  
    setCurrency(e.target.value);  
    getEchangeRate(currency);
    console.log(e.target.value);
}

  return (
    <Card boxShadow="lg" border={"2px solid #DDDDDD"} backgroundColor={"#F8F9FB"} p={"5px 15px 20px"} w={"100%"} minWidth={"270px"}>
    <CardBody display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2}>
    <FormControl display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={2}>
        <Text>{((balance * exchangeRate).toFixed(3))?? 0}</Text>
            <Select onChange={handleChange}>
                {['Select currency','USD', 'EUR'].map(currency => 
                <option key={currency} value={currency}> {currency}</option>
                )
                }
            </Select>       
    </FormControl>
    </CardBody>
   
  </Card>
  )
}
export default WalletConvertion