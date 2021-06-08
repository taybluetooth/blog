import Link from 'next/link'
import Markdown from 'markdown-to-jsx';

export default function Post({ post }) {
    
    return (
        <div className='slug-page'>
            <div className="navbar">
                <div className="navbar-content">
                    <a>Home</a>
                    <a>About</a>
                    <a>Projects</a>
                    <a>Contact</a>
                </div>
            </div>
            <div className='slug-header-section'>
                <div className='image-square'>
                    {/*change url when in production!*/} 
                    <img src={`http://localhost:1337` + post.image.url}></img>
                </div>
                <h2>{post.title}</h2>
                <h2>{post.user.username} - {post.user.created_at.substring(0,10)}</h2>
            </div>
            <div className='slug-post-section'>
                <div className='slug-post-section-content'>
                    <div className='author-image-rounded'>
                        <img src={`http://localhost:1337` + post.user.profilePic.url}></img>
                    </div>
                    <Markdown options={{ forceBlock: true }}>{post.content}</Markdown>
                </div>
            </div>
            <div className='slug-footer-section'>
                <p>SOCIAL MEDIA LINKS</p>
                <p>CONTACT DETAILS</p>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const res = await fetch('http://localhost:1337/posts')
    const data = await res.json()

    const paths = data.map((post) => ( {
        params: { slug: post.slug },
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const { slug } = params;
    const res = await fetch(`http://localhost:1337/posts?slug=${slug}`)
    const data = await res.json()
    const post = data[0]

    return {
        props: { post },
    }
}