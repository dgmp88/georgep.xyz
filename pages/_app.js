import 'tailwindcss/tailwind.css';
import '../css/prism.css';
import '../css/index.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
