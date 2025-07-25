import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
} from 'chart.js';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { IconUsers, IconAlertTriangle, IconTarget, IconCpu, IconTrendingUp, IconDownload } from '@tabler/icons-react';
import './Dashboard.scss';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title
);

const Dashboard = () => {
  const MetricCard = ({ icon: Icon, title, value, subtitle, change, color, changeType }) => (
    <div className="metric-card">
      <div className="metric-header">
        <div className="metric-icon" style={{ backgroundColor: color }}>
          <Icon size={20} />
        </div>
        <div className="metric-info">
          <h3 className="metric-value">{value}</h3>
          <p className="metric-title">{title}</p>
          {change && (
            <span className={`metric-change ${changeType}`}>
              {changeType === 'positive' ? '+' : ''}{change} from yesterday
            </span>
          )}
        </div>
      </div>
    </div>
  );

  // Chart data for patient insights
  const patientInsightsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Low Risk Patients',
        data: [250, 280, 320, 300, 350, 380, 420, 390, 410, 450, 480, 500],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'High Risk Patients',
        data: [180, 200, 190, 220, 240, 260, 280, 290, 300, 320, 340, 360],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Medium Risk Patients',
        data: [120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      }
    ],
  };

  const riskDistributionData = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk'],
    datasets: [
      {
        data: [1847, 579, 421],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  };

  const revenueData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Online Consultations',
        data: [150, 180, 120, 200, 160, 140, 190],
        backgroundColor: '#3b82f6',
        borderRadius: 4,
        barThickness: 20,
      },
      {
        label: 'Offline Consultations',
        data: [120, 150, 100, 170, 130, 110, 160],
        backgroundColor: '#10b981',
        borderRadius: 4,
        barThickness: 20,
      },
    ],
  };

  const satisfactionData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Last Month',
        data: [3.2, 3.5, 3.8, 3.6, 3.9, 4.1],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'This Month',
        data: [3.8, 4.0, 4.2, 4.5, 4.3, 4.6],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#6b7280',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        border: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    },
  };

  return (
    <div className="dashboard-modern">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <h1 className="dashboard-title">Welcome to Predictive Analytics Dashboard</h1>
            <p className="dashboard-subtitle">Patient Risk Analytics & Insights</p>
          </div>
          <button className="export-btn">
            <IconDownload size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="metrics-row">
        <MetricCard
          icon={IconUsers}
          title="Total Patients"
          value="2,847"
          change="8%"
          changeType="positive"
          color="#ef4444"
        />
        <MetricCard
          icon={IconAlertTriangle}
          title="Patients at Risk"
          value="421"
          change="6%"
          changeType="positive"
          color="#f59e0b"
        />
        <MetricCard
          icon={IconTarget}
          title="Model Accuracy"
          value="89.3%"
          change="2%"
          changeType="positive"
          color="#10b981"
        />
        <MetricCard
          icon={IconCpu}
          title="Last Update"
          value="2 hrs ago"
          change="0.6%"
          changeType="positive"
          color="#8b5cf6"
        />
      </div>

      {/* Main Charts Grid */}
      <div className="charts-main-grid">
        {/* Patient Insights - Large Chart */}
        <div className="chart-card chart-large">
          <div className="chart-header">
            <h3>Patient Risk Insights</h3>
            <div className="chart-legend-custom">
              <span className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: '#8b5cf6' }}></span>
                Low Risk Patients
              </span>
              <span className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: '#ef4444' }}></span>
                High Risk Patients
              </span>
              <span className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: '#10b981' }}></span>
                Medium Risk Patients
              </span>
            </div>
          </div>
          <div className="chart-container-large">
            <Line data={patientInsightsData} options={chartOptions} />
          </div>
        </div>

        {/* Risk Distribution Doughnut */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Risk Distribution</h3>
          </div>
          <div className="chart-container">
            <Doughnut data={riskDistributionData} options={doughnutOptions} />
          </div>
        </div>

        {/* Weekly Consultations */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Weekly Consultations</h3>
          </div>
          <div className="chart-container">
            <Bar data={revenueData} options={chartOptions} />
          </div>
          <div className="chart-legend-bottom">
            <span className="legend-item">
              <span className="legend-dot" style={{ backgroundColor: '#3b82f6' }}></span>
              Online
            </span>
            <span className="legend-item">
              <span className="legend-dot" style={{ backgroundColor: '#10b981' }}></span>
              Offline
            </span>
          </div>
        </div>

        {/* Patient Satisfaction */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Patient Satisfaction</h3>
            <div className="satisfaction-values">
              <div className="satisfaction-item">
                <span className="sat-label">Last Month</span>
                <span className="sat-value">3.6</span>
              </div>
              <div className="satisfaction-item">
                <span className="sat-label">This Month</span>
                <span className="sat-value">4.5</span>
              </div>
            </div>
          </div>
          <div className="chart-container">
            <Line data={satisfactionData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
