import Markdown from 'markdown-to-jsx'
import Navbar from '../components/navbar'

export default function Post({ post }) {
    /* make each component seperate */
    return (
        <div className='slug-page'>
            <Navbar />
            <div className='slug-header-section'>
                <div className='image-square'>
                    {/*change url when in production!*/} 
                    <img src={`http://localhost:1337` + post.image.url}></img>
                </div>
                <h1>{post.title}</h1>
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
                <p>Developed by Callum Taylor (2021)</p>
                <p>Powered by React and Next.js</p>
                <p>Content managed by Strapi</p>
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