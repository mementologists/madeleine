import React from 'react';
import IconButton from 'material-ui/IconButton';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import { white } from 'material-ui/styles/colors';

const CancelButton = () => (
  <a href="/">
    <IconButton>
      <Cancel color={white} />
    </IconButton>
  </a>
);

export default CancelButton;
