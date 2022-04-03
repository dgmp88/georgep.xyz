import { Header } from '../components/header';

function Home() {
  return (
    <>
      <Header />
      <div className="card m-auto w-96 glass my-20">
        <figure>
          <img src="/images/me.jpg" alt="George"></img>
        </figure>
        <div className="card-body">
          <h2 className="card-title">Hi, I'm George</h2>
          <p>
            I'm interested in computer vision, software engineering and running
          </p>
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
