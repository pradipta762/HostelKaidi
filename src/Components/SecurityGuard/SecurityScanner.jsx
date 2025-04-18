import React, { useEffect, useState, useContext } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { StudentContext } from "../../context/StudentContext";

const SecurityScanner = () => {
  const [message, setMessage] = useState("");
  const { saveStudentData } = useContext(StudentContext);
  const hostelDeadlineHour = 22;
  const hostelDeadlineMinute = 0;

  const isAfterDeadline = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return hours > hostelDeadlineHour || (hours === hostelDeadlineHour && minutes > hostelDeadlineMinute);
  };
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 300,
    });

    scanner.render(
      (decodedText) => {
        try {
          const scannedData = JSON.parse(decodedText);
          const returnTime = new Date();
          const isLate = isAfterDeadline(returnTime);

          scannedData.isReturned = true;
          scannedData.returnTime = returnTime.toLocaleString();
          scannedData.isLate = isLate;

          saveStudentData(scannedData);

          setMessage(isLate ? "Student is Late!" : "Student Returned on Time");

          scanner.clear();
        } catch (err) {
          setMessage("Invalid QR Code!");
        }
      },
      (error) => {
        console.warn(`Scan error: ${error}`);
      }
    );
  }, [saveStudentData]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Scan Student QR</h1>
      <div id="reader" className="w-full max-w-md mx-auto"></div>
      {setTimeout(() => {
        message && (
          <p className="mt-4 text-lg font-semibold text-blue-600">{message}</p>
        );
      }, 1000)}
    </div>
  );
};

export default SecurityScanner;
