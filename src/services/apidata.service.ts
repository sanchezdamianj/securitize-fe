import axios from "axios";

export const getExchangeRate = async (currency:string) => {  
    const response = await axios.get(`http://localhost:3000/api/v1/exchange-rate`);
    const res = (+(response.data[0][currency])) 
    return res
}