import React from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';


const CaptureText = ({ value, change }) => (
  <div>
    <TextField
      id="uniqueid"
      hintText=""
      multiLine
      rows={1}
      rowsMax={4}
      value={value}
      onChange={change}
    />
  </div>
);

CaptureText.propTypes = {
  value: PropTypes.string,
  change: PropTypes.func
};

export default CaptureText;
