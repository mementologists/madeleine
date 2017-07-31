// eslint-env browser
import React, { Component } from 'react';
import LogoutMenu from './logoutMenu';
import TreeView from './treeView';
import CancelButton from './cancelButton';

export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moments: props.location.state.moments, // eslint-disable-line
      moment: 1,
      summary: props.location.state.summary // eslint-disable-line
    };
  }

  render() {
    return (
      <div>
        <CancelButton />
        <LogoutMenu />
        <TreeView backgroundColor={'white'} />
      </div>
    );
  }
}
