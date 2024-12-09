import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserFeedback = () => {
    const [userFeedback, setUserFeedback] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // Get the access token from localStorage
    const getAccessToken = () => {
        return localStorage.getItem('accessToken');
    };

    // Decode the JWT token to extract the userId
    const decodeToken = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedToken = JSON.parse(window.atob(base64));
        return decodedToken._id;  // Assuming _id stores the userId
    };
    console.log("decodetoken",decodeToken);
    // Get the userId from the decoded token
    const userId = getAccessToken() ? decodeToken(getAccessToken()) : null;

    console.log("respons after decode", userId);

    useEffect(() => {
        if (userId) {
            fetchUserFeedback(userId);
        } else {
            setError("User ID not found.");
            setLoading(false);
        }
    }, [userId]);

    const fetchUserFeedback = async (userId) => {
        try {
            const token = getAccessToken();
            const response = await axios.get(`/api/v1/form/view-feedback-response/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("fetchdata",response.data.data);
            setUserFeedback(response.data.data); // Set the feedback data
        } catch (err) {
            console.error(err);
            setError("Failed to load user feedback.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">User Feedback Responses</h2>

                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                {userFeedback.length === 0 ? (
                    <p>No feedback responses found.</p>
                ) : (
                    userFeedback.map((response, index) => (
                        <div key={index} className="bg-gray-100 p-4 mb-4 rounded-md">
                            <h3 className="font-semibold text-gray-800">Feedback #{index + 1}</h3>
                            <p><strong>Positive Responses:</strong> {response.positiveResponses.join(', ')}</p>
                            <p><strong>Improvement Responses:</strong> {response.improvementResponses.join(', ')}</p>
                            <p><strong>Positive Feedback:</strong> {response.positiveFeedback}</p>
                            <p><strong>Improvement Feedback:</strong> {response.improvementFeedback}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default UserFeedback;
