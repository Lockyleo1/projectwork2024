import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartComponentInCollaudo = ({ data }) => {
  const chartData = {
    labels: Object.keys(data.in_collaudo_FWA),
    datasets: [
      {
        label: 'In Collaudo FWA',
        data: Object.values(data.in_collaudo_FWA),
        backgroundColor: 'purple',
      },
      {
        label: 'In Collaudo Fibra',
        data: Object.values(data.in_collaudo_Fibra),
        backgroundColor: 'blue',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '200px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartComponentInCollaudo;
