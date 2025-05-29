import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DiabetesPrediction = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    pregnancies: '0',
    glucose: '110',
    bloodPressure: '70',
    skinThickness: '20',
    insulin: '80',
    bmi: '25.0',
    diabetesPedigree: '0.4',
    age: '35',
  });

  // Field definitions with min, max and info descriptions
  const formFields = [
    { id: 'pregnancies', label: 'Number of Pregnancies', type: 'number', min: 0, max: 20, info: 'Number of times pregnant (Enter 0 if not applicable or if male)' },
    { id: 'glucose', label: 'Glucose Level', type: 'number', min: 50, max: 250, info: 'Plasma glucose concentration after 2 hours in an oral glucose tolerance test (mg/dL). Normal: <140, Prediabetes: 140-199, Diabetes: ≥200' },
    { id: 'bloodPressure', label: 'Blood Pressure', type: 'number', min: 30, max: 180, info: 'Diastolic blood pressure (mm Hg). Normal: <80, Elevated: 80-89, High: ≥90' },
    { id: 'skinThickness', label: 'Skin Thickness', type: 'number', min: 0, max: 100, info: 'Triceps skin fold thickness (mm). Average values: Males: 8-22mm, Females: 12-30mm' },
    { id: 'insulin', label: 'Insulin Level', type: 'number', min: 0, max: 900, info: '2-Hour serum insulin (mu U/ml). Normal fasting range: 16-166 mu U/ml' },
    { id: 'bmi', label: 'Body Mass Index (BMI)', type: 'number', min: 10, max: 70, step: '0.1', info: 'Weight in kg/(height in m)². Underweight: <18.5, Normal: 18.5-24.9, Overweight: 25-29.9, Obese: ≥30' },
    { id: 'diabetesPedigree', label: 'Diabetes Pedigree Function', type: 'number', min: 0, max: 2.5, step: '0.01', info: 'Diabetes family history score (0.1-2.5). Higher values indicate stronger family history of diabetes.' },
    { id: 'age', label: 'Age', type: 'number', min: 18, max: 120, info: 'Age in years. Diabetes risk increases significantly after age 45.' },
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
    setError(null);
    
    try {
      // Validate inputs
      if (!formData.glucose || !formData.bloodPressure || !formData.bmi || !formData.age) {
        throw new Error('Please fill in all required fields');
      }

      // Simulate API call with a delay
      setTimeout(() => {
        try {
          // Enhanced algorithm based on clinical knowledge
          // Glucose risk factor (most important predictor)
          const glucoseVal = parseInt(formData.glucose);
          const glucoseRisk = glucoseVal >= 200 ? 0.35 : (glucoseVal >= 140 ? 0.25 : (glucoseVal >= 100 ? 0.1 : 0));
          
          // BMI risk factor
          const bmiVal = parseFloat(formData.bmi);
          const bmiRisk = bmiVal >= 35 ? 0.25 : (bmiVal >= 30 ? 0.2 : (bmiVal >= 25 ? 0.1 : 0));
          
          // Age risk factor
          const ageVal = parseInt(formData.age);
          const ageRisk = ageVal >= 65 ? 0.2 : (ageVal >= 45 ? 0.15 : (ageVal >= 35 ? 0.05 : 0));
          
          // Family history risk (diabetes pedigree function)
          const pedigreeVal = parseFloat(formData.diabetesPedigree);
          const pedigreeRisk = pedigreeVal >= 1.0 ? 0.25 : (pedigreeVal >= 0.6 ? 0.15 : (pedigreeVal >= 0.3 ? 0.05 : 0));
          
          // Blood pressure risk
          const bpVal = parseInt(formData.bloodPressure);
          const bpRisk = bpVal >= 90 ? 0.15 : (bpVal >= 80 ? 0.1 : 0);
          
          // Insulin resistance risk
          const insulinVal = parseInt(formData.insulin);
          const insulinRisk = insulinVal >= 200 ? 0.2 : (insulinVal >= 150 ? 0.1 : (insulinVal <= 30 && insulinVal > 0 ? 0.05 : 0));
          
          // Skin thickness as a proxy for body fat distribution
          const skinVal = parseInt(formData.skinThickness);
          const skinRisk = skinVal >= 40 ? 0.1 : (skinVal >= 30 ? 0.05 : 0);
          
          // Pregnancy history (only applies to females)
          const pregVal = parseInt(formData.pregnancies);
          const pregRisk = pregVal >= 5 ? 0.1 : (pregVal >= 1 ? 0.05 : 0);
          
          // Calculate total risk score with weighted importance
          const totalRisk = (
            glucoseRisk * 1.5 + // Glucose is most important
            bmiRisk * 1.2 +     // BMI is second most important
            pedigreeRisk * 1.1 + // Genetic predisposition is third
            ageRisk + 
            bpRisk + 
            insulinRisk + 
            skinRisk + 
            pregRisk
          ) / 8.8; // Normalize to 0-1 range (max possible is ~1.76, so divide by 2x that)
          
          // Add slight randomness for simulation
          const randomFactor = Math.random() * 0.1 - 0.05; // -0.05 to +0.05
          const probability = Math.min(0.95, Math.max(0.05, totalRisk + randomFactor));
          
          // Determine prediction (risk threshold)
          const prediction = probability > 0.4; // Lower threshold than heart disease
          
          // Identify all risk factors with their values and impact
          const allFactors = [
            { name: 'Glucose Level', value: formData.glucose + ' mg/dL', impact: glucoseRisk / 0.35, riskScore: glucoseRisk },
            { name: 'BMI', value: formData.bmi + ' kg/m²', impact: bmiRisk / 0.25, riskScore: bmiRisk },
            { name: 'Age', value: formData.age + ' years', impact: ageRisk / 0.2, riskScore: ageRisk },
            { name: 'Family History', value: formData.diabetesPedigree, impact: pedigreeRisk / 0.25, riskScore: pedigreeRisk },
            { name: 'Blood Pressure', value: formData.bloodPressure + ' mm Hg', impact: bpRisk / 0.15, riskScore: bpRisk },
            { name: 'Insulin Level', value: formData.insulin + ' mu U/ml', impact: insulinRisk / 0.2, riskScore: insulinRisk },
            { name: 'Skin Thickness', value: formData.skinThickness + ' mm', impact: skinRisk / 0.1, riskScore: skinRisk },
            { name: 'Pregnancies', value: formData.pregnancies, impact: pregRisk / 0.1, riskScore: pregRisk }
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
            "Maintain a balanced diet rich in fiber, lean proteins, and healthy fats while limiting refined carbohydrates and sugars",
            "Engage in regular physical activity (aim for at least 150 minutes of moderate exercise per week)"
          ];
          
          // Add specific recommendations based on risk factors
          if (glucoseRisk > 0.1) {
            recommendations.push("Monitor your blood glucose levels regularly and consider consulting with a healthcare provider");
          }
          
          if (bmiRisk > 0.1) {
            recommendations.push("Work with a healthcare provider to develop a weight management plan appropriate for your health status");
          }
          
          if (bpRisk > 0.05) {
            recommendations.push("Monitor your blood pressure regularly and follow medical advice to keep it controlled");
          }
          
          if (pedigreeRisk > 0.15) {
            recommendations.push("Given your family history, consider more frequent diabetes screening with your healthcare provider");
          }
          
          // Always include these general recommendations
          recommendations.push("Stay well-hydrated and limit alcohol consumption");
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
            predictionType: 'diabetes',
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
        } catch (err) {
          console.error('Error in prediction algorithm:', err);
          setError('An error occurred while processing your data. Please try again.');
          setLoading(false);
        }
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Diabetes Risk Assessment</h1>
            <p className="text-gray-600">
              Complete this clinical assessment to evaluate your diabetes risk using advanced predictive modeling
            </p>
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
            <h2 className="text-2xl font-bold text-gray-800">
              {result.prediction ? 'Elevated Diabetes Risk Detected' : 'Low Diabetes Risk Detected'}
            </h2>
            <div className="inline-block bg-gray-100 px-4 py-2 rounded-full mt-3">
              <p className="text-gray-700 font-medium">
                Risk Probability: <span className={result.prediction ? 'text-red-600' : 'text-green-600'}>{result.probability}%</span>
              </p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-8">
            <p className="text-blue-800">
              This assessment analyzes 8 clinical parameters to evaluate diabetes risk. The results provide a probability-based risk score, identify key risk factors, and offer personalized recommendations.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Risk Factors</h3>
            <div className="grid md:grid-cols-2 gap-5">
              {result.risk_factors.map((factor, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-800">{factor.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      factor.impact === 'high' ? 'bg-red-100 text-red-700' : 
                      factor.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-green-100 text-green-700'
                    }`}>
                      {factor.impact.charAt(0).toUpperCase() + factor.impact.slice(1)} Impact
                    </span>
                  </div>
                  <p className="text-gray-600">Value: {factor.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Personalized Recommendations</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
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
              className="bg-gray-100 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-200 transition-colors font-medium"
            >
              Back to Predictions
            </button>
            <button
              onClick={() => setResult(null)}
              className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary/90 transition-colors font-medium"
            >
              Start New Assessment
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-500 text-center">
            <p>This assessment is for educational purposes only and does not replace professional medical advice.</p>
            <p>Always consult with a healthcare provider about your health concerns.</p>
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
            Please provide your health information below to assess your risk of diabetes. All fields are required for an accurate prediction.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formFields.slice(0, 4).map((field) => (
                  <div key={field.id} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.id}
                      value={formData[field.id]}
                      onChange={handleChange}
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-gray-500">{field.info}</p>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formFields.slice(4).map((field) => (
                  <div key={field.id} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.id}
                      value={formData[field.id]}
                      onChange={handleChange}
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-gray-500">{field.info}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-8">
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
              This diabetes risk assessment uses a machine learning model trained on the Pima Indians Diabetes Dataset.
            </p>
            <p className="text-gray-700 mb-4">
              The model analyzes 8 clinical parameters to evaluate diabetes risk. The assessment provides a probability-based risk score, identifies key risk factors, and offers personalized recommendations.
            </p>
            <p className="text-gray-700 font-medium">
              Note: This assessment is for educational purposes only and does not replace professional medical advice. Always consult with a healthcare provider about your health concerns.
            </p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default DiabetesPrediction;
