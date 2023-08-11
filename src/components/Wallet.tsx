/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardBody, Flex,Input, Button } from '@chakra-ui/react'
import { EditIcon,CloseIcon,CheckIcon } from '@chakra-ui/icons'
import { useState } from 'react'

import { Wallet } from '../types'


const Wallet = ({ balance}:Wallet) => {
    const [isAllowed, setIsAllowed] = useState(false)

  return (
    <Card boxShadow="lg" border={"2px solid #DDDDDD"} backgroundColor={"#F8F9FB"} p={"5px 15px 20px"}  w={"100%"} minWidth={"270px"}>
    <CardBody display={"flex"} justifyContent={"space=between"} alignItems={"center"} gap={2}> 
        <Input 
            isDisabled={!isAllowed}
            placeholder='Enter your ETH'
            value={balance?? ''}
            style={{fontFamily: "600"}}
            
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