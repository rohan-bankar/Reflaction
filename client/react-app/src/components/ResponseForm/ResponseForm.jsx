import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResponseForm = () => {
  const { linkId } = useParams(); 
  const [positiveResponses, setPositiveResponses] = useState([]);
  const [improvementResponses, setImprovementResponses] = useState([]);
  const [positiveFeedback, setPositiveFeedback] = useState('');
  const [improvementFeedback, setImprovementFeedback] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    console.log("Received linkId:", linkId);
  }, [linkId]);

  
  const handlePositiveResponseChange = (e) => {
    const value = e.target.value;
    setPositiveResponses(prevState =>
      prevState.includes(value)
        ? prevState.filter((response) => response !== value)
        : [...prevState, value]
    );
  };

  
  const handleImprovementResponseChange = (e) => {
    const value = e.target.value;
    setImprovementResponses(prevState =>
      prevState.includes(value)
        ? prevState.filter((response) => response !== value)
        : [...prevState, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    
    if ((!positiveResponses.length && !improvementResponses.length) ||
      (!positiveFeedback && !improvementFeedback)) {
      setError('At least one response (positive or improvement) is required.');
      return;
    }

    try {
      const response = await axios.post(`/api/v1/response/submit-response/${linkId}`, {
        linkId,
        positiveResponses,
        improvementResponses,
        positiveFeedback,
        improvementFeedback,
      });

      console.log(response.data.data);
      setSuccessMessage('Feedback submitted successfully!');
      setPositiveResponses([]);
      setImprovementResponses([]);
      setPositiveFeedback('');
      setImprovementFeedback('');
    } catch (err) {
      setError('Error submitting feedback: ' + err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg"style={{height:'85vh'}}>
    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Submit Your Feedback</h2>

    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
    {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h4 className="text-lg font-medium text-gray-700 mb-2">Positive Responses:</h4>
        <div className="space-x-4">
          {["adaptive", "flexible", "teamplayer"].map((response) => (
            <label key={response} className="inline-flex items-center">
              <input
                type="checkbox"
                value={response}
                checked={positiveResponses.includes(response)}
                onChange={handlePositiveResponseChange}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="ml-2 text-gray-600">{response}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-700 mb-2">Improvement Responses:</h4>
        <div className="space-x-4">
          {["arrogant", "lazy", "aggressive"].map((response) => (
            <label key={response} className="inline-flex items-center">
              <input
                type="checkbox"
                value={response}
                checked={improvementResponses.includes(response)}
                onChange={handleImprovementResponseChange}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="ml-2 text-gray-600">{response}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <textarea
          placeholder="Positive Feedback"
          value={positiveFeedback}
          onChange={(e) => setPositiveFeedback(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          rows="4"
        />
      </div>

      <div>
        <textarea
          placeholder="Improvement Feedback"
          value={improvementFeedback}
          onChange={(e) => setImprovementFeedback(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          rows="4"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Submit Feedback
      </button>
    </form>
  </div>
  );
};

export default ResponseForm;
