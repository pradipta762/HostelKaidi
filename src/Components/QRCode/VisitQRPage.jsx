import React, { useContext, useEffect, useState } from "react";
import QRCodeDisplay from "./QRCodeDisplay";
import { StudentContext } from "../../context/StudentContext";
import { useNavigate } from "react-router-dom";

const VisitQRPage = () => {
  const { studentData, saveStudentData } = useContext(StudentContext);
  const [isReturned, setIsReturned] = useState(false);
  const navigate = useNavigate();

  // Poll backend to check return status
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!studentData?.uniqid) return;

      try {
        const res = await fetch(
          `https://hostelkaidi-13.onrender.com/${studentData.uniqid}/status`
        );

        const result = await res.json();

        if (result.isReturned) {
          setIsReturned(true);
          saveStudentData(result); // update context if needed

          clearInterval(interval); // stop polling
          setTimeout(() => {
            saveStudentData({});
            navigate("/");
          }, 3000);
        }
      } catch (err) {
        console.error("Error checking return status:", err);
      }
    }, 3000); // check every 3 seconds

    return () => clearInterval(interval);
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
