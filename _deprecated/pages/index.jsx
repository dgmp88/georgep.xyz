import { NavBar } from '../components/navbar';
import { Background } from '../components/homeBackground';

function Home() {
  return (
    <>
      <Background></Background>
      <NavBar />
      <div className="hero min-h-screen">
        <div className="hero-content prose text-center max-w-lg glass rounded-lg">
          <div>
            <img
              className="rounded-lg w-lg"
              src="/images/me.jpg"
              alt="George"
            ></img>
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
