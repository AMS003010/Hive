"use client";

import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>(""); // Explicitly define error type
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Set loading state

    try {
      const response = await fetch("https://fellow-griselda-ams-org-8d17855c.koyeb.app/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json(); // Assuming the server responds with JSON

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong"); // Handle errors from the server
      }

      alert("Signup successful");
      // Optionally, redirect to login or another page here

    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred"); // Handle unknown error types
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow duration-300 ease-in-out shadow-sm hover:shadow-lg hover:border-blue-400"
              placeholder="Enter your name"
              required
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow duration-300 ease-in-out shadow-sm hover:shadow-lg hover:border-blue-400"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow duration-300 ease-in-out shadow-sm hover:shadow-lg hover:border-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 text-white rounded-md shadow-md transition duration-200 ease-in-out transform ${
              loading
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-105"
            }`}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
          </p>
        </div>

        <style jsx>{`
          input::placeholder {
            color: #a0aec0;
          }
          input:focus {
            box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
          }
        `}</style>
      </div>
    </div>
  );
}
