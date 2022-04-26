import { Component } from 'react';
import { Lines } from '../../lib/lines';

import _ from 'lodash';

export class LinesApp extends Component {
  constructor(props) {
    super(props);

    this.state = { mounted: false };
    this.download = this.download.bind(this);
    this.refresh = this.refresh.bind(this);
    this.changeN = this.changeN.bind(this);
  }
  componentDidMount() {
    console.log('lines mounted');
    let lines = new Lines();

    this.state.lines = lines;
    this.state.mounted = true;
  }

  componentWillUnmount() {
    let d = this.state.lines.draw;
    d.clear();
    d.remove();
    console.log('lines unmounted');
  }

  download() {
    this.state.lines.download();
  }

  refresh() {
    this.state.lines.refresh();
  }

  changeN(event) {
    console.log('changing');
    let n = parseInt(event.target.value);
    this.state.lines.setN(n);
    this.state.lines.refreshAfterPause();
  }

  render() {
    return (
      <>
        <div>
          <div className="font-medium">Number of lines</div>
          <input
            type="range"
            min="1"
            max="50"
            defaultValue={3}
            className="range"
            onChange={this.changeN}
          ></input>
        </div>

        <button className="btn btn-secondary" onClick={this.refresh}>
          Refresh
        </button>
        <button className="btn btn-primary" onClick={this.download}>
          Download SVG
        </button>
      </>
    );
  }
}
