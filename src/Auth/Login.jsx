import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';

const Login = () => {
  const [uniqid, setUniqid] = useState('');
  const [password, setPassword] = useState('');
  const [Usertype, setUsertype] = useState('student');
  const { saveStudentData } = useStudent();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://hostelkaidi-13.onrender.com/login', {
        uniqid,
        password,
        Usertype,
      });

      if (response.data.status) {
        const user = response.data.data;
        saveStudentData(user);

        if (user.Usertype === 'student') {
          navigate('/student-scan');
        } else if (user.Usertype === 'security') {
          navigate('/security-scan');
        } else {
          alert('Unknown user type');
        }
      } else {
        alert(response.data.message || 'Invalid credentials');
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

      <select
        name="Usertype"
        value={Usertype}
        onChange={(e) => setUsertype(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="student">Student</option>
        <option value="security">Security</option>
      </select>

      <button className="bg-green-600 w-full text-white py-2 rounded">Login</button>

      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
      </p>
    </form>
  );
};

export default Login;
