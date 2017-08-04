import React from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';


const CaptureText = ({ change }) => (
  <div>
    <TextField
      id="uniqueid"
      hintText=""
      multiLine
      rows={1}
      onChange={change}
    />
  </div>
);

CaptureText.propTypes = {
  change: PropTypes.func
};

export default CaptureText;
