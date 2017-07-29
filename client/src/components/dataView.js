// eslint-env browser
import React, { Component } from 'react';
import MomentList from './momentList';
import Footer from './footer';
import LogoutMenu from './logoutMenu';

export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moments: [],
      moment: { userId: 1 },
      summary: [0, 0, 0, 0, 0]
    };
  }

  render() {
    return (
      <div>
        <LogoutMenu />
        <MomentList moments={''} />
        <Footer />
      </div>
    );
  }
}
