import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [feedbackLinks, setFeedbackLinks] = useState([]);
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchFeedbackLinks();
    }, []);

    const getAccessToken = () => {
        return localStorage.getItem('accessToken');
    };

    const fetchFeedbackLinks = async () => {
        const token = getAccessToken();
        try {
            const response = await axios.get("/api/v1/form/get-user-feedbacklink", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFeedbackLinks(response.data.data);
        } catch (err) {
            console.error(err);
            setError("Failed to load feedback links.");
        }
    };

    const handleCreateFeedbackLink = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (!description.trim()) {
            setError("Description is required.");
            return;
        }

        const token = getAccessToken();
        if (!token) {
            setError("User is not authenticated. Please log in.");
            return;
        }

        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decodedToken = JSON.parse(window.atob(base64));

            const userId = decodedToken._id;
            if (!userId) {
                setError("User ID is missing in the token.");
                return;
            }

            const response = await axios.post(
                "/api/v1/form/create-feedbacklink",
                { description, userId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const { feedbackUrl } = response.data.data;
            setSuccessMessage(`Feedback link created successfully. Use this URL: ${feedbackUrl}`);
            setDescription("");
            fetchFeedbackLinks(); 
        } catch (err) {
            console.error(err);
            setError("Failed to create feedback link.");
        }
    };

    const handleDeleteFeedbackLink = async (userId) => {
        const token = getAccessToken();
        if (!token) {
            setError("User is not authenticated.");
            return;
        }
        console.log(userId);
        try {
            const response = await axios.delete(`/api/v1/form/feedback-links/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            setSuccessMessage("Feedback link deleted successfully.");
            fetchFeedbackLinks(); 
        } catch (err) {
            console.error(err);
            setError("Failed to delete feedback link.");
        }
    };

    const handleLogout = async () => {
        const accessToken = Cookies.get("accessToken");

        try {
            await axios.post(
                "/api/v1/users/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            window.location.href = "/login"; 
        } catch (err) {
            console.error(err);
            setError("Failed to log out.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4"style={{height:'85vh'}}>
            <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Feedback Links</h2>

                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                {successMessage && (
                    <div className="text-green-500 text-sm mb-4">{successMessage}</div>
                )}

                <form onSubmit={handleCreateFeedbackLink} className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-2">
                        Feedback Link Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none"
                    >
                        Create Feedback Link
                    </button>
                </form>

                <div className="space-y-4" >
                    {feedbackLinks.length === 0 ? (
                        <p>No feedback links available.</p>
                    ) : (
                        feedbackLinks.map((link) => (
                            <div
                                key={link.linkId}
                                className="flex justify-between items-center border-b border-gray-200 py-2"
                            >
                                <p className="text-sm text-gray-700">{link.description}</p>
                                <a
                                    href={`http://localhost:5173/submit-feedback/${link.linkId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline mt-1"
                                >
                                    http://localhost:5173/submit-feedback/{link.linkId}
                                </a>
                                <button onClick={() => navigate('/user-feedback')} className="bg-green-400 rounded-lg p-3 ">
                                    View Your Feedback
                                </button>
                                <button
                                    onClick={() => handleDeleteFeedbackLink(link._id)}
                                    className="bg-red-500 rounded-lg p-3 text-white "
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <button
                onClick={handleLogout}
                className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none"
            >
                Logout
            </button>
        </div>
    );
}

export default Home;
