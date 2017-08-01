import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'material-ui/Card';
import VideoEntry from './videoEntry';
import ImageEntry from './imageEntry';
import TextEntry from './textEntry';

const MomentListEntry = ({ moment }) => {
  const determineClass = () => {
    if (moment.sentiment === '0') {
      return 'card neutral';
    }
    return `card ${moment.sentiment}`;
  };
  const keys = JSON.parse(moment.keys);
  const determineEntryType = (key, index) => {
    if (key === 'video') {
      return <VideoEntry moment={moment.media.video} key={index} />;
    } else if (key === 'image') {
      return <ImageEntry moment={moment.media.image} key={index} />;
    } else if (key === 'text') {
      return <TextEntry moment={moment.media.text} key={index} />;
    }
    return null;
  };
  return (
    <Card className={determineClass()} zDepth={5} >
      {keys.map(determineEntryType)}
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
