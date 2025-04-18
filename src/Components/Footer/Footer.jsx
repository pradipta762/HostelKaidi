// src/Components/Footer/Footer.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdQrCodeScanner } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';
import Profile from '../Profile/Profile';

const Footer = () => {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleQRCodeClick = () => {
    navigate('/');
  };

  return (
    <>
      <div className="fixed bottom-0 w-full bg-white py-3 shadow-inner flex justify-around items-center z-30">
        <div className="flex-1 flex justify-center">
          <button
            onClick={handleQRCodeClick}
            className="text-3xl text-blue-600 hover:text-blue-800 flex items-center justify-center"
          >
            <MdQrCodeScanner />
          </button>
        </div>

        <div className="flex-1 flex justify-center">
          <button
            onClick={() => setShowProfile(true)}
            className="text-2xl text-gray-700 hover:text-black flex items-center justify-center"
          >
            <FaUserAlt />
          </button>
        </div>
      </div>

      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
    </>
  );
};

export default Footer;
