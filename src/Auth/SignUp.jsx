import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    type: "student",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Signup successful");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
        required
      />

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="student">Student</option>
        <option value="security">Security</option>
      </select>

      <button className="bg-blue-600 w-full text-white py-2 rounded">Create Account</button>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/" className="text-green-600 hover:underline">Login</Link>
      </p>
    </form>
  );
};

export default Signup;
