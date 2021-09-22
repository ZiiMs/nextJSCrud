import { Heading, HStack, IconButton, Spacer, useColorMode } from "@chakra-ui/react";
import React from "react";
import {IoMoon} from 'react-icons/io5';


const Header = () => {
  const {toggleColorMode} = useColorMode();
  return (
    <HStack as="nav" w="full" justifyContent="space-between" alignItems="center" py={4} px={6}>
      <Heading>Crud-NextJS</Heading>
      <Spacer/>
      <HStack spacing={6}>
        <Heading>Users</Heading>
        <IconButton variant="ghost" aria-label="toggle theme" icon={<IoMoon/>} onClick={toggleColorMode}/>
      </HStack>
    </HStack>
  )
};

export default Header;