import React from 'react';
import PropTypes from 'prop-types';

const Capture = ({ mediaKey, hoistFile, decorateMoment }) => {
  const captureKeys = {
    video: 'camcorder',
    image: 'camera'
  };
  const style = {
    width: 0.1,
    height: 0.1,
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1
  };
  const capture = captureKeys[mediaKey];
  const addFile = (e) => {
    const { type, name } = e.target.files[0];
    decorateMoment({
      key: mediaKey,
      filename: name,
      contentType: type
    });
    const fileReader = new FileReader();// eslint-disable-line
    fileReader.onload = (event) => {
      hoistFile(event.target.result, mediaKey, type);
    };
    fileReader.readAsArrayBuffer(e.target.files[0]);
  };
  const simulateClick = (e) => {
    if (!simulateClick.clicked) {
      simulateClick.clicked = true;
      e.click();
    }
  };
  return (
    <div>
      <input
        type="file"
        accept={mediaKey + '/*'}// eslint-disable-line
        capture={capture}
        onChange={addFile}
        style={style}
        ref={(e => simulateClick(e))}
      />
    </div>
  );
};

Capture.propTypes = {
  mediaKey: PropTypes.string,
  hoistFile: PropTypes.func,
  decorateMoment: PropTypes.func
};

export default Capture;
