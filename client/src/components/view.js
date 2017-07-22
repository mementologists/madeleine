// eslint-env browser
import React, { Component } from 'react';
import Axios from 'axios';
import Promise from 'bluebird';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MomentList from './momentList';

const scrubText = text =>
    text.replace(/[^]+name="file"/, '').replace(/------WebKitFormBoundary[^]*/, '');

export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textFieldValue: '',
      moment: '',
      moments: []
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.fetchAllMomentMedia = this.fetchAllMomentMedia.bind(this);
    this.moment = {
      id: 0,
      userId: 1,
      displayType: 0,
      keys: ['text'],
      media: {
        teaser: 'TESTING TESTING',
        audio: '',
        photo: { filename: 'adams.jpg', contentType: 'image/jpeg' },
        text: { filename: 'user0.txt', contentType: 'text/plain' }
      },
      highlight: 'the best',
      sentiment: 0,
      createdAt: new Date()
    };
    this.addFile = (e) => {
      this.photo = e.target.files[0];
      const fileReader = new FileReader();// eslint-disable-line
      fileReader.onload = (event) => {
        this.file = event.target.result;
      };
      fileReader.readAsDataURL(this.photo);
    };
    this.constructPostData = (res) => {
      const posts = [];
      res.data.moment.keys.forEach((kii) => {
        const x = res.data.moment.media[kii];
        const {
          key,
          policy
        } = x.s3Head.params;
        const fd = new FormData();// eslint-disable-line
        this.cred = x.s3Head.params['x-amz-credential'];
        fd.append('key', key);
        fd.append('file', this.text);
        fd.append('policy', policy);
        fd.append('x-amz-algorithm', x.s3Head.params['x-amz-algorithm']);
        fd.append('x-amz-credential', x.s3Head.params['x-amz-credential']);
        fd.append('x-amz-date', x.s3Head.params['x-amz-date']);
        fd.append('x-amz-signature', x.s3Head.params['x-amz-signature']);
        posts.push(fd);
      });
      return posts;
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
            res.data.moment.media.text.s3Cred = this.cred;
            this.setState({
              moment: res.data.moment
            });
            const { uri } = media[key];
            return Axios.put(uri, this.constructPostData(res)[0]);
          // return Axios.get(uri, this.cred);
          });
        })
      .then(() =>
         Axios.post('/api/bktd', { moment: this.state.moment })
      )
      .then(() =>
         Axios.get('api/moments', { moment: this.state.moment })
      )
      .then(z => this.fetchAllMomentMedia(z.data))
      .catch(err =>
         /* eslint-disable no-console */
         console.log('got error trying to handshake: ', err));
        /* eslint-enable no-console */
    };
  }

  fetchAllMomentMedia(moments) {
    return Promise.resolve(moments)
       .then(latestMoments =>
         Promise.map(latestMoments, moment =>
           Axios.get(moment.media.text.uri, moment.media.text.s3Cred)
           .then((data) => {
             const newMoment = JSON.parse(JSON.stringify(moment));
             newMoment.media.text.value = scrubText(data.data);
             return newMoment;
           })
         )
         .then(newMoments =>
           this.setState({ moments: newMoments })
         )
       );
  }

  handleTextFieldChange(e) {
    this.text = e.target.value;
    this.setState({
      textFieldValue: e.target.value
    });
  }

  handleButtonClick() {
    this.testPost();
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
        <input type="file" />
        <RaisedButton onClick={this.handleButtonClick} label="Internalize" style={style} />
        <MomentList moments={this.state.moments} />
      </div>
    );
  }
}
