import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartComponentInEsecuzione = ({ data }) => {
  const chartData = {
    labels: Object.keys(data.in_esecuzione_FWA),
    datasets: [
      {
        label: 'In Esecuzione FWA',
        data: Object.values(data.in_esecuzione_FWA),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'In Esecuzione Fibra',
        data: Object.values(data.in_esecuzione_Fibra),
        backgroundColor: 'rgba(80, 16, 135, 0.6)',
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

export default ChartComponentInEsecuzione;
