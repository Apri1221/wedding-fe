import NavigationBar from '../components/navigation/default'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <NavigationBar/>
      <Component {...pageProps} />
    </>)
}

export default MyApp
