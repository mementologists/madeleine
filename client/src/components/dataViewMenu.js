import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import TreeIcon from 'material-ui/svg-icons/places/spa';
import { white } from 'material-ui/styles/colors';

/* eslint-disable react/prop-types */
const DataMenu = ({
  moments, summary, emoHistory, userId
}) =>
/* eslint-enable react/prop-types */
  (
    <div>
      <Link to={{
        pathname: '/data',
        state: {
          moments,
          summary,
          emoHistory,
          userId }
      }}
      >
        <IconButton>
          <TreeIcon color={white} />
        </IconButton>
      </Link>
    </div>
  );


DataMenu.muiName = 'IconMenu';

export default DataMenu;
