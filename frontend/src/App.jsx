import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import PatientAnalysis from './pages/patientAnalysis/PatientAnalysis';
import GradientBoosting from './pages/models/GradientBoosting';
import RandomForest from './pages/models/RandomForest';
import SVC from './pages/models/SVC';
import LogisticRegression from './pages/models/LogisticRegression';
import KNearestNeighbors from './pages/models/KNearestNeighbors';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const handleSidebarToggle = (isExpanded) => {
    setIsSidebarExpanded(isExpanded);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Header />
          <Sidebar onToggle={handleSidebarToggle} />
          <main className={`main-content ${!isSidebarExpanded ? 'sidebar-collapsed' : ''}`}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/patient-analysis" element={<PatientAnalysis />} />
              <Route path="/model/gradient-boosting" element={<GradientBoosting />} />
              <Route path="/model/random-forest" element={<RandomForest />} />
              <Route path="/model/svc" element={<SVC />} />
              <Route path="/model/logistic-regression" element={<LogisticRegression />} />
              <Route path="/model/knn" element={<KNearestNeighbors />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;