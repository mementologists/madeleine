import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Promise from 'bluebird';


export default class CaptureImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      file: ''
    };
    this.addFile = this.addFile.bind(this);
    this.setState = Promise.promisify(this.setState).bind(this);
  }

  addFile(e) {
    const { type, name } = e.target.files[0];
    this.setState({
      image: e.target.files[0]
    })
    .then(() => {
      this.props.decorateMoment({
        type: 'image',
        filename: name,
        contentType: type
      });
      const fileReader = new FileReader();// eslint-disable-line
      fileReader.onload = (event) => {
        this.props.hoistFile(event.target.result);
      };
      fileReader.readAsDataURL(this.state.image);
    });
  }

  render() {
    return (
      <div>
        <input
          type="file"
          accept="image/*"
          id="capture"
          capture="camera"
          onChange={this.addFile}
        />
      </div>
    );
  }
}

CaptureImage.propTypes = {
  hoistFile: PropTypes.func,
  decorateMoment: PropTypes.func
};
