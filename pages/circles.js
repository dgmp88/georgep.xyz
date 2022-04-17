import { Component } from 'react';
import dynamic from 'next/dynamic';

const Pixi = dynamic(() => import('../components/pixi'), {
  ssr: false,
});

class PixiPage extends Component {
  render() {
    return <Pixi />;
  }
}

export default PixiPage;
