"use client";

import { useState } from 'react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); // Clear any existing errors

    // Basic validation
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Example POST request to the backend for signup
    try {
      const response = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Show success message
      alert('Signup successful');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-blue-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-2xl border border-gray-300">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
        
        {error && (
          <div className="p-4 text-red-600 bg-red-100 border border-red-500 rounded-md shadow">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out shadow-sm hover:shadow-lg hover:border-blue-400"
              placeholder="Enter your name"
              required
              style={{
                transition: 'box-shadow 0.3s ease-in-out',
              }}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out shadow-sm hover:shadow-lg hover:border-blue-400"
              placeholder="Enter your email"
              required
              style={{
                transition: 'box-shadow 0.3s ease-in-out',
              }}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out shadow-sm hover:shadow-lg hover:border-blue-400"
              placeholder="Enter your password"
              required
              style={{
                transition: 'box-shadow 0.3s ease-in-out',
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account? <a href="http://localhost:3000/login" className="text-blue-500 hover:underline">Login</a>
          </p>
        </div>

        <style jsx>{`
          input::placeholder {
            color: #a0aec0; /* Light gray for placeholder text */
          }
          input:focus {
            box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5); /* Enhanced focus shadow */
          }
          .shadow-md {
            transition: all 0.3s ease-in-out; /* Smooth transition for shadows */
          }
          .shadow-lg:hover {
            transform: translateY(-2px); /* Slight lift on hover for inputs */
          }
        `}</style>
      </div>
    </div>
  );
}