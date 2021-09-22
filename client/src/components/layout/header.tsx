import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Textarea,
  useColorMode,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { IoMoon, IoSunny } from 'react-icons/io5';
import PostContext from '../../context/postsContext';
import PostDialog from '../postmodal';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { dispatch } = useContext(PostContext);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLElement>,
    title: string,
    text: string,
    user: string
  ) => {
    e.preventDefault();
    fetch('http://localhost:1337/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body: text,
        user,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        onClose();
        dispatch('posts', json.post);
      });
  };

  return (
    <HStack
      as='nav'
      justifyContent='space-between'
      alignItems='center'
      pt={3}
      px={6}
    >
      <PostDialog
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={handleSubmit}
        Title={''}
        Text={''}
        User={''}
      />
      <Heading size='sm' alignItems='flex-start'>
        Crud-NextJS
      </Heading>
      <Spacer />
      <HStack spacing={6}>
        <Button size='sm' variant='ghost' onClick={onOpen}>
          Post
        </Button>
        <IconButton
          size='sm'
          variant='ghost'
          aria-label='toggle theme'
          icon={colorMode == 'light' ? <IoMoon /> : <IoSunny />}
          onClick={toggleColorMode}
        />
      </HStack>
    </HStack>
  );
};

export default Header;
