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

const scrubText = text =>
    text.replace(/[^]+name="file"/, '').replace(/------WebKitFormBoundary[^]*/, '');

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
          teaser: 'TESTING TESTING',
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
    this.fetchAllMomentMedia = this.fetchAllMomentMedia.bind(this);
    this.addFile = this.addFile.bind(this);
    this.decorateMoment = this.decorateMoment.bind(this);
    this.postMoment = this.postMoment.bind(this);
    this.setState = Promise.promisify(this.setState).bind(this);
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

  fetchAllMomentMedia(moments) {
    return Promise.resolve(moments)
    .then(latestMoments =>
      Promise.map(latestMoments, moment =>
        Axios.get(moment.media.text.uri, moment.media.text.s3Cred)
        .then((data) => {
          const newMoment = Object.assign({}, moment);
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
    this.setState({
      textFieldValue: ''
    });
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
        const filetype = `${this.state.moment.media[key].filename}`;
        let { uri } = media[key];
        uri += filetype.substr(filetype.lastIndexOf('.'));
        uri += this.constructUri(res.data.moment.media[key].s3Head);
        return Axios.put(uri, this.state.files[key]);
      }).then(() => res);
    })
    .then(res => this.setState({ moment: res.data.moment }))
    .then(() => Axios.post('/api/bktd', { moment: this.state.moment }))
    .then(() => Axios.get('api/moments', { moment: this.state.moment }))
    .then(z => this.fetchAllMomentMedia(z.data))
    .catch(err =>
        /* eslint-disable no-console */
        console.log('got error trying to handshake: ', err));
      /* eslint-enable no-console */
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
        />
        <Capture
          mediaKey="video"
          hoistFile={this.addFile}
          decorateMoment={this.decorateMoment}
        />
        <MomentList moments={this.state.moments} />
        <Footer />
      </div>
    );
  }
}
