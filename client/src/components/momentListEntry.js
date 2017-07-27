import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'material-ui/Card';
import VideoEntry from './videoEntry';
import ImageEntry from './imageEntry';
import TextEntry from './textEntry';

const MomentListEntry = ({ moment }) => {
  const keys = JSON.parse(moment.keys);
  const hashFunc = (key, index) => {
    switch (key) {
      case 'video':
        return <VideoEntry moment={moment.media.video} key={index} />;
      case 'image':
        return <ImageEntry moment={moment.media.image} key={index} />;
      case 'text':
        return <TextEntry moment={moment.media.text} key={index} />;
      default:
        return null;
    }
  };
  return (
    <Card className="card" >
      {keys.map(hashFunc)}
    </Card>
  );
};

MomentListEntry.propTypes = {
  moment: PropTypes.shape({
    id: PropTypes.number,
    sentiment: PropTypes.string
  })
};

export default MomentListEntry;
