import {Flex,Input, Button } from '@chakra-ui/react'


export const SearchWalletAddresses = () => {
  return (
    <Flex justifyContent={"center"} alignItems={"center"} gap={1}>
        <Button>Insert</Button>
        <Input
            placeholder="Enter a set of addresses splitted by comma"
            size="md"
            type="text"
        />

    </Flex>

  )
}
