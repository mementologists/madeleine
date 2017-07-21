import React, { Component } from 'react';
import Axios from 'axios';
import Promise from 'bluebird';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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
    this.state = {
      textFieldValue: ''
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  getInitialState() {
    return {
      textFieldValue: ''
    };
  }

  handleTextFieldChange(e) {
    this.setState({
      textFieldValue: e.target.value
    });
  }

  handleButtonClick() {
    console.log(this.state.textFieldValue);
    this.setState({
      textFieldValue: ''
    });
  }

  render() {
    const style = {
      margin: 15,
    };
    return (
      <div>
        <TextField
          id="uniqueid"
          hintText=""
          multiLine
          rows={1}
          rowsMax={4}
          value={this.state.textFieldValue}
          onChange={this.handleTextFieldChange}
        />
        <RaisedButton onClick={this.handleButtonClick} label="Internalize" style={style} />
      </div>
    );
  }
}
