import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home({ posts }) {
  return (
    <div>
      {/* loop over posts and display them */}
      {posts && 
        posts.map((post) => (
          <Link href={`/${post.Slug}`} key={post.id}>
            <a>
              <h2>{post.Title}</h2>
              <div>{post.User.username}</div>
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
