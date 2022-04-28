import { NavBar } from '../components/navbar';
import { Background } from '../components/homeBackground';
import Image from 'next/image';

import mePic from '../public/images/me.jpg';

function Home() {
  return (
    <>
      <Background></Background>
      <NavBar />
      <div className="hero min-h-screen">
        <div className="hero-content prose text-center max-w-lg glass rounded-lg">
          <div>
            <Image src={mePic} className="rounded-lg" />
          </div>
          <div className="">
            <h2 className="text-gray-100">Hi. I'm George</h2>
            <p>
              <a
                className="link text-gray-100"
                href="https://linkedin.com/in/george-prichard"
              >
                LinkedIn
              </a>
            </p>
            <p>
              <a
                className="link text-gray-100"
                href="https://github.com/dgmp88"
              >
                Github
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
