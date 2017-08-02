import React from 'react';
import IconButton from 'material-ui/IconButton';
import Cancel from 'material-ui/svg-icons/navigation/cancel';

const CancelButton = () => (
  <a href="/">
    <IconButton>
      <Cancel />
    </IconButton>
  </a>
);

export default CancelButton;
