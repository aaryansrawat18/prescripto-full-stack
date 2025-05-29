import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Health Predictions Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Heart Disease Prediction Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold text-primary mb-4">Heart Disease Prediction</h2>
          <p className="text-gray-600 mb-6">
            Use our advanced machine learning model to assess your risk of heart disease based on various health parameters.
          </p>
          <button
            onClick={() => navigate('/medipred/heart-prediction')}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Start Heart Disease Assessment
          </button>
        </div>

        {/* Diabetes Prediction Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold text-primary mb-4">Diabetes Prediction</h2>
          <p className="text-gray-600 mb-6">
            Check your risk of diabetes using our machine learning model that analyzes various health indicators.
          </p>
          <button
            onClick={() => navigate('/medipred/diabetes-prediction')}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Start Diabetes Assessment
          </button>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our predictions are based on advanced machine learning models trained on extensive medical datasets. 
          Please note that these predictions are for informational purposes only and should not replace professional medical advice.
        </p>
      </div>
    </div>
  );
};

export default Dashboard; 