import React from 'react';
import PropTypes from 'prop-types';

const Capture = ({ mediaKey, hoistFile, decorateMoment }) => {
  const capture = mediaKey === 'video' ? 'camcorder' : 'camera';
  const addFile = (e) => {
    const { type, name } = e.target.files[0];
    decorateMoment({
      key: mediaKey,
      filename: name,
      contentType: type
    });
    const fileReader = new FileReader();// eslint-disable-line
    fileReader.onload = (event) => {
      hoistFile(event.target.result, mediaKey);
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
  decorateMoment: PropTypes.func
};

export default Capture;
