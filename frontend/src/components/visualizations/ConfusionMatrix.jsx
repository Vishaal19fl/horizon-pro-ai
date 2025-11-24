import React from 'react';
import './Visualizations.scss';

const ConfusionMatrix = ({ matrix }) => {
  // Calculate max value for color scaling
  const flatMatrix = matrix.flat();
  const maxValue = Math.max(...flatMatrix);
  
  const size = matrix.length;
  let labels = [];
  if (size === 2) {
    labels = ['No Diabetes', 'Diabetes'];
  } else if (size === 3) {
    labels = ['Low', 'Medium', 'High'];
  } else {
    labels = Array.from({ length: size }, (_, i) => `Class ${i}`);
  }

  const getBackgroundColor = (value) => {
    // Simple blue opacity scale
    const opacity = Math.max(0.1, value / maxValue);
    return `rgba(59, 130, 246, ${opacity})`;
  };

  const getTextColor = (value) => {
    return value > maxValue / 2 ? 'white' : '#1f2937';
  };

  return (
    <div className="visualization-card">
      <h3 className="viz-title">Confusion Matrix</h3>
      <div className="confusion-matrix-container">
        <div className="matrix-labels-y">
          <span className="axis-label">True Label</span>
          <div className="labels-column">
            {labels.map(label => (
              <div key={label} className="label-y">{label}</div>
            ))}
          </div>
        </div>
        
        <div className="matrix-content">
          <div className="matrix-labels-x">
            <span className="axis-label">Predicted Label</span>
            <div className="labels-row">
              {labels.map(label => (
                <div key={label} className="label-x">{label}</div>
              ))}
            </div>
          </div>
          
          <div className="matrix-grid">
            {matrix.map((row, i) => (
              <div key={i} className="matrix-row">
                {row.map((value, j) => (
                  <div 
                    key={`${i}-${j}`} 
                    className="matrix-cell"
                    style={{ 
                      backgroundColor: getBackgroundColor(value),
                      color: getTextColor(value)
                    }}
                  >
                    {value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfusionMatrix;
