import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Cancel from 'material-ui/svg-icons/navigation/cancel';

const CancelButton = () => (
  <Link to={{
    pathname: '/'
  }}
  >
    <IconButton>
      <Cancel />
    </IconButton>
  </Link>
);

export default CancelButton;
