import { Container,VStack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import Header from "./header";


type Props = PropsWithChildren<{}>;

const Layout = ({children}: Props) => {
  return (
    <Container maxW="container.md">
      <VStack>
        <Header />
        {children}
      </VStack>
    </Container>
  );
};

export default Layout