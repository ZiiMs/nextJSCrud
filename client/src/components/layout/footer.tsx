import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  return (
    <Flex pb={4}>
      <Text color={useColorModeValue('gray.500', 'gray.500')} size='sm'>
        @ 2021 Alex Tedesco
      </Text>
    </Flex>
  );
};

export default Footer;
