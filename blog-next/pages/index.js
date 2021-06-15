import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Navbar from '/components/navbar'

export default function Home({ posts }) {
  return (
    <div>
      <Navbar />
      {/* loop over posts and display them */}
      {posts && 
        posts.map((post) => (
          <Link href={`/${post.slug}`} key={post.id}>
            <a>
              <h2>{post.title}</h2>
              <div>{post.user.username}</div>
            </a>
          </Link>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:1337/posts")
  const posts = await res.json()

  return {
    props: {posts},
  }
}
