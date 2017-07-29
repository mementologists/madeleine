// eslint-env browser
import React, { Component } from 'react';
import MomentList from './momentList'; // eslint-disable-line
import Footer from './footer';
import LogoutMenu from './logoutMenu';
import TreeView from './treeView';

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
        <LogoutMenu />
        <TreeView backgroundColor={'black'} />
        <Footer />
      </div>
    );
  }
}
