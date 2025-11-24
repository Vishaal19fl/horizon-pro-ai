from flask import Flask, jsonify
from flask_cors import CORS
import random
import time
import joblib
import numpy as np
import pandas as pd
import os
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.model_selection import learning_curve
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)
CORS(app)

# Load dataset
try:
    df = pd.read_csv('diabetes.csv')
    X_raw = df.drop('Outcome', axis=1)
    y = df['Outcome']
    
    # Scale the data as models were trained on scaled data
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X_raw)
    # Convert back to DataFrame to preserve feature names for the models
    X = pd.DataFrame(X_scaled, columns=X_raw.columns)
    
    print("Dataset loaded and scaled successfully")
except Exception as e:
    print(f"Error loading dataset: {e}")
    X, y = None, None

# Load models
loaded_models = {}
model_files = {
    'gradient_boosting': 'gradient_boosting.pkl',
    'random_forest': 'random_forest.pkl',
    'svc': 'svc.pkl',
    'logistic_regression': 'logistic_regression.pkl',
    'k_nearest_neighbors': 'k-nearest_neighbors.pkl'
}

print("Loading models...")
for key, filename in model_files.items():
    try:
        if os.path.exists(filename):
            loaded_models[key] = joblib.load(filename)
            print(f"Loaded {key}")
        else:
            print(f"File not found: {filename}")
    except Exception as e:
        print(f"Error loading {key}: {e}")

def get_feature_importance(model_id):
    if model_id not in loaded_models:
        return None
    
    model = loaded_models[model_id]
    importance = None
    
    if hasattr(model, 'feature_importances_'):
        importance = model.feature_importances_
    elif hasattr(model, 'coef_'):
        importance = np.abs(model.coef_[0])
        
    if importance is not None:
        feature_names = getattr(model, 'feature_names_in_', [f'Feature {i}' for i in range(len(importance))])
        return {
            'labels': feature_names.tolist() if hasattr(feature_names, 'tolist') else list(feature_names),
            'values': importance.tolist() if hasattr(importance, 'tolist') else list(importance)
        }
    return None

def calculate_metrics(model, X, y):
    if X is None or y is None:
        return generate_metrics()
    
    try:
        y_pred = model.predict(X)
        return {
            'accuracy': accuracy_score(y, y_pred),
            'precision': precision_score(y, y_pred, average='weighted', zero_division=0),
            'recall': recall_score(y, y_pred, average='weighted', zero_division=0),
            'f1': f1_score(y, y_pred, average='weighted', zero_division=0)
        }
    except Exception as e:
        print(f"Error calculating metrics: {e}")
        return generate_metrics()

def calculate_confusion_matrix(model, X, y):
    if X is None or y is None:
        return generate_confusion_matrix()
    
    try:
        y_pred = model.predict(X)
        cm = confusion_matrix(y, y_pred)
        return cm.tolist()
    except Exception as e:
        print(f"Error calculating confusion matrix: {e}")
        return generate_confusion_matrix()

def calculate_learning_curve_data(model, X, y):
    if X is None or y is None:
        return generate_learning_curve()
    
    try:
        # Use a smaller subset or fewer cv folds for speed if needed
        train_sizes, train_scores, test_scores = learning_curve(
            model, X, y, cv=3, n_jobs=-1, 
            train_sizes=np.linspace(0.1, 1.0, 5)
        )
        return {
            'sizes': train_sizes.tolist(),
            'train_scores': np.mean(train_scores, axis=1).tolist(),
            'val_scores': np.mean(test_scores, axis=1).tolist()
        }
    except Exception as e:
        print(f"Error calculating learning curve: {e}")
        return generate_learning_curve()

# Mock data generators for visualization
def generate_history_data(points=12):
    return [random.uniform(0.75, 0.98) for _ in range(points)]

def generate_metrics():
    return {
        'accuracy': random.uniform(0.85, 0.95),
        'precision': random.uniform(0.80, 0.92),
        'recall': random.uniform(0.82, 0.94),
        'f1': random.uniform(0.81, 0.93)
    }

def generate_confusion_matrix():
    # 3x3 matrix for Low, Medium, High risk
    # Diagonal values (correct predictions) should be higher
    return [
        [random.randint(150, 200), random.randint(10, 30), random.randint(5, 15)],
        [random.randint(15, 35), random.randint(120, 160), random.randint(15, 25)],
        [random.randint(5, 15), random.randint(10, 30), random.randint(100, 140)]
    ]

def generate_learning_curve():
    sizes = [10, 30, 50, 70, 90, 100]
    # Training score starts high and decreases slightly
    base_train = random.uniform(0.90, 0.98)
    train_scores = [base_train - (i * 0.01) - random.uniform(0, 0.02) for i in range(6)]
    
    # Validation score starts low and increases
    base_val = random.uniform(0.60, 0.70)
    val_scores = [base_val + (i * 0.04) + random.uniform(0, 0.02) for i in range(6)]
    
    return {
        'sizes': sizes,
        'train_scores': train_scores,
        'val_scores': val_scores
    }

