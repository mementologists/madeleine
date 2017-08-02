import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from 'material-ui/Menu';
import Popover from 'material-ui/Popover/Popover';
import IconButton from 'material-ui/IconButton';
import DataViewIcon from 'material-ui/svg-icons/editor/functions';
import TreeIcon from 'material-ui/svg-icons/places/spa';
import OffTheWallIcon from 'material-ui/svg-icons/image/details';

/* eslint-disable react/prop-types */
const DataMenu = ({ moments, summary, userId, dataAnchor, toggleData, dataOpen, ...muiProps }) => {
  const handleTouchTap = (e) => {
    e.preventDefault();
    toggleData('open', e.currentTarget);
  };
  return (
    <div>
      <IconButton {...muiProps}>
        <DataViewIcon
          onTouchTap={handleTouchTap}
        />
      </IconButton>
      <Popover
        open={dataOpen}
        anchorEl={dataAnchor}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        onRequestClose={() => toggleData('close')}
      >
        <Menu>
          <MenuItem>
            <Link to={{
              pathname: '/tree',
              state: { moments,
                summary,
                userId }
            }}
            >
              <TreeIcon />
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to={{
              pathname: '/pink',
              state: { moments,
                summary,
                userId }
            }}
            >
              <OffTheWallIcon />
            </Link>
          </MenuItem>
        </Menu>
      </Popover>
    </div>
  );
};

DataMenu.muiName = 'IconMenu';

export default DataMenu;
