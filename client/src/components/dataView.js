/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import HamburgerMenu from './hamburgerMenu';
import TreeView from './treeView';
import CancelButton from './cancelButton';

export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moments: props.location.state.moments,
      moment: 1,
      summary: props.location.state.summary
    };
  }

  render() {
    return (
      <div>
        <CancelButton />
        <HamburgerMenu userId={this.props.location.state.userId} />
        <TreeView backgroundColor={'white'} />
      </div>
    );
  }
}
