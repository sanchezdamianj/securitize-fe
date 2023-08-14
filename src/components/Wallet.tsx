/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardBody, Flex,Input, Button } from '@chakra-ui/react'
import { EditIcon,CloseIcon,CheckIcon } from '@chakra-ui/icons'
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useEffect, useState } from 'react'

import { Wallet } from '../types'
import useWalletsStore from '../store/store'
import { updateFavorite } from '../services/apidata.service';


const Wallet = ({address,  balance }:Wallet) => {
    const [isAllowed, setIsAllowed] = useState(false)
    const [newAmount, setNewAmount ] = useState<number>(0)
    const [favorite, setFavorite] = useState(false)
    
    const handleAmountChange = () => {
    //aca editar el amount de balance de esa wallet en el state de zustand y que recalcule el exc rate
    //     useWalletsStore.getState().setNewAmount(newAmount)
     }
    
    const handleChange = (e:any) => {
        setNewAmount(e.target.value)
    }
     
    const walletFoundInState = useWalletsStore.getState().wallets.find(wallet => wallet.address === address)
    const handleFavorite = () => {
        if(walletFoundInState){
            walletFoundInState.isFavorite = !walletFoundInState.isFavorite
            setFavorite(walletFoundInState.isFavorite)
            
        }
    }

    useEffect(()=>{
        const walletFoundInState = useWalletsStore.getState().wallets.find(wallet => wallet.address === address)
        updateFavorite(walletFoundInState?.address as string, favorite)
    },[favorite])

  return (
    <Card boxShadow="lg" border={"2px solid #DDDDDD"} backgroundColor={"#F8F9FB"} p={"15px 15px 30px"}  w={"100%"} minWidth={"270px"}>
    <CardBody display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={2}> 
        <Button onClick={handleFavorite}
        >
            {
               (favorite) ?  <AiFillStar style={{height: "20px", width:"20px"}}/> : <AiOutlineStar style={{height: "20px", width:"20px"}}/>
            }
        </Button>
        <Input 
            isDisabled={!isAllowed}
            placeholder='Enter your ETH'
            value={balance || newAmount}
            style={{fontFamily: "600"}}
            onChange={handleChange}
            
        />
        {
            isAllowed? 
                <Flex alignItems={"center"} justifyContent={"space-between"} gap={2}>
                    <Button 
                        color={'#3488EF'}
                        colorScheme='#3488EF'
                        onClick={() => {
                            setIsAllowed(false)
                        }
                    }
                    >
                        <CloseIcon/>
                    </Button>
                    <Button
                        _hover={{ bg: "orange", color: " white", transition: "0.3s background-color ease-out, 0.2s color ease-out" }}
                    >
                        <CheckIcon
                            boxSize={4}
                            color={'#3488EF'}
                            onClick={() => {
                                handleAmountChange()
                                setIsAllowed(false)
        
                            }} 
                           
                        />
                    </Button>
                </Flex>
                :  
                <Button onClick={() => setIsAllowed(!isAllowed)}>    
                    <EditIcon/>
                </Button>
        }
    </CardBody>
  </Card>
  )
}
export default Wallet