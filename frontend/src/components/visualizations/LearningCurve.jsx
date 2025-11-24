import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './Visualizations.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LearningCurve = ({ data }) => {
  const chartData = {
    labels: data.sizes.map(s => `${s}%`),
    datasets: [
      {
        label: 'Training Score',
        data: data.train_scores,
        borderColor: '#ef4444',
        backgroundColor: '#ef4444',
        tension: 0.4,
        pointRadius: 4,
      },
      {
        label: 'Cross-validation Score',
        data: data.val_scores,
        borderColor: '#10b981',
        backgroundColor: '#10b981',
        tension: 0.4,
        pointRadius: 4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Learning Curve',
        font: {
          size: 16,
          weight: 'bold'
        },
        color: '#374151'
      }
    },
    scales: {
      y: {
        min: 0,
        max: 1.1,
        ticks: {
          stepSize: 0.2
        },
        grid: {
          color: '#f3f4f6'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="visualization-card">
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LearningCurve;
