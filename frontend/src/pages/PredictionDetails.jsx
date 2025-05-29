import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PredictionDetails = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        setLoading(true);
        // In a real implementation, this would fetch from the backend API
        // const response = await axios.get(`/api/predictions/${id}`);
        // setPrediction(response.data);
        
        // For now, we'll use localStorage like MediPred
        const savedHistory = localStorage.getItem('predictionHistory');
        if (savedHistory) {
          const history = JSON.parse(savedHistory);
          const foundPrediction = history.find(item => item.id === id);
          if (foundPrediction) {
            setPrediction(foundPrediction);
          } else {
            setError('Prediction not found');
          }
        } else {
          setError('Prediction history not found');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching prediction details:', err);
        setError('Failed to load prediction details');
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [id]);

  const handleBack = () => {
    navigate('/prediction-history');
  };

  const getDiseaseName = (diseaseType) => {
    switch (diseaseType) {
      case 'diabetes':
        return 'Diabetes';
      case 'heart':
        return 'Heart Disease';
      case 'parkinsons':
        return "Parkinson's Disease";
      case 'mental-health':
        return 'Mental Health';
      default:
        return 'Unknown';
    }
  };

  const getRiskLevel = (data) => {
    if (!data) return 'Unknown';
    
    const { prediction, probability } = data.result;
    const probValue = parseFloat(probability);
    
    if (prediction) {
      if (probValue > 75) return 'High';
      if (probValue > 45) return 'Moderate';
      return 'Low';
    }
    
    return 'Minimal';
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'High': return 'text-red-700 bg-red-50 border-red-200';
      case 'Moderate': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'Low': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'Minimal': return 'text-green-700 bg-green-50 border-green-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getRiskDescription = (riskLevel) => {
    switch (riskLevel) {
      case 'High':
        return 'Your risk assessment indicates a high probability of disease. Multiple risk factors have been identified that significantly increase your risk. Early medical intervention is strongly recommended.';
      case 'Moderate':
        return 'Your risk assessment indicates a moderate probability of disease. Several risk factors have been identified that may increase your risk. Regular monitoring and lifestyle modifications are recommended.';
      case 'Low':
        return 'Your risk assessment indicates a low probability of disease. Some risk factors have been identified, but they do not significantly increase your risk at this time. Maintaining a healthy lifestyle is recommended.';
      case 'Minimal':
        return 'Your risk assessment indicates a minimal probability of disease. Few or no risk factors have been identified. Continue maintaining your healthy lifestyle.';
      default:
        return 'Risk level could not be determined.';
    }
  };

  if (loading) {
    return (
      <div className="flex-grow pt-8 pb-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-primary mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-lg text-gray-600">Loading prediction details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-grow pt-8 pb-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Prediction</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={handleBack}
              className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary/90 transition-colors"
            >
              Back to History
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="flex-grow pt-8 pb-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Prediction Not Found</h2>
            <p className="text-gray-600 mb-6">The prediction you're looking for could not be found.</p>
            <button 
              onClick={handleBack}
              className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary/90 transition-colors"
            >
              Back to History
            </button>
          </div>
        </div>
      </div>
    );
  }

  const riskLevel = getRiskLevel(prediction);
  const riskColor = getRiskColor(riskLevel);
  const riskDescription = getRiskDescription(riskLevel);
  const predictionDate = new Date(prediction.timestamp).toLocaleString();

  return (
    <div className="flex-grow pt-8 pb-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center mb-8 animate-fadeIn">
          <button 
            onClick={handleBack}
            className="flex items-center text-primary hover:text-primary/80 mr-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to History
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{getDiseaseName(prediction.predictionType)} Risk Assessment Results</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-slideInUp">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Assessment Summary</h2>
                <p className="text-gray-600 mt-1">Completed on {predictionDate}</p>
              </div>
              <div className={`mt-4 md:mt-0 px-4 py-2 rounded-lg border ${riskColor}`}>
                <div className="flex items-center">
                  {prediction.result.prediction ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className="font-medium">{riskLevel} Risk</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className={`p-4 rounded-lg border mb-6 ${riskColor}`}>
              <p className="text-sm">{riskDescription}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Risk Assessment</h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Risk Probability:</span>
                  <span className="font-semibold">{prediction.result.probability}%</span>
                </div>
              </div>
              
              <h4 className="font-medium text-gray-700 mb-2">Key Risk Factors:</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {prediction.result.risk_factors.map((factor, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{factor.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        factor.impact === 'high' ? 'bg-red-100 text-red-700' : 
                        factor.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-green-100 text-green-700'
                      }`}>
                        {factor.impact.charAt(0).toUpperCase() + factor.impact.slice(1)} Impact
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">Value: {factor.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommendations</h3>
              <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                <ul className="space-y-3">
                  {prediction.result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Assessment Inputs</h3>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(prediction.formData).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="font-medium text-gray-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                This assessment is for educational purposes only and does not replace professional medical advice.
              </p>
              <button 
                onClick={handleBack}
                className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors text-sm"
              >
                Back to History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionDetails;
