import { Header } from '../components/header';
import { Background } from '../components/homeBackground';

function Home() {
  return (
    <>
      <Background></Background>
      <Header />
      <div className="max-w-md m-auto my-10">
        <div className="card m-3 glass p-3">
          <figure>
            <img className="rounded-lg" src="/images/me.jpg" alt="George"></img>
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
      </div>
    </>
  );
}

export default Home;
