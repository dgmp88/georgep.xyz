import { Header } from '../components/header';
import { Background } from '../components/background';

function Home() {
  return (
    <>
      <Background></Background>
      <Header />
      <div className="card m-auto w-96 glass my-20">
        <figure>
          <img src="/images/me.jpg" alt="George"></img>
        </figure>
        <div className="card-body text-gray-100">
          <h2 className="card-title">Hi. I'm George</h2>
          <a className="link" href="https://linkedin.com/in/george-prichard">
            LinkedIn
          </a>
          <a className="link" href="https://github.com/dgmp88">
            Github
          </a>
        </div>
      </div>
    </>
  );
}

export default Home;
