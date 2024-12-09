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
  
      // Basic validation for empty fields
      const { firstName, lastName, email, password } = formData;
      if (!firstName || !lastName || !email || !password) {
        setError("All fields are required.");
        return;
      }
  
      try {
        // Send POST request to the backend
        const response = await axios.post("/api/v1/users/register", formData);
        setSuccessMessage(response.data.message);  // Assuming message is sent in the response
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
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
          
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
  
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
  
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
  
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
  
          <button type="submit">Sign Up</button>
          <button type='button' onClick={()=>navigate('/login')}>Login</button>
        </form>
      </div>
    );
  };
  
  export default SignUp;