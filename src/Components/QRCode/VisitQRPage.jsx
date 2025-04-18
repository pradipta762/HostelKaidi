// VisitQRPage.js
import React, { useContext, useEffect, useState } from 'react';
import QRCodeDisplay from './QRCodeDisplay';
import { StudentContext } from '../../context/StudentContext';
import { useNavigate } from 'react-router-dom';

const VisitQRPage = () => {
  const { saveStudentData } = useContext(StudentContext);
  const [localStudentData, setLocalStudentData] = useState({});
  const [isReturned, setIsReturned] = useState(false);
  const navigate = useNavigate();

  const handleReturn = () => {
    setTimeout(() => {
      localStorage.removeItem("studentData");
      saveStudentData({});
      navigate('/');
    }, 3000);
  };

  // Load data on mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("studentData"));

    if (storedData) {
      if (storedData.isReturned) {
        setIsReturned(true);
        handleReturn();
      } else {
        setLocalStudentData(storedData);
        saveStudentData(storedData);
      }
    }
  }, []);

  // Detect return updates from another tab (optional)
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedData = JSON.parse(localStorage.getItem("studentData"));
      if (updatedData?.isReturned) {
        setIsReturned(true);
        handleReturn();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-gray-100 rounded-xl shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-4">Your Outing QR Code</h1>

      {isReturned ? (
        <p className="text-green-600 text-center font-bold text-xl">
          ✅ You have returned to the hostel!
        </p>
      ) : (
        <>
          <QRCodeDisplay studentData={localStudentData} />
          <p className="mt-4 text-center text-sm text-gray-600">
            Please show this QR code to the security guard when returning.
          </p>
        </>
      )}
    </div>
  );
};

export default VisitQRPage;
