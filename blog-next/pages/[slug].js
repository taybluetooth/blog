import Markdown from 'markdown-to-jsx'
import Navbar from '../components/navbar'

export default function Post({ post }) {
    /* make each component seperate */
    return (
        <div className='slug-page'>
            <Navbar />
            <div className='slug-header-section'>
                <div className='slug-header-section-content'>
                    <div className='slug-header-section-content-left'>
                        <h1>{post.title}</h1>
                        <h3>By <b>{post.user.username}</b> on {new Date(post.user.created_at.substring(0,10)).toDateString()}</h3>
                    </div>
                    <div className='slug-header-section-content-right'>
                        <div className='image-square'>
                            {/*change url when in production!*/} 
                            <img src={`http://localhost:1337` + post.headerImage.url}></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className='slug-post-section'>
                <div className='slug-post-section-content'>
                    <Markdown options={{ forceBlock: true }}>{post.content}</Markdown>
                    {post.featureImage ?
                        <div className='image-feature'>
                            <img src={`http://localhost:1337` + post.featureImage.url}></img>
                        </div>
                        :
                        <div></div>
                    }
                </div>
            </div>
            <div className='slug-author-section'>
                <div className='slug-author-section-content'>
                    <div className='slug-author-section-content-left'>
                        <h1>About The Author</h1>
                        <h3>
                            Hey I am <span>Callum</span>, a Software Engineer, Language Enthusiast and Full-Time Nerd.
                            This is my new blog based around fullstack development tutorials involving JavaScript and other bits and pieces.
                        </h3>
                        <button>See my GitHub x</button>
                    </div>
                    <div className='slug-author-section-content-right'>
                        <div className='slug-author-section-content-right-img image-square'>
                            <img src={`http://localhost:1337` + post.user.profilePic.url}></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className='slug-footer-section'>
                <p>Developed by Callum Taylor (2021)</p>
                <div className='slug-footer-section-content'>
                    <div className='image-square small'>
                        <img src='Octocat.png'></img>
                    </div>
                    <div className='image-square small'>
                        <img src='react.png'></img>
                    </div>
                    <div className='image-square small'>
                        <img src='next-js.svg'></img>
                    </div>
                </div>
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