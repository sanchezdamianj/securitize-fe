/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardBody, Flex,Input, Button, IconButton } from '@chakra-ui/react'
import { EditIcon,CloseIcon,CheckIcon,StarIcon } from '@chakra-ui/icons'

import { useMemo, useState } from 'react'

import { Wallet } from '../types'
import useWalletsStore from '../store/store'


const Wallet = ({ balance }:Wallet) => {
    const [isAllowed, setIsAllowed] = useState(false)
    const [newAmount, setNewAmount ] = useState<number>(0)
    
    const handleAmountChange = () => {
    //aca editar el amount de balance de esa wallet en el state de zustand
    //     useWalletsStore.getState().setNewAmount(newAmount)
     }
    
    const handleChange = (e:any) => {
        setNewAmount(e.target.value)
    }

    // useMemo(() => {
    //     setNewAmount(useWalletsStore.getState().wallets    editar esa wallet)
    // },[useWalletsStore.getState().wallets])


  return (
    <Card boxShadow="lg" border={"2px solid #DDDDDD"} backgroundColor={"#F8F9FB"} p={"5px 15px 20px"}  w={"100%"} minWidth={"270px"}>
    <CardBody display={"flex"} justifyContent={"space=between"} alignItems={"center"} gap={2}> 
        <IconButton aria-label='markFavorite'  icon={<StarIcon alignSelf={"center"} justifySelf={"start"}/>}
        >
            
        </IconButton>
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