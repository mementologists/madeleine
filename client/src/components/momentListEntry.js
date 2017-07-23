import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';

const MomentListEntry = ({ moment }) => {
  const { media, sentiment, createdAt } = moment;
  const imgURL = `/assets/${sentiment || 'joy'}.png`;
  return (
    <Card>
      <CardMedia>
        <img src={imgURL} alt="" />
      </CardMedia>
      <CardTitle title="Card title" subtitle={createdAt} />
      <CardText>{media.text.value}</CardText>
    </Card>
  );
};

MomentListEntry.propTypes = {
  moment: PropTypes.shape({
    sentiment: PropTypes.string
  })
};


export default MomentListEntry;
