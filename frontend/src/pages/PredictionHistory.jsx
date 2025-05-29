import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PredictionHistory = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        // In a real implementation, this would fetch from the backend API
        // const response = await axios.get('/api/predictions');
        // setHistory(response.data);
        
        // For now, we'll use localStorage like MediPred
        const savedHistory = localStorage.getItem('predictionHistory');
        if (savedHistory) {
          setHistory(JSON.parse(savedHistory));
        } else {
          setHistory([]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching prediction history:', err);
        setError('Failed to load prediction history');
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleDeleteHistory = (id) => {
    // In a real implementation, this would call the backend API
    // await axios.delete(`/api/predictions/${id}`);
    
    // For now, we'll update localStorage
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('predictionHistory', JSON.stringify(updatedHistory));
  };

  const handleViewDetails = (item) => {
    navigate(`/prediction-details/${item.predictionType}/${item.id}`);
  };

  const clearAllHistory = () => {
    if (window.confirm('Are you sure you want to clear all your prediction history?')) {
      // In a real implementation, this would call the backend API
      // await axios.delete('/api/predictions');
      
      // For now, we'll clear localStorage
      setHistory([]);
      localStorage.setItem('predictionHistory', JSON.stringify([]));
    }
  };

  const getResultBadgeColor = (result) => {
    return result.prediction 
      ? 'bg-red-100 text-red-800' 
      : 'bg-green-100 text-green-800';
  };

  const getDiseaseIcon = (diseaseType) => {
    switch (diseaseType) {
      case 'diabetes':
        return <div className="bg-blue-100 p-2 rounded-lg text-blue-600">D</div>;
      case 'heart':
        return <div className="bg-red-100 p-2 rounded-lg text-red-600">H</div>;
      case 'parkinsons':
        return <div className="bg-purple-100 p-2 rounded-lg text-purple-600">P</div>;
      case 'mental-health':
        return <div className="bg-orange-100 p-2 rounded-lg text-orange-600">M</div>;
      default:
        return <div className="bg-gray-100 p-2 rounded-lg text-gray-600">?</div>;
    }
  };

  const getDiseaseName = (diseaseType) => {
    switch (diseaseType) {
      case 'diabetes':
        return 'Diabetes';
      case 'heart':
        return 'Heart Disease';
      case 'parkinsons':
        return 'Parkinson\'s Disease';
      case 'mental-health':
        return 'Mental Health';
      default:
        return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="flex-grow pt-8 pb-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-primary mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-lg text-gray-600">Loading your prediction history...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow pt-8 pb-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8 animate-fadeIn">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Prediction History</h1>
            <p className="text-gray-600">
              View and manage your previous prediction results
            </p>
          </div>
          {history.length > 0 && (
            <button 
              onClick={clearAllHistory}
              className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Clear All History
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9v4a1 1 0 102 0V9a1 1 0 10-2 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {history.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center animate-fadeIn">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No Prediction History Found</h2>
            <p className="text-gray-600 mb-6">You haven't made any predictions yet. Start a prediction to see your results here.</p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => navigate('/diabetes-prediction')}
                className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
              >
                Try Diabetes Prediction
              </button>
              <button 
                onClick={() => navigate('/predictions')}
                className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
              >
                View All Predictions
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-slideInUp">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left bg-gray-50">
                    <th className="px-6 py-3 text-gray-600 font-medium text-sm">Prediction Type</th>
                    <th className="px-6 py-3 text-gray-600 font-medium text-sm">Date</th>
                    <th className="px-6 py-3 text-gray-600 font-medium text-sm">Result</th>
                    <th className="px-6 py-3 text-gray-600 font-medium text-sm text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {history.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {getDiseaseIcon(item.predictionType)}
                          <span className="ml-3 font-medium text-gray-800">{getDiseaseName(item.predictionType)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{new Date(item.timestamp).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getResultBadgeColor(item.result)}`}>
                          {item.result.prediction ? 'Elevated Risk' : 'Low Risk'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-3">
                          <button
                            onClick={() => handleViewDetails(item)}
                            className="text-primary hover:text-primary/80 font-medium text-sm flex items-center"
                          >
                            View
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteHistory(item.id)}
                            className="text-red-400 hover:text-red-500 text-sm"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionHistory;
