import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'material-ui/Card';
import VideoEntry from './videoEntry';
import ImageEntry from './imageEntry';
import TextEntry from './textEntry';

const MomentListEntry = ({ moment }) => {
  const keys = JSON.parse(moment.keys);
  const determineEntry = (key, index) => {
    if (key === 'video') {
      return <VideoEntry moment={moment.media.video} key={index} />;
    } else if (key === 'image') {
      return <ImageEntry moment={moment} key={index} />;
    } else if (key === 'text') {
      return <TextEntry moment={moment.media.text} key={index} />;
    }
    return null;
  };

  return (
    <Card zDepth={0} className="card" >
      {keys.map(determineEntry)}
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
