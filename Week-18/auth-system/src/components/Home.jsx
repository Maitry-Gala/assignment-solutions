import React from 'react'
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto mt-12 px-6">
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Welcome back, {user.username}!
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          You're logged in via the Context API approach.
        </p>
        <div className="border-t border-gray-100 pt-6 space-y-3">
          <p className="text-sm text-gray-600">This demo covers:</p>
          <ul className="space-y-2">
            {["Context API", "State Lifting", "Login & Logout"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}