import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import DataView from 'material-ui/svg-icons/editor/functions';

const DataButton = ({ moments }) => { // eslint-disable-line
  const style = {
    position: 'absolute',
    top: '4%',
    left: '2%'
  };
  return (
    <Link to={{
      pathname: '/data',
      state: { moments }
    }}
    >
      <IconButton style={style}>
        <DataView />
      </IconButton>
    </Link>
  );
};

export default DataButton;
