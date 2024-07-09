import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartComponentTerminati = ({ data }) => {
  const chartData = {
    labels: Object.keys(data.terminati_FWA),
    datasets: [
      {
        label: 'Terminati FWA',
        data: Object.values(data.terminati_FWA),
        backgroundColor: 'grey',
      },
      {
        label: 'Terminati Fibra',
        data: Object.values(data.terminati_Fibra),
        backgroundColor: 'rgba(100, 132, 205, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // This helps in making the chart responsive
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
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartComponentTerminati;
