import { useDisclosure, useToast, VStack } from '@chakra-ui/react';
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import Post from '@/components/post';
import PostContext from '../src/context/postsContext';
import React from 'react';
import PostDialog from '@/components/postmodal';

export type PostType = {
	_id: string;
	title: string;
	body: string;
	user: string;
	time: string;
};

export const getStaticProps = async () => {
	const res = await fetch('http://localhost:1337/fetchAll');
	const message: any = await res.json();
	const data: PostType[] = message.data;

	return {
		props: {
			data,
		},
	};
};

const Home = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
	const [posts, setPosts] = useState(data);
	const [timer, setTimer] = useState(0);
	const { add } = useContext(PostContext);
	const [openId, setOpenId]: any = useState(0);
	const toast = useToast();

	const getNewPost = (post: PostType) => {
		setPosts((prevState) => [...prevState, post]);
	};

	useEffect(() => {
		add('posts', getNewPost);
	}, [add]);

	useEffect(() => {
		setTimer(1);
		const fetchData = async () => {
			const res = await fetch('http://localhost:1337/fetchAll');
			const message: any = await res.json();
			const data: PostType[] = message.data;
			setPosts(data);
		};
		const timeout = setTimeout(() => {
			fetchData();
			setTimer(0);
		}, 45000);
		return () => {
			clearTimeout(timeout);
		};
	}, [timer]);

	const handleSubmit = async (
		e: React.MouseEvent<HTMLElement>,
		title: string,
		text: string,
		user: string,
		id: string,
		index: number
	) => {
		e.preventDefault();
		console.log(id);
		fetch('http://localhost:1337/update', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title,
				body: text,
				user,
				id,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				setOpenId(null);
				let tempPost = posts[index];
				tempPost.body = text;
				tempPost.title = title;
				tempPost.user = user;

				const tempPosts = [
					...posts.slice(0, index),
					tempPost,
					...posts.slice(index + 1),
				];
				setPosts(tempPosts);
			});
	};

	const editClick = (e: React.MouseEvent<HTMLElement>, id: string) => {
		e.preventDefault();
		console.log(id);
		setOpenId(id);
	};
	const deleteClick = async (
		e: React.MouseEvent<HTMLElement>,
		id: string
	) => {
		e.preventDefault();
		const res = await fetch('http://localhost:1337/delete', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: id,
			}),
		});
		const success = await res.json();
		if (!success.success) {
			console.log('Error document not found.');
			return;
		}
		const tempPosts = posts.filter((ele) => {
			return ele._id != id;
		});
		setPosts(tempPosts);
		toast({
			title: `Delete post ${id}`,
			status: 'error',
			isClosable: true,
		});
	};

	return (
		<div>
			<VStack spacing={4} align='center'>
				{posts.map((post, i) => (
					<div key={post._id}>
						<Post
							Post={post}
							edit={editClick}
							remove={deleteClick}
						/>
						<PostDialog
							isOpen={openId == post._id}
							onClose={() => setOpenId(null)}
							handleSubmit={(
								e: React.MouseEvent<HTMLElement, MouseEvent>,
								title: string,
								text: string,
								user: string,
								id: string
							) => handleSubmit(e, title, text, user, id, i)}
							Title={post.title}
							Text={post.body}
							User={post.user}
							id={post._id}
						/>
					</div>
				))}
			</VStack>
		</div>
	);
};

export default Home;
