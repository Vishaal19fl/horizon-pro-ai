import React, { useState } from 'react';
import { IconSearch, IconDownload, IconFilter } from '@tabler/icons-react';
import './PatientAnalysis.scss';

const PatientAnalysis = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');

  // Sample patient data
  const patientsData = [
    {
      id: 'P001',
      name: 'John Smith',
      glucose: 185,
      bloodPressure: '140/90',
      bmi: 28.5,
      age: 45,
      predictedOutcome: 'High Risk',
      riskScore: 0.78
    },
    {
      id: 'P002',
      name: 'Sarah Johnson',
      glucose: 95,
      bloodPressure: '120/80',
      bmi: 23.2,
      age: 32,
      predictedOutcome: 'Low Risk',
      riskScore: 0.15
    },
    {
      id: 'P003',
      name: 'Michael Brown',
      glucose: 145,
      bloodPressure: '135/85',
      bmi: 26.8,
      age: 38,
      predictedOutcome: 'Medium Risk',
      riskScore: 0.52
    },
    {
      id: 'P004',
      name: 'Emily Davis',
      glucose: 210,
      bloodPressure: '150/95',
      bmi: 31.2,
      age: 52,
      predictedOutcome: 'High Risk',
      riskScore: 0.85
    },
    {
      id: 'P005',
      name: 'David Wilson',
      glucose: 88,
      bloodPressure: '118/75',
      bmi: 22.1,
      age: 28,
      predictedOutcome: 'Low Risk',
      riskScore: 0.12
    },
    {
      id: 'P006',
      name: 'Lisa Martinez',
      glucose: 165,
      bloodPressure: '132/88',
      bmi: 27.9,
      age: 41,
      predictedOutcome: 'Medium Risk',
      riskScore: 0.48
    },
    {
      id: 'P007',
      name: 'Robert Taylor',
      glucose: 192,
      bloodPressure: '145/92',
      bmi: 29.7,
      age: 47,
      predictedOutcome: 'High Risk',
      riskScore: 0.82
    },
    {
      id: 'P008',
      name: 'Jennifer Garcia',
      glucose: 102,
      bloodPressure: '125/82',
      bmi: 24.5,
      age: 35,
      predictedOutcome: 'Low Risk',
      riskScore: 0.18
    }
  ];

  // Filter patients based on search term and risk filter
  const filteredPatients = patientsData.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRiskFilter = filterRisk === 'all' || 
                             patient.predictedOutcome.toLowerCase().includes(filterRisk.toLowerCase());
    
    return matchesSearch && matchesRiskFilter;
  });

  const getRiskBadgeClass = (risk) => {
    switch(risk.toLowerCase()) {
      case 'high risk': return 'risk-high';
      case 'medium risk': return 'risk-medium';
      case 'low risk': return 'risk-low';
      default: return 'risk-medium';
    }
  };

  const getRiskScoreColor = (score) => {
    if (score >= 0.7) return '#ef4444';
    if (score >= 0.4) return '#f59e0b';
    return '#10b981';
  };

  return (
    <div className="patient-analysis">
      <div className="analysis-header">
        <div className="header-content">
          <div>
            <h1 className="page-title">Patient Risk Analysis</h1>
            <p className="page-subtitle">Comprehensive patient diagnostic information and risk assessment</p>
          </div>
          <button className="export-btn">
            <IconDownload size={16} />
            Export Data
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-container">
          <IconSearch size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search by patient name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <IconFilter size={20} className="filter-icon" />
          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="summary-stats">
        <div className="stat-card">
          <div className="stat-number">{filteredPatients.length}</div>
          <div className="stat-label">Total Patients</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {filteredPatients.filter(p => p.predictedOutcome === 'High Risk').length}
          </div>
          <div className="stat-label">High Risk</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {filteredPatients.filter(p => p.predictedOutcome === 'Medium Risk').length}
          </div>
          <div className="stat-label">Medium Risk</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {filteredPatients.filter(p => p.predictedOutcome === 'Low Risk').length}
          </div>
          <div className="stat-label">Low Risk</div>
        </div>
      </div>

      {/* Patient Table */}
      <div className="table-container">
        <table className="patient-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Glucose Level (mg/dL)</th>
              <th>Blood Pressure</th>
              <th>BMI</th>
              <th>Risk Score</th>
              <th>Predicted Outcome</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="table-row">
                <td className="patient-id">{patient.id}</td>
                <td className="patient-name">{patient.name}</td>
                <td>{patient.age}</td>
                <td className="glucose-level">
                  <span className={patient.glucose > 140 ? 'high-glucose' : 'normal-glucose'}>
                    {patient.glucose}
                  </span>
                </td>
                <td>{patient.bloodPressure}</td>
                <td>{patient.bmi}</td>
                <td>
                  <div className="risk-score-container">
                    <div 
                      className="risk-score-bar"
                      style={{ 
                        width: `${patient.riskScore * 100}%`,
                        backgroundColor: getRiskScoreColor(patient.riskScore)
                      }}
                    ></div>
                    <span className="risk-score-text">{(patient.riskScore * 100).toFixed(0)}%</span>
                  </div>
                </td>
                <td>
                  <span className={`risk-badge ${getRiskBadgeClass(patient.predictedOutcome)}`}>
                    {patient.predictedOutcome}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPatients.length === 0 && (
          <div className="empty-state">
            <p>No patients found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientAnalysis;
