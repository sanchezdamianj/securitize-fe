import axios from "axios";

export const getExchangeRate = async () => {  
    const response = await axios.get(`http://localhost:3000/api/v1/exchange-rate`);
    // const res = (+(response.data[0][currency])) 
    console.log(response.data);
    return response.data;
}