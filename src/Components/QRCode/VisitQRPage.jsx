import React, { useContext, useEffect, useState } from 'react';
import QRCodeDisplay from './QRCodeDisplay';
import { StudentContext } from '../../context/StudentContext';
import { useNavigate } from 'react-router-dom';

const VisitQRPage = () => {
  const { studentData, saveStudentData } = useContext(StudentContext);
  const [isReturned, setIsReturned] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (studentData?.isReturned) {
      setIsReturned(true);
      const timeout = setTimeout(() => {
        saveStudentData({});
        navigate('/');
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [studentData]);

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-gray-100 rounded-xl shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-4">Your Outing QR Code</h1>

      {isReturned ? (
        <p className="text-green-600 text-center font-bold text-xl">
          ✅ You have returned to the hostel!
        </p>
      ) : (
        <>
          <QRCodeDisplay studentData={studentData} />
          <p className="mt-4 text-center text-sm text-gray-600">
            Please show this QR code to the security guard when returning.
          </p>
        </>
      )}
    </div>
  );
};

export default VisitQRPage;
