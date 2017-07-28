import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({ summary }) => {
  const data = {
    labels: [
      'Joy',
      'Anger',
      'Disgust',
      'Sadness',
      'Fear'
    ],
    datasets: [{
      data: summary,
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
  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

DoughnutChart.propTypes = {
  summary: PropTypes.arrayOf(PropTypes.number)
};


export default DoughnutChart;
