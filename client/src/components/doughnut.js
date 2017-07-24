import React from 'react';
import { Doughnut } from 'react-chartjs-2';

class DoughnutChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [
        'Joy',
        'Anger',
        'Disgust',
        'Sadness',
        'Fear'
      ],
      datasets: [{
        data: [50, 50, 50, 50, 50],
        backgroundColor: [
          '#FFCD56',
          '#FF6384',
          '#4BC0C0',
          '#36A2EB',
          '#9966FF'
        ],
        hoverBackgroundColor: [
          '#ffbf00',
          '#ff4162',
          '#00bb8c',
          '#0080ff',
          '#9500b3'
        ]
      }]
    };
  }

  render() {
    return (
      <div>
        <Doughnut data={this.state} />
      </div>
    );
  }
}

export default DoughnutChart;
