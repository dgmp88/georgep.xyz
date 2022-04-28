import 'tailwindcss/tailwind.css';
import '../css/prism.css';
import '../css/index.css';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-DZGP2WBCWD" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-DZGP2WBCWD');
        `}
      </Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
