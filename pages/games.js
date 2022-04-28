import { Play } from '../components/play';

import { Background } from '../components/homeBackground';
import { NavBar } from '../components/navbar';

export default function () {
  return (
    <>
      <Background />
      <NavBar />
      <div className="w-2/3 m-auto py-20">
        <div className="prose text-center lg:prose-lg mx-auto px-4 py-8 bg-base-100/75 rounded-lg ">
          <p>
            These were originally made as apps using{' '}
            <a href="https://libgdx.com/">LibGDX</a> several years back. They're
            now relatively easy to compile for the browser, so it's fun to have
            them here. They may be a touch buggy, but the core features seem to
            work.
          </p>
          <h1>Dinowar</h1>
          <p>
            Dinosaur strategy game made with{' '}
            <a href="https://www.dglencross.com/">David</a> and graphics by{' '}
            <a href="https://emile.work">Emile</a>.
          </p>
          <Play game="dinowar"></Play>
          <h1 className="pt-16">Lunee</h1>
          <p>Physics based space game. Graphics by me, sorry about that.</p>
          <Play game="lunee"></Play>
        </div>
      </div>
    </>
  );
}
