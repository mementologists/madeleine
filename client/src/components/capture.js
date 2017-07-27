import React from 'react';
import PropTypes from 'prop-types';

const Capture = ({ mediaKey, hoistFile, decorateMoment, reset }) => {
  const captureKeys = {
    video: 'camcorder',
    image: 'camera'
  };
  const capture = captureKeys[mediaKey];
  const addFile = (e) => {
    const { type, name } = e.target.files[0];
    decorateMoment({
      key: mediaKey,
      filename: name,
      contentType: type
    });
    e.persist();
    const fileReader = new FileReader();// eslint-disable-line
    fileReader.onload = (event) => {
      hoistFile(event.target.result, mediaKey);
      reset(() => { e.target.value = ''; });
    };
    fileReader.readAsArrayBuffer(e.target.files[0]);
  };
  return (
    <div>
      <input
        type="file"
        accept={mediaKey + '/*'}// eslint-disable-line
        capture={capture}
        onChange={addFile}
      />
    </div>
  );
};

Capture.propTypes = {
  mediaKey: PropTypes.string,
  hoistFile: PropTypes.func,
  decorateMoment: PropTypes.func,
  reset: PropTypes.func
};

export default Capture;
