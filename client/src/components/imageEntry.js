import React from 'react';
import LazyLoad from 'react-lazy-load';
import { CardMedia } from 'material-ui/Card';
import PropTypes from 'prop-types';

const ImageEntry = ({ moment }) => (
<<<<<<< HEAD
  <LazyLoad offset={300}>
    <CardMedia>
      <img src={moment.uri} alt="" />
    </CardMedia>
  </LazyLoad>
  );
=======
  <CardMedia>
    <img src={moment.media.image.uri} alt="" />
  </CardMedia>
);
>>>>>>> Fix footer and margin between cards

ImageEntry.propTypes = {
  moment: PropTypes.shape({
    uri: PropTypes.string,
  })
};

export default ImageEntry;
