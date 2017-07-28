import React, { Component } from 'react';
import Axios from 'axios';
import Promise from 'bluebird';
import RaisedButton from 'material-ui/RaisedButton';
import { Redirect } from 'react-router-dom';
import Capture from './capture';
import CaptureText from './captureText';
import MediaPreview from './mediaPreview';
import FooterTwo from './previewFooter';

export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.whom = this.whom || [props.location.state.from];// eslint-disable-line
    this.addFile = this.addFile.bind(this);
    this.decorateMoment = this.decorateMoment.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.resetMedia = this.resetMedia.bind(this);
    this.previewFile = this.previewFile.bind(this);
    this.addSecondMedia = this.addSecondMedia.bind(this);
    this.goHome = this.goHome.bind(this);
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
    this.captureKeys = {
      video: 'camcorder',
      image: 'camera',
      audio: 'microphone'
    };
    this.state = {
      textFieldValue: '',
      files: {},
      previewFiles: {},
      moment: {
        displayType: 0,
        keys: [],
        media: {
          image: '',
          text: '',
          video: ''
        },
        sentiment: 0,
        highlight: 'the best',
        createdAt: new Date()
      },
      childProps: {
        mediaKey: this.whom[0],
        hoistFile: this.addFile,
        decorateMoment: this.decorateMoment
      }
    };
    this.index = {
      video: 0,
      image: 1,
      text: 2
    };
  }
/* eslint-disable */
  base64ArrayBuffer(raw, type) {
    let base64 = '';
    const encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    const bytes = new Uint8Array(new Buffer(raw));
    const byteLength = bytes.byteLength;
    const byteRemainder = byteLength % 3;
    const mainLength = byteLength - byteRemainder;

    let a, b, c, d;
    let chunk;

    // Main loop deals with bytes in chunks of 3
    for (let i = 0; i < mainLength; i += 3) {
    // Combine the three bytes into a single integer
      chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

    // Use bitmasks to extract 6-bit segments from the triplet
      a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
      b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
      c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
      d = chunk & 63; // 63       = 2^6 - 1
    // Convert the raw binary segments to the appropriate ASCII encoding
      base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
    }

    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
      chunk = bytes[mainLength];

      a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2
    // Set the 4 least significant bits to zero
      b = (chunk & 3) << 4; // 3   = 2^2 - 1
      base64 += `${encodings[a] + encodings[b]  }==`;
    } else if (byteRemainder == 2) {
      chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

      a = (chunk & 16128) >> 8; // 16128 = (2^6 - 1) << 8
      b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4
    // Set the 2 least significant bits to zero
      c = (chunk & 15) << 2; // 15    = 2^4 - 1
      base64 += `${encodings[a] + encodings[b] + encodings[c]  }=`;
    }

    return `data:${type};base64,${base64}`;
  }
/* eslint-enable */
  addFile(file, key, type) {
    const files = this.state.files;
    const previewFiles = this.state.previewFiles;
    previewFiles[key] = this.base64ArrayBuffer(file, type);
    files[key] = file;
    this.setState({
      files,
      previewFiles
    });
  }

  previewFile(file, key) {
    const files = this.state.previewFiles;
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
    }, () => console.log(this.state.moment));
  }

  addSecondMedia(type) {
    const x = this.state.childProps;
    x.mediaKey = type;
    this.whom.push(type);
    this.setState({
      childProps: x
    });
  }

  handleTextFieldChange(e) {
    this.textFieldValue = e.target.value;
  }

  handleButtonClick() {
    const message = this.textFieldValue;
    this.expired = true;
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

  goHome() {
    this.render = () => (
      <Redirect to={{
        pathname: '/',
      }}
      />
    );
    this.setState({
      selectedIndex: 'go go'
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
        let { uri } = media[key];
        uri += this.constructUri(res.data.moment.media[key].s3Head);
        return Axios.put(uri, this.state.files[key]);
      }).then(() => res);
    })
    .then(res => Axios.post('/api/bktd', { moment: res.data.moment }))
    .then(() => this.goHome())
    .catch((err) => {
        /* eslint-disable no-console */
      console.log('got error trying to handshake: ', err);
    });
      /* eslint-enable no-console */
  }
/* eslint-disable */
  render() {
    return (
      <div>
        <CaptureText
          change={this.handleTextFieldChange}
        />
        <RaisedButton
          onClick={this.handleButtonClick}
          label="Internalize"
          style={{ margin: 15 }}
        />
        {this.expired ? <p>Processing...</p> : <Capture {...this.state.childProps} />}
        {Object.keys(this.state.previewFiles)
        .map((file, index) => <MediaPreview key={index} tag={this.whom[index]} source={this.state.previewFiles[file]} />)}
        <FooterTwo index={this.index[this.whom[0]]} addFile={this.addSecondMedia} />
      </div>
    );
  }
}
/* eslint-enable */

