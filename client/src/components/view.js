// eslint-env browser
import React, { Component } from 'react';
import Axios from 'axios';
import DoughnutChart from './doughnut';
import MomentList from './momentList';
import Footer from './footer';
import NavBar from './appbar';


export default class View extends Component {
  constructor(props) {
    super(props);
    this.handleDoughnutClick = this.handleDoughnutClick.bind(this);
    this.toggleData = this.toggleData.bind(this);
    this.state = {
      userId: 0,
      moments: [],
      filteredMoments: null,
      summary: [0, 0, 0, 0, 0],
      emoHistory: [],
      dataOpen: false,
      toggleData: this.toggleData,
      sentimentColors: {
        joy: '#FECB7A',
        anger: '#FD595C',
        disgust: '#8BBE71',
        sadness: '#64BCF3',
        fear: '#C45FFC'
      }
    };
  }

  componentDidMount() {
    Axios.get('api/moments', { moment: this.state.moment })
    .then(res => this.setState({ moments: res.data.moments.reverse(), userId: res.data.userId }))
    .then(() => Axios.get('/api/process'))
    .then((res) => {
      const { joyCount, angerCount, disgustCount, sadnessCount, fearCount }
        = res.data.aggregate.summary;
      const summary = this.state.moments.length ?
        [joyCount, angerCount, disgustCount, sadnessCount, fearCount] :
        [1, 1, 1, 1, 1];
      const emoHistory = res.data.aggregate.history;
      this.setState({
        summary,
        emoHistory
      });
    })
    .catch(err => console.log(err)); // eslint-disable-line no-console
  }

  toggleData(value, dataAnchor) {
    const bool = value === 'open';
    if (dataAnchor) {
      this.setState({ dataOpen: bool, dataAnchor });
    } else {
      this.setState({ dataOpen: bool });
    }
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
        <NavBar {...this.state} />
        <DoughnutChart
          sets={this.state.summarySets || [this.state.summary]}
          handleDoughnutClick={this.handleDoughnutClick}
          sentimentColors={this.state.sentimentColors}
        />
        { this.state.filteredMoments ?
          <MomentList moments={this.state.filteredMoments} /> :
          <MomentList moments={this.state.moments} /> }
        <Footer />
      </div>
    );
  }
}

