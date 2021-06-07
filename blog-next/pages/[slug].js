import Link from 'next/link'

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
                <img className="w-20 justify-center mx-auto" src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Darth_Vader_in_The_Empire_Strikes_Back.jpg/220px-Darth_Vader_in_The_Empire_Strikes_Back.jpg"></img>
                <h1>{post.Title}</h1>
                <h1>{post.User.username} - {post.User.created_at.substring(0,10)} - {post.User.email}</h1>
            </div>
            <div className='slug-post-section'>
                <h1>{post.Content}</h1>
            </div>
            <div className='slug-footer-section'>
                <h1>SOCIAL MEDIA LINKS</h1>
                <h1>CONTACT DETAILS</h1>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const res = await fetch('http://localhost:1337/posts')
    const data = await res.json()

    const paths = data.map((post) => ( {
        params: { slug: post.Slug },
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const { slug } = params;
    const res = await fetch(`http://localhost:1337/posts?Slug=${slug}`)
    const data = await res.json()
    const post = data[0]

    return {
        props: { post },
    }
}