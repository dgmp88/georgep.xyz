import 'tailwindcss/tailwind.css';
import '../css/prism.css';
import '../css/index.css';
import { NavBar } from '../components/navbar';
import { Background } from '../components/homeBackground';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Background></Background>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
