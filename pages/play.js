import { Component, createRef } from 'react';

class Play extends Component {
  width = 600;
  constructor(props) {
    super(props);
    this.state = { url: '' };
    this.iframeContainer = createRef();
  }

  componentDidMount() {
    // Size container div properly
    let wH = screen.width / screen.height;
    this.iframeContainer.current.style.width = `${this.width}px`;
    let h = this.width / wH;
    h = Math.round(h);

    this.iframeContainer.current.style.height = `${h}px`;

    // Set url
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    this.state.url = `/${params.game}/index.html`;
  }

  setupOnClick() {
    var iframe = document.getElementById('gameIframe');

    function openFullscreen() {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        iframe.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        iframe.msRequestFullscreen();
      }
    }

    var iframeDoc = iframe.contentWindow.document;
    iframeDoc.onclick = openFullscreen;
    iframeDoc.ontouchstart = openFullscreen;
    document.onfullscreenerror = (error) => {
      console.log(error);
    };
  }

  render() {
    return (
      <>
        <div ref={this.iframeContainer} className="m-auto">
          <iframe
            id="gameIframe"
            width="100%"
            height="100%"
            src={this.state.url}
            onLoad={this.setupOnClick}
          ></iframe>
        </div>
      </>
    );
  }
}

export default Play;