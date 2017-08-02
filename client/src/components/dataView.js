/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TreeView from './treeView';
import CancelButton from './cancelButton';

export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moments: props.location.state.moments,
      moment: 1,
      summary: props.location.state.summary, // eslint-disable-line
      emoHistory: props.location.state.emoHistory  // eslint-disable-line
    };
  }

  render() {
    return (
      <div>
        <CancelButton />
        <TreeView emoHistory={this.state.emoHistory} backgroundColor={'black'} />
      </div>
    );
  }
}

View.propTypes = {

  emoHistory: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    _id: PropTypes.string,
    summary: PropTypes.shape({
      sadness: PropTypes.number,
      joy: PropTypes.number,
      fear: PropTypes.number,
      disgust: PropTypes.number,
      anger: PropTypes.number
    })
  }))
};
