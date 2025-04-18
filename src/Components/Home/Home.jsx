import React, { useState, useEffect } from 'react';
import QRScanner from '../QRCode/QRScanner';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user === 'student') {
      navigate('/student-scan');
    } else if (user === 'security') {
      navigate('/security-scan');
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Choose User Type</h1>
      <div className='flex gap-4'>
        <button
          onClick={() => setUser('student')}
          className='bg-green-400 p-2 rounded-xl cursor-pointer'
        >
          Student
        </button>
        <button
          onClick={() => setUser('security')}
          className='bg-green-400 p-2 rounded-xl cursor-pointer'
        >
          Security
        </button>
      </div>
    </div>
  );
};

export default Home;
