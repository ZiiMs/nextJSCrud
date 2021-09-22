import { Box, Container, VStack } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import Footer from './footer';
import Header from './header';

type Props = PropsWithChildren<{}>;

const Layout = ({ children }: Props) => {
  return (
    <Container
      maxW='container.md'
      display='flex'
      minH={{ base: 'auto', md: '100vh' }}
    >
      <VStack flex={1} spacing={8} alignItems='stretch'>
        <Header />
        <Box flex={1}>{children}</Box>
        <Footer />
      </VStack>
    </Container>
  );
};

export default Layout;
