import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({ sets, handleDoughnutClick }) => {
  const dataSet = arr => (
    {
      data: arr,
      borderColor: '#303030',
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
    }
  );
  const data = {
    labels: [
      'Joy',
      'Anger',
      'Disgust',
      'Sadness',
      'Fear'
    ],
    datasets: sets.map(set => dataSet(set))
  };
  return (
    <div>
      <Doughnut
        data={data}
        getElementsAtEvent={(elems) => {
          try {
            handleDoughnutClick(elems[0]._model.label); // eslint-disable-line
          } catch (e) {
            handleDoughnutClick(false);
          }
        }}
        options={{ legend: {
          display: false } }}
      />
    </div>
  );
};

DoughnutChart.propTypes = {
  sets: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  handleDoughnutClick: PropTypes.func
};


export default DoughnutChart;
