import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ParkinsonsPrediction = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    tremor: 'none',
    rigidity: 'none',
    bradykinesia: 'none',
    posturalInstability: 'none',
    speechChanges: 'none',
    facialExpression: 'normal',
    handwriting: 'normal',
    sleepProblems: 'none',
    depression: 'none',
    anxiety: 'none',
    familyHistory: 'no',
    exposureToToxins: 'no',
    headInjury: 'no'
  });

  const symptomOptions = [
    { value: 'none', label: 'None' },
    { value: 'mild', label: 'Mild' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'severe', label: 'Severe' }
  ];

  const binaryOptions = [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' }
  ];

  const facialOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'reduced', label: 'Reduced Expression' },
    { value: 'masked', label: 'Masked Face' }
  ];

  const handwritingOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'slightly_small', label: 'Slightly Small' },
    { value: 'micrographia', label: 'Micrographia (Very Small)' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // Mock prediction algorithm - in a real app, this would come from a backend call
      let riskScore = 0;
      
      // Assess tremor
      if (formData.tremor === 'mild') riskScore += 1;
      else if (formData.tremor === 'moderate') riskScore += 2;
      else if (formData.tremor === 'severe') riskScore += 3;
      
      // Assess rigidity
      if (formData.rigidity === 'mild') riskScore += 1;
      else if (formData.rigidity === 'moderate') riskScore += 2;
      else if (formData.rigidity === 'severe') riskScore += 3;
      
      // Assess bradykinesia
      if (formData.bradykinesia === 'mild') riskScore += 1.5;
      else if (formData.bradykinesia === 'moderate') riskScore += 3;
      else if (formData.bradykinesia === 'severe') riskScore += 4;
      
      // Assess postural instability
      if (formData.posturalInstability === 'mild') riskScore += 1;
      else if (formData.posturalInstability === 'moderate') riskScore += 2;
      else if (formData.posturalInstability === 'severe') riskScore += 3;
      
      // Assess speech changes
      if (formData.speechChanges === 'mild') riskScore += 1;
      else if (formData.speechChanges === 'moderate') riskScore += 2;
      else if (formData.speechChanges === 'severe') riskScore += 3;
      
      // Assess facial expression
      if (formData.facialExpression === 'reduced') riskScore += 1.5;
      else if (formData.facialExpression === 'masked') riskScore += 3;
      
      // Assess handwriting
      if (formData.handwriting === 'slightly_small') riskScore += 1.5;
      else if (formData.handwriting === 'micrographia') riskScore += 3;
      
      // Assess sleep problems
      if (formData.sleepProblems === 'mild') riskScore += 0.5;
      else if (formData.sleepProblems === 'moderate') riskScore += 1;
      else if (formData.sleepProblems === 'severe') riskScore += 1.5;
      
      // Assess depression
      if (formData.depression === 'mild') riskScore += 0.5;
      else if (formData.depression === 'moderate') riskScore += 1;
      else if (formData.depression === 'severe') riskScore += 1.5;
      
      // Assess family history
      if (formData.familyHistory === 'yes') riskScore += 2;
      
      // Assess toxin exposure
      if (formData.exposureToToxins === 'yes') riskScore += 1;
      
      // Assess head injury
      if (formData.headInjury === 'yes') riskScore += 1;
      
      // Age factor
      const age = parseInt(formData.age);
      if (age > 60) riskScore += 2;
      else if (age > 50) riskScore += 1;
      
      // Calculate probability (max score is approximately 36)
      const probability = Math.min(0.95, Math.max(0.05, (riskScore / 36) + (Math.random() * 0.1)));
      const prediction = probability > 0.3; // Lower threshold due to severity of condition
      
      // Identify key risk factors
      const riskFactors = [];
      
      if (formData.tremor !== 'none') {
        riskFactors.push({ name: 'Tremor', value: formData.tremor, impact: formData.tremor === 'severe' ? 'high' : (formData.tremor === 'moderate' ? 'medium' : 'low') });
      }
      
      if (formData.bradykinesia !== 'none') {
        riskFactors.push({ name: 'Slowness of Movement', value: formData.bradykinesia, impact: formData.bradykinesia === 'severe' ? 'high' : (formData.bradykinesia === 'moderate' ? 'medium' : 'low') });
      }
      
      if (formData.rigidity !== 'none') {
        riskFactors.push({ name: 'Muscle Rigidity', value: formData.rigidity, impact: formData.rigidity === 'severe' ? 'high' : (formData.rigidity === 'moderate' ? 'medium' : 'low') });
      }
      
      if (formData.facialExpression !== 'normal') {
        riskFactors.push({ name: 'Facial Expression', value: formData.facialExpression, impact: formData.facialExpression === 'masked' ? 'high' : 'medium' });
      }
      
      if (formData.handwriting !== 'normal') {
        riskFactors.push({ name: 'Handwriting Changes', value: formData.handwriting, impact: formData.handwriting === 'micrographia' ? 'high' : 'medium' });
      }
      
      if (formData.familyHistory === 'yes') {
        riskFactors.push({ name: 'Family History', value: 'Yes', impact: 'high' });
      }
      
      // Sort by impact (high first)
      riskFactors.sort((a, b) => {
        const impactOrder = { high: 0, medium: 1, low: 2 };
        return impactOrder[a.impact] - impactOrder[b.impact];
      });
      
      // Limit to top 4 factors
      const limitedRiskFactors = riskFactors.slice(0, 4);
      
      const resultData = {
        prediction: prediction,
        probability: (probability * 100).toFixed(1),
        risk_factors: limitedRiskFactors,
        recommendations: [
          "Consult with a neurologist for a comprehensive evaluation",
          "Consider physical therapy to improve mobility and balance",
          "Engage in regular exercise, particularly activities that improve flexibility and coordination",
          "Join a support group to connect with others experiencing similar symptoms",
          "Maintain a healthy diet rich in antioxidants"
        ]
      };
      
      // Save to result state
      setResult(resultData);
      
      // Save to prediction history
      const predictionRecord = {
        id: Date.now().toString(),
        predictionType: 'parkinsons',
        timestamp: new Date().toISOString(),
        result: resultData,
        formData: {...formData}
      };
      
      // In a real implementation, this would call the backend API
      // await axios.post('/api/predictions', predictionRecord);
      
      // For now, we'll save to localStorage
      const savedHistory = localStorage.getItem('predictionHistory');
      const history = savedHistory ? JSON.parse(savedHistory) : [];
      localStorage.setItem('predictionHistory', JSON.stringify([predictionRecord, ...history]));
      
      setLoading(false);
    }, 1500);
  };

  const handleBack = () => {
    navigate('/predictions');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button 
        onClick={handleBack}
        className="mb-6 flex items-center text-primary hover:underline"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Predictions
      </button>

      <h1 className="text-3xl font-bold text-center mb-8">Parkinson's Disease Risk Assessment</h1>

      {result ? (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6 text-center">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${result.prediction ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
              {result.prediction ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <h2 className="text-2xl font-bold">
              {result.prediction ? 'Elevated Risk Detected' : 'Low Risk Detected'}
            </h2>
            <p className="text-gray-600 mt-2">
              Our model indicates a {result.probability}% probability of Parkinson's disease risk.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Key Risk Factors</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {result.risk_factors.map((factor, index) => (
                <div key={index} className="border rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{factor.name}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      factor.impact === 'high' ? 'bg-red-100 text-red-700' : 
                      factor.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-green-100 text-green-700'
                    }`}>
                      {factor.impact.charAt(0).toUpperCase() + factor.impact.slice(1)} Impact
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">Value: {factor.value.replace('_', ' ').charAt(0).toUpperCase() + factor.value.replace('_', ' ').slice(1)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
            <ul className="list-disc pl-5 space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="text-gray-700">{rec}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleBack}
              className="bg-primary text-white py-2 px-6 rounded-full hover:bg-primary/90 transition-colors mr-4"
            >
              Back to Predictions
            </button>
            <button
              onClick={() => setResult(null)}
              className="border border-primary text-primary py-2 px-6 rounded-full hover:bg-primary/10 transition-colors"
            >
              Start New Assessment
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-500 text-center">
            <p>This assessment is for informational purposes only and does not constitute medical advice.</p>
            <p>Please consult with a healthcare professional for proper diagnosis and treatment.</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-600 mb-6">
            Please provide information about your symptoms and risk factors to assess your risk of Parkinson's disease. All fields are required for an accurate prediction.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="18"
                  max="120"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tremor at Rest</label>
                <select
                  name="tremor"
                  value={formData.tremor}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {symptomOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Muscle Rigidity</label>
                <select
                  name="rigidity"
                  value={formData.rigidity}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {symptomOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slowness of Movement (Bradykinesia)</label>
                <select
                  name="bradykinesia"
                  value={formData.bradykinesia}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {symptomOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postural Instability</label>
                <select
                  name="posturalInstability"
                  value={formData.posturalInstability}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {symptomOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Speech Changes</label>
                <select
                  name="speechChanges"
                  value={formData.speechChanges}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {symptomOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facial Expression</label>
                <select
                  name="facialExpression"
                  value={formData.facialExpression}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {facialOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Handwriting Changes</label>
                <select
                  name="handwriting"
                  value={formData.handwriting}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {handwritingOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sleep Problems</label>
                <select
                  name="sleepProblems"
                  value={formData.sleepProblems}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {symptomOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Depression</label>
                <select
                  name="depression"
                  value={formData.depression}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {symptomOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Family History of Parkinson's</label>
                <select
                  name="familyHistory"
                  value={formData.familyHistory}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {binaryOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Exposure to Environmental Toxins</label>
                <select
                  name="exposureToToxins"
                  value={formData.exposureToToxins}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {binaryOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">History of Head Injury</label>
                <select
                  name="headInjury"
                  value={formData.headInjury}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {binaryOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white py-3 px-8 rounded-full hover:bg-primary/90 transition-colors"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : 'Get My Risk Assessment'}
              </button>
            </div>
          </form>

          <div className="mt-8 text-sm text-gray-500 text-center">
            <p>This assessment is for informational purposes only and does not constitute medical advice.</p>
            <p>Please consult with a healthcare professional for proper diagnosis and treatment.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkinsonsPrediction;
