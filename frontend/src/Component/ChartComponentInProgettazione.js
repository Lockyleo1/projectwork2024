import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartComponentInProgettazione = ({ data }) => {
  const chartData = {
    labels: Object.keys(data.in_progettazione_FWA),
    datasets: [
      {
        label: 'In Progettazione FWA',
        data: Object.values(data.in_progettazione_FWA),
        backgroundColor: 'purple',
      },
      {
        label: 'In Progettazione Fibra',
        data: Object.values(data.in_progettazione_Fibra),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
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

export default ChartComponentInProgettazione;