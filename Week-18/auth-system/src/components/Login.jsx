import { useState } from "react";
import { useAuth} from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded shadow-sm p-20 w-full max-w-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Sign in</h2>

        <div className="space-y-4 p-2">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded p-10 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          
          <button
            onClick={() => username.trim() && login(username.trim())}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}