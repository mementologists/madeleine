/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HamburgerMenu from './hamburgerMenu';
import TreeView from './treeView';
import CancelButton from './cancelButton';

export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moments: props.location.state.moments,
      moment: 1,
      summary: props.location.state.summary, // eslint-disable-line
      history: props.location.state.history  // eslint-disable-line
    };
  }

  render() {
    return (
      <div>
        <CancelButton />
        <HamburgerMenu userId={this.props.location.state.userId} />
        <TreeView history={this.state.history} backgroundColor={'black'} />
      </div>
    );
  }
}

View.propTypes = {

  history: PropTypes.arrayOf(PropTypes.shape({
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
