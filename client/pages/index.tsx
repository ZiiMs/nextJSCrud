import { VStack } from '@chakra-ui/react'
import type { NextPage, GetStaticProps, InferGetStaticPropsType  } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Post from '../src/components/post'

export type PostType = {
  _id: string,
  title: string,
  body: string,
  user: string,
  time: string,
}



export const getStaticProps = async () => {
  const res = await fetch("http://localhost:1337/fetchAll")
  const message: any = await res.json()
  const data: PostType[] = message.data
  return {
    props: {
      data,
    }
  }
}


const Home = ({ data  }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [posts, setPosts] = useState(data)
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    setTimer(1)
    const fetchData = async () => {
      const res = await fetch("http://localhost:1337/fetchAll")
      const message: any = await res.json()
      const data: PostType[] = message.data
      setPosts(data)
    }
    const timeout = setTimeout(() => {
      fetchData()
      setTimer(0);
    }, 45000)
    return () => {
      clearTimeout(timeout)
    }
  }, [timer])

  const editClick = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    console.log(`Clicked Edit!: ${id}`)
  }
  const deleteClick = async (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    console.log(`Clicked delete!: ${id}`)
    const res = await fetch("http://localhost:1337/delete", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        "id": id
      })
    })
    const success = await res.json()
    if(!success.success) {
      console.log("Error document not found.")
      return;
    }
    const tempPosts = posts.filter((ele) => {
      return ele._id != id 
    });
    setPosts(tempPosts)
  }
  return (
    <div>
      <VStack spacing={4} align="center">
      {posts.map((post) => (
        <Post key={post._id} Post={post} edit={editClick} remove={deleteClick}/>
      ))}
      </VStack>
    </div>
  )
}


export default Home
