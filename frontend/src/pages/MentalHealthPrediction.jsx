import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MentalHealthPrediction = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    moodChanges: 'none',
    anxietyLevel: 'none',
    sleepQuality: 'good',
    energyLevel: 'normal',
    concentration: 'normal',
    appetite: 'normal',
    socialWithdrawal: 'none',
    suicidalThoughts: 'none',
    substanceUse: 'none',
    familyHistory: 'no',
    recentTrauma: 'no',
    stressLevel: 'low',
    physicalSymptoms: 'none'
  });

  const severityOptions = [
    { value: 'none', label: 'None' },
    { value: 'mild', label: 'Mild' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'severe', label: 'Severe' }
  ];

  const yesNoOptions = [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' }
  ];

  const sleepOptions = [
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' },
    { value: 'very_poor', label: 'Very Poor' }
  ];

  const energyOptions = [
    { value: 'high', label: 'High' },
    { value: 'normal', label: 'Normal' },
    { value: 'low', label: 'Low' },
    { value: 'very_low', label: 'Very Low' }
  ];

  const concentrationOptions = [
    { value: 'excellent', label: 'Excellent' },
    { value: 'normal', label: 'Normal' },
    { value: 'poor', label: 'Poor' },
    { value: 'very_poor', label: 'Very Poor' }
  ];

  const appetiteOptions = [
    { value: 'increased', label: 'Increased' },
    { value: 'normal', label: 'Normal' },
    { value: 'decreased', label: 'Decreased' },
    { value: 'severe_decrease', label: 'Severely Decreased' }
  ];

  const stressOptions = [
    { value: 'low', label: 'Low' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'high', label: 'High' },
    { value: 'very_high', label: 'Very High' }
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
      let depressionScore = 0;
      let anxietyScore = 0;
      let stressScore = 0;
      
      // Depression indicators
      if (formData.moodChanges === 'mild') depressionScore += 1;
      else if (formData.moodChanges === 'moderate') depressionScore += 2;
      else if (formData.moodChanges === 'severe') depressionScore += 3;
      
      if (formData.sleepQuality === 'fair') depressionScore += 1;
      else if (formData.sleepQuality === 'poor') depressionScore += 2;
      else if (formData.sleepQuality === 'very_poor') depressionScore += 3;
      
      if (formData.energyLevel === 'low') depressionScore += 1;
      else if (formData.energyLevel === 'very_low') depressionScore += 3;
      
      if (formData.appetite === 'decreased') depressionScore += 1;
      else if (formData.appetite === 'severe_decrease') depressionScore += 3;
      
      if (formData.concentration === 'poor') depressionScore += 1;
      else if (formData.concentration === 'very_poor') depressionScore += 2;
      
      if (formData.socialWithdrawal === 'mild') depressionScore += 1;
      else if (formData.socialWithdrawal === 'moderate') depressionScore += 2;
      else if (formData.socialWithdrawal === 'severe') depressionScore += 3;
      
      if (formData.suicidalThoughts !== 'none') depressionScore += 5;
      
      // Anxiety indicators
      if (formData.anxietyLevel === 'mild') anxietyScore += 2;
      else if (formData.anxietyLevel === 'moderate') anxietyScore += 4;
      else if (formData.anxietyLevel === 'severe') anxietyScore += 6;
      
      if (formData.sleepQuality === 'poor' || formData.sleepQuality === 'very_poor') anxietyScore += 1;
      
      if (formData.physicalSymptoms === 'mild') anxietyScore += 1;
      else if (formData.physicalSymptoms === 'moderate') anxietyScore += 2;
      else if (formData.physicalSymptoms === 'severe') anxietyScore += 3;
      
      // Stress indicators
      if (formData.stressLevel === 'moderate') stressScore += 2;
      else if (formData.stressLevel === 'high') stressScore += 4;
      else if (formData.stressLevel === 'very_high') stressScore += 6;
      
      if (formData.recentTrauma === 'yes') stressScore += 3;
      
      // Risk factors
      if (formData.familyHistory === 'yes') {
        depressionScore += 1;
        anxietyScore += 1;
      }
      
      if (formData.substanceUse === 'mild') {
        depressionScore += 1;
        anxietyScore += 1;
      } else if (formData.substanceUse === 'moderate') {
        depressionScore += 2;
        anxietyScore += 2;
      } else if (formData.substanceUse === 'severe') {
        depressionScore += 3;
        anxietyScore += 3;
      }
      
      // Calculate total mental health score
      const maxScore = 30;
      const totalScore = depressionScore + anxietyScore + stressScore;
      const normalizedScore = Math.min(1, totalScore / maxScore);
      
      // Determine conditions and their probabilities
      const conditions = [];
      
      if (depressionScore > 5) {
        conditions.push({
          name: 'Depression',
          probability: Math.min(0.95, (depressionScore / 15) + (Math.random() * 0.1))
        });
      }
      
      if (anxietyScore > 5) {
        conditions.push({
          name: 'Anxiety',
          probability: Math.min(0.95, (anxietyScore / 15) + (Math.random() * 0.1))
        });
      }
      
      if (stressScore > 5) {
        conditions.push({
          name: 'Stress',
          probability: Math.min(0.95, (stressScore / 15) + (Math.random() * 0.1))
        });
      }
      
      // Generate recommendations
      const recommendations = [
        "Practice mindfulness and relaxation techniques daily",
        "Establish a regular sleep schedule and bedtime routine",
        "Engage in regular physical exercise, aim for at least 30 minutes most days",
        "Connect with supportive friends and family members"
      ];
      
      if (depressionScore > 10 || anxietyScore > 10 || formData.suicidalThoughts !== 'none') {
        recommendations.unshift("Consult with a mental health professional as soon as possible");
      }
      
      if (formData.substanceUse !== 'none') {
        recommendations.push("Consider reducing alcohol or substance use, which can worsen symptoms");
      }
      
      const resultData = {
        overall_score: normalizedScore * 100,
        conditions: conditions,
        recommendations: recommendations,
        severity: normalizedScore > 0.7 ? 'severe' : (normalizedScore > 0.4 ? 'moderate' : 'mild'),
        prediction: normalizedScore > 0.4, // Consider moderate or severe as a positive prediction
        probability: (normalizedScore * 100).toFixed(1),
        risk_factors: [
          { name: 'Depression Score', value: depressionScore.toString(), impact: depressionScore > 10 ? 'high' : (depressionScore > 5 ? 'medium' : 'low') },
          { name: 'Anxiety Score', value: anxietyScore.toString(), impact: anxietyScore > 10 ? 'high' : (anxietyScore > 5 ? 'medium' : 'low') },
          { name: 'Stress Score', value: stressScore.toString(), impact: stressScore > 10 ? 'high' : (stressScore > 5 ? 'medium' : 'low') }
        ]
      };
      
      // Save to result state
      setResult(resultData);
      
      // Save to prediction history
      const predictionRecord = {
        id: Date.now().toString(),
        predictionType: 'mental-health',
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

      <h1 className="text-3xl font-bold text-center mb-8">Mental Health Assessment</h1>

      {result ? (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6 text-center">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
              result.severity === 'severe' ? 'bg-red-100 text-red-600' : 
              result.severity === 'moderate' ? 'bg-yellow-100 text-yellow-600' : 
              'bg-green-100 text-green-600'
            }`}>
              {result.severity === 'severe' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <h2 className="text-2xl font-bold">
              {result.severity === 'severe' ? 'High Concern Detected' : 
               result.severity === 'moderate' ? 'Moderate Concern Detected' : 
               'Mild Concern Detected'}
            </h2>
            <p className="text-gray-600 mt-2">
              Overall mental health score: {result.overall_score.toFixed(1)}%
            </p>
          </div>

          {result.conditions.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Potential Conditions</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {result.conditions.map((condition, index) => (
                  <div key={index} className="border rounded-md p-3">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{condition.name}</p>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        condition.probability > 0.7 ? 'bg-red-100 text-red-700' : 
                        condition.probability > 0.4 ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-green-100 text-green-700'
                      }`}>
                        {(condition.probability * 100).toFixed(1)}% Likelihood
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
            <p>Please consult with a mental health professional for proper diagnosis and treatment.</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-600 mb-6">
            Please answer the following questions honestly to assess your mental health status. This assessment is private and your responses are confidential.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-primary">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min="13"
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
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-primary">Mood & Emotions</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mood Changes</label>
                  <select
                    name="moodChanges"
                    value={formData.moodChanges}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {severityOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Anxiety Level</label>
                  <select
                    name="anxietyLevel"
                    value={formData.anxietyLevel}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {severityOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sleep Quality</label>
                  <select
                    name="sleepQuality"
                    value={formData.sleepQuality}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {sleepOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Energy Level</label>
                  <select
                    name="energyLevel"
                    value={formData.energyLevel}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {energyOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-primary">Cognitive & Behavioral Symptoms</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Concentration</label>
                  <select
                    name="concentration"
                    value={formData.concentration}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {concentrationOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Appetite</label>
                  <select
                    name="appetite"
                    value={formData.appetite}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {appetiteOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Social Withdrawal</label>
                  <select
                    name="socialWithdrawal"
                    value={formData.socialWithdrawal}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {severityOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thoughts of Self-Harm</label>
                  <select
                    name="suicidalThoughts"
                    value={formData.suicidalThoughts}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {severityOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-primary">Risk Factors</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Substance Use</label>
                  <select
                    name="substanceUse"
                    value={formData.substanceUse}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {severityOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Family History of Mental Health Issues</label>
                  <select
                    name="familyHistory"
                    value={formData.familyHistory}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {yesNoOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recent Trauma or Loss</label>
                  <select
                    name="recentTrauma"
                    value={formData.recentTrauma}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {yesNoOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Stress Level</label>
                  <select
                    name="stressLevel"
                    value={formData.stressLevel}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {stressOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Physical Symptoms (headaches, digestive issues, etc.)</label>
                  <select
                    name="physicalSymptoms"
                    value={formData.physicalSymptoms}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {severityOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
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
                ) : 'Get My Assessment'}
              </button>
            </div>
          </form>

          <div className="mt-8 text-sm text-gray-500 text-center">
            <p>This assessment is for informational purposes only and does not constitute medical advice.</p>
            <p>If you're experiencing thoughts of self-harm, please contact a mental health professional or call a crisis helpline immediately.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentalHealthPrediction;
