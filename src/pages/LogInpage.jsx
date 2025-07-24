
'use client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiConfig from '../config/index'; // Your config file
import logo from '../assets/logo2.avif';
import loginIllustration from '../assets/loginillustration.jpg';

const LoginPage = () => {
  const navigate = useNavigate(); // ✅ For redirection

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${apiConfig.baseURL}/Auth/login`, {
        email,
        password
      });

      console.log('🔁 Response:', response);

      if (response.data?.code === 200) {
     

        // ✅ Store token
        localStorage.setItem("token", response.data.token);

        // ✅ Redirect to /home
        navigate('/home');
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('❌ Login Error:', err);

      if (err.response) {
        setError(err.response.data.message || 'Login failed.');
      } else {
        setError('Server not reachable or CORS issue.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50 p-10">
        <div className="text-center">
          <img src={loginIllustration} alt="Illustration" width={400} />
          <h2 className="text-2xl font-bold text-gray-700 mt-6">ChainDraft</h2>
          <p className="text-sm text-gray-500 mt-2">
            Empowering seamless P2P workflows with approvals, payments & insights.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center flex-1 p-8 max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          {/* <img src={logo} alt="FinFlo Logo" width={100} className="mx-auto" /> */}
          <h1 className="text-3xl font-extrabold text-blue-900 mt-4">FINFLO HUB</h1>
        </div>

        {/* Login Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block mb-1 text-gray-600 text-sm">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600 text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md font-medium transition ${
              loading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-900 text-white hover:bg-blue-800'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-sm text-center text-blue-600 hover:underline cursor-pointer">
            Forgot Password?
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
