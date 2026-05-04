import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const User1 = "admin";
  const User2 = "Armin";
  const User3 = "shadow498";
  const PASS = "101201301";
  const PASS2 = "lordJavadShadow498";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      (username === User1 || username === User2 || username === User3) &&
      (password === PASS || password === PASS2)
    ) {
      onLogin();
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-2xl w-80 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Sign In
        </button>

        <p className="text-xs text-gray-400 text-center mt-2">
          Demo user: admin / 1234
        </p>
      </form>
    </div>
  );
}
