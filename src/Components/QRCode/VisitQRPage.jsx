import React, { useContext, useEffect, useState } from 'react';
import QRCodeDisplay from './QRCodeDisplay';
import { StudentContext } from '../../context/StudentContext';
import { useNavigate } from 'react-router-dom';

const VisitQRPage = () => {
  const { studentData, saveStudentData } = useContext(StudentContext);
  const [isReturned, setIsReturned] = useState(false);
  const [showQRCode, setShowQRCode] = useState(true);
  const navigate = useNavigate();

  const fetchUpdatedStatus = async () => {
    try {
      const res = await fetch(`https://hostelkaidi-13.onrender.com/${studentData.uniqid}/status`);
      const data = await res.json();

      if (data?.status) {
        setIsReturned(true);
        setShowQRCode(false);
        saveStudentData(data);

        setTimeout(() => {
          saveStudentData({});
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.error("Error fetching updated student status:", error);
    }
  };

  // Auto-poll every 9 seconds
  useEffect(() => {
    if (!studentData?.uniqid) return;

    const interval = setInterval(fetchUpdatedStatus, 200000);
    return () => clearInterval(interval);
  }, [studentData?.uniqid]);

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-gray-100 rounded-xl shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-4">Your Outing QR Code</h1>

      {isReturned ? (
        <p className="text-green-600 text-center font-bold text-xl">
          ✅ You have returned to the hostel!
        </p>
      ) : (
        <>
          {showQRCode && (
            <>
              <QRCodeDisplay studentData={studentData} />
              <p className="mt-4 text-center text-sm text-gray-600">
                Please show this QR code to the security guard when returning.
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default VisitQRPage;
