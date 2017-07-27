import React from 'react';
import PropTypes from 'prop-types';
import { CardMedia } from 'material-ui/Card';

/*
eslint-disable
*/

const VideoEntry = ({ moment }) => (
  <CardMedia>
    <video width="400" height="423" controls>
      <source src={moment.uri} type="video/mp4" />
    </video>
  </CardMedia>
  );

VideoEntry.propTypes = {
  moment: PropTypes.shape({
    uri: PropTypes.string,
  })
};

export default VideoEntry;


