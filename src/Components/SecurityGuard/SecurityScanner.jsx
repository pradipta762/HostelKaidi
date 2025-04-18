import React, { useEffect, useState, useContext } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { StudentContext } from "../../context/StudentContext";

const SecurityScanner = () => {
  const [message, setMessage] = useState("");
  const { saveStudentData } = useContext(StudentContext);

  const isAfterDeadline = (date) => {
    const deadline = new Date();
    deadline.setHours(22, 0, 0, 0);
    return date > deadline;
  };

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 300 });

    scanner.render(
      (decodedText) => {
        try {
          const data = JSON.parse(decodedText);
          const returnTime = new Date();
          data.isReturned = true;
          data.returnTime = returnTime.toLocaleString();
          data.isLate = isAfterDeadline(returnTime);
          saveStudentData(data);
          setMessage(data.isLate ? "Student is Late!" : "Student Returned on Time");
          scanner.clear();
        } catch {
          setMessage("Invalid QR Code!");
        }
      },
      (error) => console.warn(`Scan error: ${error}`)
    );
  }, [saveStudentData]);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Scan Student QR</h1>
      <div id="reader" className="w-full max-w-md mx-auto"></div>
      {message && (
        <p className="mt-4 text-lg font-semibold text-blue-600">{message}</p>
      )}
    </div>
  );
};

export default SecurityScanner;
