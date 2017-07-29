import React from 'react';
import PropTypes from 'prop-types';
import MomentListEntry from './momentListEntry';

const MomentList = ({ moments }) => (
  <div>
    {moments.map(moment => <MomentListEntry moment={moment} key={moment.id} />)}
  </div>
  );

MomentList.propTypes = {
  moments: PropTypes.arrayOf(PropTypes.object)
};

export default MomentList;
