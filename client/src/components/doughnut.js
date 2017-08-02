import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({ sets, handleDoughnutClick, sentimentColors }) => {
  console.log(sets, 'sets!');
  const { joy, anger, disgust, sadness, fear } = sentimentColors;
  const dataSet = arr => (
    {
      data: arr,
      borderColor: '#303030',
      backgroundColor: [
        joy,
        anger,
        disgust,
        sadness,
        fear,
      ],
      hoverBackgroundColor: [
        '#FFDC00',
        '#FF4136',
        '#2ECC40',
        '#0074D9',
        '#B10DC9',
      ]
    }
  );
  const data = {
    labels: [
      'Joy',
      'Anger',
      'Disgust',
      'Sadness',
      'Fear',
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
  handleDoughnutClick: PropTypes.func,
  sentimentColors: PropTypes.shape({
    joy: PropTypes.string,
    anger: PropTypes.string,
    disgust: PropTypes.string,
    sadness: PropTypes.string,
    fear: PropTypes.string
  })
};


export default DoughnutChart;