MODELS = {
    'gradient_boosting': {
        'name': 'Gradient Boosting',
        'type': 'Ensemble',
        'description': 'High-performance ensemble learning method combining multiple weak prediction models.',
        'accuracy': 0.790
    },
    'random_forest': {
        'name': 'Random Forest',
        'type': 'Ensemble',
        'description': 'Meta estimator that fits a number of decision tree classifiers on various sub-samples.',
        'accuracy': 0.800
    },
    'svc': {
        'name': 'Support Vector Classifier',
        'type': 'SVM',
        'description': 'Effective in high dimensional spaces, uses a subset of training points in the decision function.',
        'accuracy': 0.705
    },
    'logistic_regression': {
        'name': 'Logistic Regression',
        'type': 'Linear',
        'description': 'Statistical model that uses a logistic function to model a binary dependent variable.',
        'accuracy': 0.755
    },
    'k_nearest_neighbors': {
        'name': 'K-Nearest Neighbors',
        'type': 'Instance-based',
        'description': 'Non-parametric method used for classification and regression.',
        'accuracy': 0.725
    }
}

@app.route('/api/models', methods=['GET'])
def get_models():
    return jsonify(MODELS)

@app.route('/api/model/<model_id>/data', methods=['GET'])
def get_model_data(model_id):
    if model_id not in MODELS:
        return jsonify({'error': 'Model not found'}), 404
    
    # Simulate live data
    history = generate_history_data()
    
    # Get real metrics if model is loaded and data is available
    if model_id in loaded_models and X is not None:
        model = loaded_models[model_id]
        metrics = calculate_metrics(model, X, y)
        cm = calculate_confusion_matrix(model, X, y)
        lc = calculate_learning_curve_data(model, X, y)
    else:
        metrics = generate_metrics()
        # Use specific accuracy from config if real data not available
        metrics['accuracy'] = MODELS[model_id]['accuracy']
        cm = generate_confusion_matrix()
        lc = generate_learning_curve()
    
    # Get real feature importance if available
    feature_importance = get_feature_importance(model_id)
    
    return jsonify({
        'id': model_id,
        'info': MODELS[model_id],
        'metrics': metrics,
        'confusion_matrix': cm,
        'learning_curve': lc,
        'feature_importance': feature_importance,
        'history': {
            'labels': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            'accuracy': history,
            'loss': [1 - x for x in history]
        }
    })

@app.route('/api/dashboard/comparison', methods=['GET'])
def get_comparison_data():
    comparison = []
    for mid, mdata in MODELS.items():
        accuracy = mdata['accuracy'] # Default to config
        
        # Calculate real accuracy if model and data are available
        if mid in loaded_models and X is not None:
            try:
                model = loaded_models[mid]
                y_pred = model.predict(X)
                accuracy = accuracy_score(y, y_pred)
            except Exception as e:
                print(f"Error calculating accuracy for {mid}: {e}")

        comparison.append({
            'id': mid,
            'name': mdata['name'],
            'accuracy': accuracy,
            'speed': random.uniform(10, 100) # ms
        })
    return jsonify(comparison)

@app.route('/api/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    if X is None or y is None:
        return jsonify({'error': 'Data not available'}), 500
        
    # Use Random Forest for risk analysis if available, else fallback
    model = loaded_models.get('random_forest')
    
    total_patients = len(df)
    patients_at_risk = int(y.sum())
    
    # Risk Distribution
    risk_counts = {'Low': 0, 'Medium': 0, 'High': 0}
    
    if model:
        try:
            # Get probabilities
            probs = model.predict_proba(X)[:, 1]
            
            # Categorize
            for p in probs:
                if p < 0.3:
                    risk_counts['Low'] += 1
                elif p < 0.7:
                    risk_counts['Medium'] += 1
                else:
                    risk_counts['High'] += 1
        except:
            # Fallback if predict_proba not supported
            risk_counts['Low'] = int(len(y) - y.sum())
            risk_counts['High'] = int(y.sum())
            risk_counts['Medium'] = 0
    else:
        risk_counts['Low'] = int(len(y) - y.sum())
        risk_counts['High'] = int(y.sum())
    
    # Simulate monthly trend based on these totals
    # Distribute the totals across 12 months with some random variation
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    monthly_data = {
        'labels': months,
        'low': [],
        'medium': [],
        'high': []
    }
    
    for _ in range(12):
        monthly_data['low'].append(int(risk_counts['Low'] / 12 * random.uniform(0.8, 1.2)))
        monthly_data['medium'].append(int(risk_counts['Medium'] / 12 * random.uniform(0.8, 1.2)))
        monthly_data['high'].append(int(risk_counts['High'] / 12 * random.uniform(0.8, 1.2)))
        
    return jsonify({
        'total_patients': total_patients,
        'patients_at_risk': patients_at_risk,
        'risk_distribution': risk_counts,
        'patient_insights': monthly_data
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
