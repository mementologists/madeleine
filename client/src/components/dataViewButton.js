import React from 'react';
import IconButton from 'material-ui/IconButton';
import DataView from 'material-ui/svg-icons/editor/functions';

const DataButton = () => {
  const style = {
    position: 'absolute',
    top: '4%',
    left: '2%'
  };
  return (
    <IconButton style={style}>
      <DataView />
    </IconButton>
  );
};

export default DataButton;
