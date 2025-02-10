"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setWelcomeMessage('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      // First check if user exists and get their data
      const checkUserResponse = await fetch(`https://fellow-griselda-ams-org-8d17855c.koyeb.app/api/signup`);
      const users = await checkUserResponse.json();
      
      // First check if email exists
      const emailExists = users.some(u => u.email === email);
      
      if (!emailExists) {
        setError(
          <div>
            Email does not exist. <a href="/signup" className="text-blue-600 hover:underline font-medium">Create account</a> to sign up.
          </div>
        );
        return;
      }

      // If email exists, check password
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        setWelcomeMessage(`Welcome ${user.name}!`);
        // Redirect to the home page after a short delay
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        setError('Incorrect password. Please try again.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-2xl border border-gray-300">
        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back!</h2>

        {error && (
          <div className="p-4 text-red-600 bg-red-100 border border-red-500 rounded-md shadow">
            {error}
          </div>
        )}

        {welcomeMessage && (
          <div className="p-4 text-green-600 bg-green-100 border border-green-500 rounded-md shadow">
            {welcomeMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
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
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
          >
            Login
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
