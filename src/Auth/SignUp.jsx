import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    regno: '',
    department: '',
    parentName: '',
    parentPhoneNo: '',
    studentPhoneNo: '',
    hostelName: '',
    roomNo: '',
    uniqid: '',
    password: '',
    type: 'student', // or 'security'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://hostelkaidi-13.onrender.com/signup', formData);

      if (response.data.status) {
        alert('Signup successful. Please login.');
        navigate('/');
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert('Signup failed. Try again.');
    }
  };

  return (
    <form onSubmit={handleSignup} className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>

      {Object.entries({
        name: 'Full Name',
        regno: 'Registration No',
        department: 'Department',
        parentName: 'Parent Name',
        parentPhoneNo: 'Parent Phone No',
        studentPhoneNo: 'Student Phone No',
        hostelName: 'Hostel Name',
        roomNo: 'Room No',
        uniqid: 'Unique ID',
        password: 'Password',
      }).map(([key, label]) => (
        <input
          key={key}
          type={key === 'password' ? 'password' : 'text'}
          name={key}
          placeholder={label}
          value={formData[key]}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
      ))}

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
        Already have an account?{' '}
        <Link to="/" className="text-green-600 hover:underline">Login</Link>
      </p>
    </form>
  );
};

export default Signup;
