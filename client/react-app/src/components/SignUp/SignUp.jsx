import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  
    const navigate = useNavigate()
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setSuccessMessage("");
  
      
      const { firstName, lastName, email, password } = formData;
      if (!firstName || !lastName || !email || !password) {
        setError("All fields are required.");
        return;
      }
  
      try {
        
        const response = await axios.post("/api/v1/users/register", formData);
        setSuccessMessage(response.data.message);  
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
      } catch (err) {
        if (err.response && err.response.data) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred. Please try again.");
        }
      }
    };
  
    return (
      <div className="signup-container max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 border" style={{height:'80vh'}}>
  <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign Up</h2>
  
  <form onSubmit={handleSubmit} className="space-y-4">
    {error && <div className="text-red-500 text-sm mb-4 font-bold">{error}</div>}
    {successMessage && <div className="text-green-500 text-sm mb-4 font-bold">{successMessage}</div>}
    
    <div>
      <label htmlFor="firstName" className="block text-sm font-medium text-gray-600 mb-2">First Name</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label htmlFor="lastName" className="block text-sm font-medium text-gray-600 mb-2">Last Name</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div className="flex items-center justify-between">
      <button
        type="submit"
        className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none"
      >
        Sign Up
      </button>
    </div>

    <div className="text-center mt-4">
      <button
        type="button"
        onClick={() => navigate('/login')}
        className="text-sm text-blue-600 hover:underline"
      >
        Already have an account? Login
      </button>
    </div>
  </form>
</div>

    );
  };
  
  export default SignUp;