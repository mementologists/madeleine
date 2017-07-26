// eslint-env browser
import React, { Component } from 'react';
import Axios from 'axios';
import Promise from 'bluebird';
import RaisedButton from 'material-ui/RaisedButton';
import DoughnutChart from './doughnut';
import MomentList from './momentList';
import CaptureText from './captureText';
import Capture from './capture';
import Footer from './footer';


export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textFieldValue: '',
      files: {},
      moments: [],
      moment: {
        displayType: 0,
        keys: [],
        media: {
          audio: '',
          image: '',
          text: '',
          video: ''
        },
        sentiment: 0,
        highlight: 'the best',
        createdAt: new Date()
      }
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.addFile = this.addFile.bind(this);
    this.decorateMoment = this.decorateMoment.bind(this);
    this.postMoment = this.postMoment.bind(this);
    this.resetMedia = this.resetMedia.bind(this);
    this.constructUri = ({ params }) => {
      this.cred = params['x-amz-credential'];
      let x = params['x-amz-credential'];
      x = x.replace(/\//g, '%2F');
      return [`??X-Amz-Algorithm=${params['x-amz-algorithm']}`,
        `&X-Amz-Credential=${x}`,
        `&X-Amz-Date=${params['x-amz-date']}`,
        '&X-Amz-SignedHeaders=host',
        '&X-Amz-Expires=86400',
        `&X-Amz-Signature=${params['x-amz-signature']}`]
        .join('');
    };
  }

  addFile(file, key) {
    const files = this.state.files;
    files[key] = file;
    this.setState({
      files
    });
  }

  decorateMoment({ key, filename, contentType }) {
    const moment = this.state.moment;
    moment.keys.push(key);
    moment.media[key] = {
      filename,
      contentType
    };
    this.setState({
      moment
    });
  }

  handleTextFieldChange(e) {
    this.setState({
      textFieldValue: e.target.value
    });
  }

  handleButtonClick() {
    const message = this.state.textFieldValue;
    if (message) {
      this.decorateMoment({
        key: 'text',
        filename: `${message.slice(1)}.txt`,
        contentType: 'plain/text'
      });
      this.addFile(message, 'text');
    }
    this.postMoment();
  }

  postMoment() {
    Axios.post('/api/moments', {
      moment: this.state.moment
    })
    .then((res) => {
      const {
        keys,
        media
      } = res.data.moment;
      return Promise.map(keys, (key) => {
        let { uri } = media[key];
        uri += this.constructUri(res.data.moment.media[key].s3Head);
        return Axios.put(uri, this.state.files[key]);
      }).then(() => res);
    })
    .then(res => Promise.resolve(this.setState({ moment: res.data.moment })))
    .then(() => Axios.post('/api/bktd', { moment: this.state.moment }))
    .then(() => Axios.get('api/moments', { moment: this.state.moment }))
    .then((res) => {
      this.resetMedia();
      this.setState({ moments: res.data });
    })
    .catch((err) => {
        /* eslint-disable no-console */
      this.resetMedia();
      console.log('got error trying to handshake: ', err);
    });
      /* eslint-enable no-console */
  }

  resetMedia(func) {
    this.media = this.media || [];
    if (func) {
      this.media.push(func);
    } else {
      this.media.forEach(item => item());
      this.setState({
        textFieldValue: '',
        files: {},
        moment: {
          displayType: 0,
          keys: [],
          media: {
            audio: '',
            image: '',
            text: '',
            video: ''
          },
          sentiment: 0,
          highlight: 'the best',
          createdAt: new Date()
        }
      });
      this.media = [];
    }
  }

  render() {
    const style = {
      margin: 15,
    };
    return (
      <div>
        <DoughnutChart />
        <CaptureText
          value={this.state.textFieldValue}
          change={this.handleTextFieldChange}
        />
        <RaisedButton
          onClick={this.handleButtonClick}
          label="Internalize"
          style={style}
        />
        <Capture
          mediaKey="image"
          hoistFile={this.addFile}
          decorateMoment={this.decorateMoment}
          reset={this.resetMedia}
        />
        <Capture
          mediaKey="video"
          hoistFile={this.addFile}
          decorateMoment={this.decorateMoment}
          reset={this.resetMedia}
        />
        <Capture
          mediaKey="audio"
          hoistFile={this.addFile}
          decorateMoment={this.decorateMoment}
          reset={this.resetMedia}
        />
        <MomentList moments={this.state.moments} />
        <Footer />
      </div>
    );
  }
}
