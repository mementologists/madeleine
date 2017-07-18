import React, { Component } from 'react';
import Axios from 'axios';

export default class View extends Component {
  constructor(props) {
    super(props);
    this.moment = {
      id: 0,
      userId: 2,
      keys: ['audio'],
      media: {
        teaser: 'TESTING TESTING',
        audio: '',
        photo: '',
        text: '',
        s3Params: {}
      },
      sentiment: 0,
      createdAt: new Date()
    };
    this.testPost = () => {
      Axios.post('/api/moments', {
        moment: this.moment
      })
        .then((res) => {
          const {
            keys,
            media
          } = res.moment;
          return Promise.map(keys, (key) => {
            const uri = media[key];
            return Axios.post(`${uri}`, { something: media.key });
          });
        })
        .then(() => (
          Axios.post('/bktd', { moment: this.moment })
        ))
        .catch(() => undefined);
    };
  }
  render() {
    return (
      <div>
        <h1>Hello World from React</h1>
        <button onClick={this.testPost}>Go</button>
      </div>
    );
  }
}
