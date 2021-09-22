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

const Header = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [title, setTitle] = useState('');
	const [user, setUser] = useState('');
	const [text, setText] = useState('');
	const { dispatch } = useContext(PostContext);

	const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
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
				setTitle('');
				setText('');
				setUser('');
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
										onChange={(e) =>
											setTitle(e.target.value)
										}
										value={title}
									/>
								</VStack>
								<VStack alignItems='flex-start'>
									<Heading size='sm' pb={1}>
										User
									</Heading>
									<Input
										placeholder='User'
										onChange={(e) =>
											setUser(e.target.value)
										}
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
						<Button mr={4} onClick={handleSubmit}>
							Submit
						</Button>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Heading size='sm'>Crud-NextJS</Heading>
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
