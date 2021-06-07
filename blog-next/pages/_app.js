import '../styles/globals.css'
import '../styles/[slug].css'
import '../styles/navbar.css'


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
