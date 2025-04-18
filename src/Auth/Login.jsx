import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [uniqid, setUniqid] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://hostelkaidi-13.onrender.com/login', {
        uniqid,
        password,
      });

      if (response.data.status) {
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        const userType = response.data.user.type;

        if (userType === 'student') {
          navigate('/student-scan');
        } else if (userType === 'security') {
          navigate('/security-scan');
        }
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <input
        type="text"
        placeholder="Unique ID"
        value={uniqid}
        onChange={(e) => setUniqid(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        required
      />
      <button className="bg-green-600 w-full text-white py-2 rounded">Login</button>
      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
      </p>
    </form>
  );
};

export default Login;
