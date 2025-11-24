import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConfusionMatrix from '../../components/visualizations/ConfusionMatrix';
import LearningCurve from '../../components/visualizations/LearningCurve';
import FeatureImportance from '../../components/visualizations/FeatureImportance';
import './ModelPage.scss';

const SVC = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/model/svc/data');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching model data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading Model Data...</div>;
  if (!data) return <div className="error">Failed to load model data</div>;

  return (
    <div className="model-page">
      <div className="model-header">
        <h1>{data.info.name}</h1>
        <span className="model-type">{data.info.type}</span>
        <p className="model-desc">{data.info.description}</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Accuracy</h3>
          <div className="value">{(data.metrics.accuracy * 100).toFixed(1)}%</div>
        </div>
        <div className="metric-card">
          <h3>Precision</h3>
          <div className="value">{(data.metrics.precision * 100).toFixed(1)}%</div>
        </div>
        <div className="metric-card">
          <h3>Recall</h3>
          <div className="value">{(data.metrics.recall * 100).toFixed(1)}%</div>
        </div>
        <div className="metric-card">
          <h3>F1 Score</h3>
          <div className="value">{(data.metrics.f1 * 100).toFixed(1)}%</div>
        </div>
      </div>

      <div className="chart-section">
        <h2>Model Analysis</h2>
        <div className="charts-grid">
          <ConfusionMatrix matrix={data.confusion_matrix} />
          <LearningCurve data={data.learning_curve} />
          {data.feature_importance && (
            <FeatureImportance data={data.feature_importance} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SVC;
