import { Component } from 'react';

function openFullscreen() {
  var elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

function navToGame() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  window.location.href = `/${params.game}/index.html`;
}

function startGame() {
  openFullscreen();
  navToGame();
}

class Play extends Component {
  render() {
    return (
      <div className="prose lg:prose-lg mx-auto px-4 py-8">
        <a onClick={startGame}>Play</a> (opens in full screen)
      </div>
    );
  }
}

export default Play;
