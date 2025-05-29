import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Predictions = () => {
  const navigate = useNavigate();

  // Icons for the prediction cards
  const heartIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );

  const diabetesIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  );

  const parkinsonsIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );

  const mentalHealthIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );

  // Prediction options
  const predictionOptions = [
    {
      id: 'heart',
      title: 'Heart Disease Prediction',
      description: 'Assess your risk of heart disease using AI algorithms and receive personalized health insights.',
      icon: heartIcon,
      route: '/heart-prediction',
    },
    {
      id: 'diabetes',
      title: 'Diabetes Prediction',
      description: 'Evaluate your risk of diabetes based on key health indicators and get actionable recommendations.',
      icon: diabetesIcon,
      route: '/diabetes-prediction',
    },
    {
      id: 'parkinsons',
      title: 'Parkinson\'s Disease Prediction',
      description: 'Analyze your risk factors for Parkinson\'s disease with our advanced prediction model.',
      icon: parkinsonsIcon,
      route: '/parkinsons-prediction',
    },
    {
      id: 'mental-health',
      title: 'Mental Health Assessment',
      description: 'Get insights about your mental wellbeing through our AI-powered assessment tool.',
      icon: mentalHealthIcon,
      route: '/mental-health-prediction',
    },
  ];

  return (
    <div className="flex flex-col items-center gap-4 py-8 mb-8">
      {/* Hero Section */}
      <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 mb-16 w-full'>
        {/* Hero Left */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[6vw]'>
          <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
            AI-Powered Health <br /> Prediction Tools
          </p>
          <p className='text-white text-sm font-light'>
            Leverage advanced AI models to assess your health risks and take proactive steps toward better wellbeing.
          </p>
        </div>

        {/* Hero Right */}
        <div className='md:w-1/2 flex justify-center items-center py-8'>
          <div className='bg-white/10 backdrop-blur-sm p-6 rounded-lg'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <h1 className='text-3xl font-medium text-[#262626]'>Health Prediction Tools</h1>
      <p className='sm:w-1/2 text-center text-sm text-[#5C5C5C] mb-6'>
        Our AI-powered prediction tools analyze your health data to identify potential risks and provide personalized recommendations.
      </p>

      {/* Prediction Options Grid */}
      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 px-4 sm:px-0 max-w-5xl'>
        {predictionOptions.map((option) => (
          <div 
            key={option.id}
            className='border border-[#C9D8FF] rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] cursor-pointer bg-white flex flex-col items-center md:items-start'
            onClick={() => navigate(option.route)}
          >
            <div className='mb-4'>
              {option.icon}
            </div>
            <h2 className='text-xl font-medium text-[#262626] mb-2'>{option.title}</h2>
            <p className='text-[#5C5C5C] text-sm mb-4 text-center md:text-left'>{option.description}</p>
            <button className='flex items-center gap-2 text-primary mt-auto'>
              Start Assessment <img className='w-3' src={assets.arrow_icon} alt="" />
            </button>
          </div>
        ))}
      </div>

      {/* History Section */}
      <div className='w-full flex justify-center mt-8 mb-4'>
        <button 
          onClick={() => navigate('/prediction-history')} 
          className='flex items-center gap-2 bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          View Prediction History
        </button>
      </div>

      {/* Information Section */}
      <div className='bg-[#EAEFFF] p-6 rounded-lg mt-4 max-w-3xl'>
        <div className='flex items-start gap-3'>
          <img src={assets.info_icon} alt="Info" className='w-6 mt-1' />
          <div>
            <h3 className='font-medium text-[#262626] mb-2'>Important Information</h3>
            <p className='text-sm text-[#5C5C5C]'>
              Our health prediction tools are designed for informational purposes only and should not replace professional medical advice. 
              Always consult with a healthcare professional for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predictions;
