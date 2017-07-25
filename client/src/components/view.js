// eslint-env browser
import React, { Component } from 'react';
import Axios from 'axios';
import Promise from 'bluebird';
import RaisedButton from 'material-ui/RaisedButton';
import DoughnutChart from './doughnut';
import MomentList from './momentList';
import CaptureImage from './captureImage';
import CaptureText from './captureText';

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
        },
        sentiment: 0,
        highlight: 'the best',
        createdAt: new Date()
      }
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.fetchAllMomentMedia = this.fetchAllMomentMedia.bind(this);
    this.addImage = this.addImage.bind(this);
    this.decorateMoment = this.decorateMoment.bind(this);
    this.postMoment = this.postMoment.bind(this);
    this.setState = Promise.promisify(this.setState).bind(this);
    this.constructUri = ({ params }) => {
      this.cred = params['x-amz-credential'];
      return [`X-Amz-Algorithm=${params['x-amz-algorithm']}`,
        `&X-Amz-Credential=${params['x-amz-credential']}`,
        `&X-Amz-Date=${params['x-amz-date']}`,
        '&X-Amz-SignedHeaders=host',
        '&X-Amz-Expires=86400',
        `&X-Amz-Signature=${params['x-amz-signature']}`]
        .join('');
    };
  }

  addImage(file) {
    const files = this.state.files;
    files.image = file;
    this.setState({
      files
    })
    .then(() => {
    });
  }

  decorateMoment({ type, filename, contentType }) {
    const moment = this.state.moment;
    moment.keys.push(type);
    moment.media[type] = {
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
    this.setState({
      textFieldValue: e.target.value
    });
  }

  handleButtonClick() {
    const message = this.state.textFieldValue;
    if (message) {
      this.decorateMoment({
        type: 'text',
        filename: `${message.slice(1)}.txt`,
        contentType: 'plain/text'
      });
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
        res.data.moment.media[key].s3Cred = this.cred;
        this.setState({
          moment: res.data.moment
        });
        let { uri } = media[key];
        uri += this.constructUri(res.data.moment.media[key].s3Head);
        return Axios.put(uri, this.state.files[key]);
      });
    })
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
        <CaptureImage
          hoistFile={this.addImage}
          decorateMoment={this.decorateMoment}
        />
        <MomentList moments={this.state.moments} />
      </div>
    );
  }
}
