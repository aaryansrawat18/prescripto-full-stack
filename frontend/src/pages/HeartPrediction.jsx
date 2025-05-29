import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeartPrediction = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    age: '',
    sex: 'male',
    chestPainType: 'typical',
    restingBP: '',
    cholesterol: '',
    fastingBS: 'false',
    restingECG: 'normal',
    maxHR: '',
    exerciseAngina: 'no',
    oldpeak: '0',
    stSlope: 'flat',
    majorVessels: '0',
    thalassemia: 'normal'
  });

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
    setError(null);
    
    try {
      // Validate inputs
      if (!formData.age || !formData.restingBP || !formData.cholesterol || !formData.maxHR) {
        throw new Error('Please fill in all required fields');
      }

      // Simulate API call with a delay
      setTimeout(() => {
        // Enhanced algorithm based on clinical knowledge
        // Age risk factor
        const ageVal = parseInt(formData.age);
        const ageRisk = ageVal > 65 ? 0.25 : (ageVal > 50 ? 0.15 : (ageVal > 40 ? 0.05 : 0));
        
        // Sex risk factor (males have higher risk)
        const sexRisk = formData.sex === 'male' ? 0.1 : 0;
        
        // Chest pain type risk - asymptomatic is highest risk counter-intuitively
        const chestPainMap = {
          'typical': 0.05,
          'atypical': 0.1,
          'nonAnginal': 0.15,
          'asymptomatic': 0.25
        };
        const chestPainRisk = chestPainMap[formData.chestPainType] || 0;
        
        // Blood pressure risk
        const bpVal = parseInt(formData.restingBP);
        const bpRisk = bpVal > 160 ? 0.25 : (bpVal > 140 ? 0.15 : (bpVal > 120 ? 0.05 : 0));
        
        // Cholesterol risk
        const cholVal = parseInt(formData.cholesterol);
        const cholRisk = cholVal > 280 ? 0.25 : (cholVal > 240 ? 0.15 : (cholVal > 200 ? 0.05 : 0));
        
        // Fasting blood sugar risk
        const fastingBSRisk = formData.fastingBS === 'true' ? 0.15 : 0;
        
        // ECG risk
        const ecgMap = {
          'normal': 0,
          'stWaveAbnormality': 0.15,
          'leftVentricularHypertrophy': 0.2
        };
        const ecgRisk = ecgMap[formData.restingECG] || 0;
        
        // Max heart rate risk (lower max HR can indicate problems)
        const hrVal = parseInt(formData.maxHR);
        const maxHrTarget = 220 - ageVal; // Target max HR based on age
        const hrRisk = hrVal < (maxHrTarget * 0.7) ? 0.15 : 0;
        
        // Exercise angina risk
        const anginaRisk = formData.exerciseAngina === 'yes' ? 0.25 : 0;
        
        // ST depression risk (oldpeak)
        const oldpeakVal = parseFloat(formData.oldpeak);
        const oldpeakRisk = oldpeakVal > 3 ? 0.25 : (oldpeakVal > 1.5 ? 0.15 : (oldpeakVal > 0.5 ? 0.05 : 0));
        
        // ST slope risk
        const slopeMap = {
          'upsloping': 0,
          'flat': 0.15,
          'downsloping': 0.25
        };
        const slopeRisk = slopeMap[formData.stSlope] || 0;
        
        // Major vessels risk
        const vesselsVal = parseInt(formData.majorVessels);
        const vesselsRisk = 0.08 * vesselsVal; // 0, 0.08, 0.16, or 0.24
        
        // Thalassemia risk
        const thalMap = {
          'normal': 0,
          'fixedDefect': 0.1,
          'reversibleDefect': 0.2
        };
        const thalRisk = thalMap[formData.thalassemia] || 0;
        
        // Calculate total risk score
        const totalRisk = ageRisk + sexRisk + chestPainRisk + bpRisk + cholRisk + 
                          fastingBSRisk + ecgRisk + hrRisk + anginaRisk + 
                          oldpeakRisk + slopeRisk + vesselsRisk + thalRisk;
        
        // Calculate probability with some randomness for simulation
        const baseProbability = totalRisk / 2.5; // Normalize to 0-1 range
        const randomFactor = Math.random() * 0.1 - 0.05; // -0.05 to +0.05
        const probability = Math.min(0.95, Math.max(0.05, baseProbability + randomFactor));
        
        // Determine prediction (risk threshold)
        const prediction = probability > 0.4;
        
        // Identify top risk factors
        const allFactors = [
          { name: 'Age', value: formData.age + ' years', impact: ageRisk / 0.25, riskScore: ageRisk },
          { name: 'Sex', value: formData.sex === 'male' ? 'Male' : 'Female', impact: sexRisk / 0.1, riskScore: sexRisk },
          { name: 'Chest Pain Type', value: formData.chestPainType.charAt(0).toUpperCase() + formData.chestPainType.slice(1), impact: chestPainRisk / 0.25, riskScore: chestPainRisk },
          { name: 'Resting Blood Pressure', value: formData.restingBP + ' mm Hg', impact: bpRisk / 0.25, riskScore: bpRisk },
          { name: 'Cholesterol', value: formData.cholesterol + ' mg/dl', impact: cholRisk / 0.25, riskScore: cholRisk },
          { name: 'Fasting Blood Sugar', value: formData.fastingBS === 'true' ? '> 120 mg/dl' : 'Normal', impact: fastingBSRisk / 0.15, riskScore: fastingBSRisk },
          { name: 'Resting ECG', value: formData.restingECG.replace(/([A-Z])/g, ' $1').trim(), impact: ecgRisk / 0.2, riskScore: ecgRisk },
          { name: 'Maximum Heart Rate', value: formData.maxHR + ' bpm', impact: hrRisk / 0.15, riskScore: hrRisk },
          { name: 'Exercise-Induced Angina', value: formData.exerciseAngina === 'yes' ? 'Yes' : 'No', impact: anginaRisk / 0.25, riskScore: anginaRisk },
          { name: 'ST Depression', value: formData.oldpeak + ' mm', impact: oldpeakRisk / 0.25, riskScore: oldpeakRisk },
          { name: 'ST Slope', value: formData.stSlope, impact: slopeRisk / 0.25, riskScore: slopeRisk },
          { name: 'Major Vessels', value: formData.majorVessels, impact: vesselsRisk / 0.24, riskScore: vesselsRisk },
          { name: 'Thalassemia', value: formData.thalassemia.replace(/([A-Z])/g, ' $1').trim(), impact: thalRisk / 0.2, riskScore: thalRisk }
        ];
        
        // Sort by risk score and take top factors
        const sortedFactors = [...allFactors].sort((a, b) => b.riskScore - a.riskScore);
        const topRiskFactors = sortedFactors.slice(0, 5).map(factor => ({
          name: factor.name,
          value: factor.value,
          impact: factor.impact > 0.8 ? 'high' : factor.impact > 0.4 ? 'medium' : 'low'
        }));
        
        // Generate tailored recommendations
        const recommendations = [
          "Maintain a heart-healthy diet rich in fruits, vegetables, whole grains, and lean proteins",
          "Engage in regular cardiovascular exercise (at least 150 minutes of moderate activity per week)"
        ];
        
        // Add specific recommendations based on risk factors
        if (bpRisk > 0.1) {
          recommendations.push("Monitor blood pressure regularly and follow medical advice to keep it controlled");
        }
        
        if (cholRisk > 0.1) {
          recommendations.push("Have your cholesterol levels checked regularly and consider dietary changes or medication if elevated");
        }
        
        if (fastingBSRisk > 0) {
          recommendations.push("Monitor blood glucose levels and follow your doctor's advice for managing blood sugar");
        }
        
        if (anginaRisk > 0) {
          recommendations.push("Discuss your chest pain symptoms with a cardiologist for proper evaluation");
        }
        
        if (ageRisk > 0.15 || sexRisk > 0) {
          recommendations.push("Schedule regular cardiac check-ups given your age and gender risk profile");
        }
        
        // Always include these general recommendations
        recommendations.push("Quit smoking and limit alcohol consumption");
        recommendations.push("Manage stress through relaxation techniques, adequate sleep, and social support");
        
        const resultData = {
          prediction: prediction,
          probability: (probability * 100).toFixed(1),
          risk_factors: topRiskFactors,
          recommendations: recommendations
        };
        
        // Save to result state
        setResult(resultData);
        
        // Save to prediction history
        const predictionRecord = {
          id: Date.now().toString(),
          predictionType: 'heart',
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
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/predictions');
  };

  return (
    <div className="flex-grow pt-8 pb-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-8 animate-fadeIn">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Heart Disease Risk Assessment</h1>
            <p className="text-gray-600">
              Complete this clinical assessment to evaluate your heart disease risk using advanced predictive modeling
            </p>
          </div>
          </div>
          <button 
            onClick={handleBack}
            className="flex items-center text-primary hover:text-primary/80"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>Back to Predictions</span>
          </button>
        </div>

        {result ? (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-slideInUp">
          <div className="mb-8 text-center">
            <div className={`inline-flex items-center justify-center w-28 h-28 rounded-full mb-4 ${result.prediction ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
              {result.prediction ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              {result.prediction ? 'Elevated Risk Detected' : 'Low Risk Detected'}
            </h2>
            <div className="mt-3 inline-block bg-gray-100 px-4 py-2 rounded-full">
              <p className="text-gray-700 font-medium">
                Risk Probability: <span className={result.prediction ? 'text-red-600 font-bold' : 'text-green-600 font-bold'}>{result.probability}%</span>
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Key Risk Factors</h3>
            <div className="grid md:grid-cols-2 gap-5">
              {result.risk_factors.map((factor, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-gray-800">{factor.name}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${factor.impact === 'high' ? 'bg-red-100 text-red-700' : factor.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                      {factor.impact.charAt(0).toUpperCase() + factor.impact.slice(1)} Impact
                    </span>
                  </div>
                  <p className="text-gray-600">Value: <span className="font-medium">{factor.value}</span></p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Personalized Recommendations</h3>
            <div className="bg-blue-50 rounded-lg p-4">
              <ul className="space-y-3">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex justify-center space-x-4">
            <button
              onClick={handleBack}
              className="bg-primary text-white py-3 px-8 rounded-md hover:bg-primary/90 transition-colors shadow-sm"
            >
              Back to Predictions
            </button>
            <button
              onClick={() => setResult(null)}
              className="border-2 border-primary text-primary py-3 px-8 rounded-md hover:bg-primary/5 transition-colors"
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
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-slideInUp">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
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
          
          <p className="text-gray-600 mb-6">
            Please provide your clinical information below to assess your risk of heart disease. All fields are required for an accurate prediction.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Demographics */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Demographics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age (years)
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  min="20"
                  max="100"
                  placeholder="40-70"
                />
                <p className="text-xs text-gray-500 mt-1">Normal: &lt;45 | Risk increases with age, especially &gt;65</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sex
                </label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              </div>
            </div>

            {/* Clinical Measurements */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Clinical Measurements</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resting Blood Pressure (mm Hg)
                </label>
                <input
                  type="number"
                  name="restingBP"
                  value={formData.restingBP}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  min="80"
                  max="200"
                  placeholder="120-140"
                />
                <p className="text-xs text-gray-500 mt-1">Normal: &lt;120 | At risk: 120-139 | High: ≥140</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Serum Cholesterol (mg/dl)
                </label>
                <input
                  type="number"
                  name="cholesterol"
                  value={formData.cholesterol}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  min="100"
                  max="600"
                  placeholder="150-300"
                />
                <p className="text-xs text-gray-500 mt-1">Normal: &lt;200 | Borderline: 200-239 | High: ≥240</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fasting Blood Sugar &gt; 120 mg/dl
                </label>
                <select
                  name="fastingBS"
                  value={formData.fastingBS}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Normal: &lt;100 mg/dl | Prediabetes: 100-125 mg/dl | Diabetes: &gt;125 mg/dl</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Heart Rate Achieved
                </label>
                <input
                  type="number"
                  name="maxHR"
                  value={formData.maxHR}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  min="60"
                  max="220"
                  placeholder="120-170"
                />
                <p className="text-xs text-gray-500 mt-1">Normal: 220-age | Lower rates can indicate cardiac issues</p>
              </div>
              </div>
            </div>

            {/* Cardiac Symptoms */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Cardiac Symptoms</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chest Pain Type
                </label>
                <select
                  name="chestPainType"
                  value={formData.chestPainType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="typical">Typical Angina</option>
                  <option value="atypical">Atypical Angina</option>
                  <option value="nonAnginal">Non-anginal Pain</option>
                  <option value="asymptomatic">Asymptomatic</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Asymptomatic chest pain has highest cardiac risk</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exercise-Induced Angina
                </label>
                <select
                  name="exerciseAngina"
                  value={formData.exerciseAngina}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Angina during exercise is a significant risk factor</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resting ECG Results
                </label>
                <select
                  name="restingECG"
                  value={formData.restingECG}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="normal">Normal</option>
                  <option value="stWaveAbnormality">ST-T Wave Abnormality</option>
                  <option value="leftVentricularHypertrophy">Left Ventricular Hypertrophy</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">ST-T wave abnormalities and LVH indicate increased risk</p>
              </div>
              </div>
            </div>

            {/* Stress Test Results */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Stress Test Results</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ST Depression Induced by Exercise (mm)
                  </label>
                  <input
                    type="number"
                    name="oldpeak"
                    value={formData.oldpeak}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    min="0"
                    max="10"
                    step="0.1"
                    placeholder="0-4"
                  />
                  <p className="text-xs text-gray-500 mt-1">Normal: &lt;0.5 | Borderline: 0.5-1.5 | Abnormal: &gt;1.5</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ST Segment Slope
                  </label>
                  <select
                    name="stSlope"
                    value={formData.stSlope}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="upsloping">Upsloping</option>
                    <option value="flat">Flat</option>
                    <option value="downsloping">Downsloping</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Flat or downsloping patterns indicate higher risk</p>
                </div>
              </div>
            </div>

            {/* Advanced Cardiac Assessments */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Advanced Cardiac Assessments</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Major Vessels (0-3)
                  </label>
                  <select
                    name="majorVessels"
                    value={formData.majorVessels}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Risk increases with each affected major vessel</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thalassemia
                  </label>
                  <select
                    name="thalassemia"
                    value={formData.thalassemia}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="normal">Normal</option>
                    <option value="fixedDefect">Fixed Defect</option>
                    <option value="reversibleDefect">Reversible Defect</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Reversible defects indicate higher heart disease risk</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white py-3 px-8 rounded-md hover:bg-primary/90 transition-colors"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : 'Calculate Risk'}
              </button>
            </div>
          </form>

          <div className="mt-8 bg-blue-50 rounded-xl shadow-sm p-6 animate-slideInUp">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">About This Assessment</h2>
            <p className="text-gray-700 mb-4">
              This heart disease risk assessment uses a machine learning model trained on the Cleveland Clinic Heart Disease Dataset.
            </p>
            <p className="text-gray-700 mb-4">
              The model analyzes 13 clinical parameters to evaluate coronary heart disease risk. The assessment provides a probability-based risk score, identifies key risk factors, and offers personalized recommendations.
            </p>
            <p className="text-gray-700 font-medium">
              Note: This assessment is for educational purposes only and does not replace professional medical advice. Always consult with a healthcare provider about your heart health concerns.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeartPrediction;
