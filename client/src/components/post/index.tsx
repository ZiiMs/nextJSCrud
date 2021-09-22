import {
	Box,
	Flex,
	Heading,
	HStack,
	IconButton,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { PostType } from '../../../pages';
import { MdEdit, MdDelete } from 'react-icons/md';

interface Props {
	Post: PostType;
	edit: any;
	remove: any;
}

const Post: React.FC<Props> = ({ Post, edit, remove }) => {
	return (
		<div>
			<Box
				maxW='2xl'
				w={'2xl'}
				py={4}
				px={6}
				rounded={'md'}
				boxShadow={'xl'}
				overflow='hidden'
				bg={useColorModeValue('white', 'gray.900')}
			>
				<Stack>
					<Flex justifyContent={'space-between'} alignItems='center'>
						<Heading
							fontSize='2xl'
							fontFamily={'body'}
							color={useColorModeValue('gray.700', 'white')}
						>
							{Post.title}
						</Heading>
						<HStack spacing={1}>
							<IconButton
								onClick={(e) => edit(e, Post._id)}
								size={'md'}
								aria-label='edit button'
								colorScheme='blue'
								variant='ghost'
								icon={<MdEdit />}
							/>
							<IconButton
								onClick={(e) => remove(e, Post._id)}
								size={'md'}
								aria-label='delete button'
								colorScheme='red'
								variant='ghost'
								icon={<MdDelete />}
							/>
						</HStack>
					</Flex>
					<Text color={useColorModeValue('gray.500', 'gray.400')}>
						{Post.body}
					</Text>
				</Stack>
				<Stack mt={6} direction={'column'} spacing={0} fontSize={'sm'}>
					<Text fontWeight={600}>{Post.user}</Text>
					<Text color={useColorModeValue('gray.400', 'gray.500')}>
						{Post.time}
					</Text>
				</Stack>
			</Box>
		</div>
	);
};

export default Post;
