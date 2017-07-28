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
      moment: { userId: 1 },
      summary: [0, 0, 0, 0, 0]
    };
  }

  componentDidMount() {
    Axios.get('api/moments', { moment: this.state.moment })
    .then(res => this.setState({ moments: res.data }))
    .then(() => Axios.get('/api/process'))
    .then((res) => {
      const summary = res.data.aggregate.summary;
      const { joyCount, angerCount, disgustCount, sadnessCount, fearCount } = summary;
      this.setState({
        summary: [joyCount, angerCount, disgustCount, sadnessCount, fearCount]
      });
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <LogoutMenu />
        <DoughnutChart summary={this.state.summary} />
        <MomentList moments={this.state.moments} />
        <Footer />
      </div>
    );
  }
}

