import {
  Textarea,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  VStack,
  Heading,
  Input,
  FormControl,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import PostContext from 'src/context/postsContext';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: any;
  Title: string;
  Text: string;
  User: string;
  id?: string;
};

const PostDialog = ({
  isOpen,
  onClose,
  handleSubmit,
  Title,
  Text,
  User,
  id,
}: Props) => {
  const [title, setTitle] = useState(Title);
  const [user, setUser] = useState(User);
  const [text, setText] = useState(Text);

  const submit = (e: any) => {
    if (id) {
      handleSubmit(e, title, text, user, id);
    } else {
      handleSubmit(e, title, text, user);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your new post</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <FormControl>
            <HStack pb={2}>
              <VStack alignItems='flex-start'>
                <Heading size='sm' pb={1}>
                  Title
                </Heading>
                <Input
                  placeholder='Title'
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </VStack>
              <VStack alignItems='flex-start'>
                <Heading size='sm' pb={1}>
                  User
                </Heading>
                <Input
                  placeholder='User'
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                />
              </VStack>
            </HStack>
            <Heading size='sm' pb={2}>
              Text
            </Heading>
            <Textarea
              placeholder='Text'
              size='sm'
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr={4} onClick={submit}>
            Submit
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PostDialog;
