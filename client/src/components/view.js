import React, { Component } from 'react';
import Axios from 'axios';
import Promise from 'bluebird';

export default class View extends Component {
  constructor(props) {
    super(props);
    this.moment = {
      id: 0,
      userId: 2,
      keys: ['text'],
      media: {
        teaser: 'TESTING TESTING',
        audio: '',
        photo: '',
        text: 'http://textfiles.com/sf/adams.txt',
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
        } = res.data.moment;
        return Promise.map(keys, (key) => {
          const uri = media[key];
          // return Axios.post(`${uri}`, { something: media.key });
          return Promise.resolve(uri);
        });
      })
      .then(() => {
        Axios.post('/api/bktd', { moment: this.moment });
      })
      .catch(err =>
         /* eslint-disable no-console */
         console.log('got error trying to handshake: ', err));
        /* eslint-enable no-console */
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
