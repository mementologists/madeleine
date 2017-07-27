// eslint-env browser
import React, { Component } from 'react';
import Axios from 'axios';
import DoughnutChart from './doughnut';
import MomentList from './momentList';
import Footer from './footer';
import LogoutMenu from './logoutMenu';


export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moments: [],
      moment: { userId: 1 }
    };
  }

  componentDidMount() {
    Axios.get('api/moments', { moment: this.state.moment })
    .then((res) => {
      this.setState({ moments: res.data });
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <LogoutMenu />
        <DoughnutChart />
        <MomentList moments={this.state.moments} />
        <Footer />
      </div>
    );
  }
}

