// eslint-env browser
import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import DoughnutChart from './doughnut';
import MomentList from './momentList';
import Footer from './footer';
import LogoutMenu from './logoutMenu';
import DataButton from './dataViewButton';

export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moments: [],
      filteredMoments: null,
      moment: { userId: 1 },
      summary: [0, 0, 0, 0, 0]
    };
    this.handleDoughnutClick = this.handleDoughnutClick.bind(this);
  }

  componentDidMount() {
    Axios.get('api/moments', { moment: this.state.moment })
    .then((res) => {
      this.setState({ moments: res.data.reverse() });
    })
    .then(() => Axios.get('/api/process'))
    .then((res) => {
      const summary = res.data.aggregate.summary;
      let { joyCount, angerCount, disgustCount, sadnessCount, fearCount } = summary;
      if (!this.state.moments.length) {
        joyCount = angerCount = disgustCount = sadnessCount = fearCount = 1; // eslint-disable-line
      }
      this.setState({
        summary: [
          joyCount,
          angerCount,
          disgustCount,
          sadnessCount,
          fearCount
        ]
      });
    })
    .catch(err => console.log(err));
  }

  handleDoughnutClick(emotion) {
    if (emotion) {
      const filtered = this.state.moments.filter(moment =>
        moment.sentiment === emotion.toLowerCase());
      this.setState({
        filteredMoments: filtered
      });
    } else {
      this.setState({
        filteredMoments: null
      });
    }
  }

  render() {
    return (
      <div>
        <Link to={{
          pathname: '/data',
          state: { moments: this.state.moments,
            summary: this.state.summary }
        }}
        >
          <DataButton
            moments={this.state.moments}
            summary={this.state.summary}
          />
        </Link>
        <LogoutMenu />
        <DoughnutChart
          sets={this.state.summarySets || [this.state.summary]}
          handleDoughnutClick={this.handleDoughnutClick}
        />
        { this.state.filteredMoments ?
          <MomentList moments={this.state.filteredMoments} /> :
          <MomentList moments={this.state.moments} /> }
        <Footer />
      </div>
    );
  }
}

