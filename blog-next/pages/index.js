import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '/components/navbar'

export default function Home({ posts }) {
  return (
    <div className='home-page'>
      <Navbar />
      {/* loop over posts and display them */}
      <div className='home-content'>
        <div className='home-header'>
          <div className='header-text'>
            <h1><strong>Blog.</strong></h1>
            <p>All kinds of posts, tutorials and walkthroughs in one place.</p>
          </div>
        </div>
        <div className='home-body'>
          <div className='body-content'>
            <div className='home-search'>
              <div className='search-content'>
                <h1>Search for posts</h1>
                <input type='search'></input>
              </div>
            </div>
            <div className='home-posts'>
              <h2>2021</h2>
              {posts && 
                  posts.map((post) => (
                      <Link href={`/${post.slug}`} key={post.id}>
                        <a>
                          <div className='post'>
                            <p><strong>{new Date(post.user.created_at.substring(0,10)).toDateString().substring(4,10)}</strong></p>
                            <h1><strong>{post.title}</strong></h1>
                          </div>
                        </a>
                      </Link>
                ))
              }
            </div>
          </div>
        </div>
      </div>
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
