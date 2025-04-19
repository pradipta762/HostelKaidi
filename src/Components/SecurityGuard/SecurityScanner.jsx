import React, { useEffect, useState, useContext } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { StudentContext } from "../../context/StudentContext";

const SecurityScanner = () => {
  const [message, setMessage] = useState("");
  const { saveStudentData } = useContext(StudentContext);

  // Check if return is after 10:00 PM
  const isAfterDeadline = (date) => {
    const deadline = new Date();
    deadline.setHours(22, 0, 0, 0); // 10:00 PM
    return date > deadline;
  };

  // Send updated student data to backend
  const sendUpdateToBackend = async (studentData) => {
    try {
      const response = await fetch(
        `https://hostelkaidi-13.onrender.com/${studentData.uniqid}/update-return`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            returnTime: studentData.returnTime,
            isReturned: studentData.isReturned,
            isLate: studentData.isLate,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage(
          studentData.isLate ? "Student is Late!" : "Student Returned on Time"
        );
      } else {
        setMessage("Failed to update return status");
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
      setMessage("Error updating database");
    }
  };

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 300,
    });

    scanner.render(
      async (decodedText) => {
        try {
          const data = JSON.parse(decodedText);

          const returnTime = new Date();
          data.isReturned = true;
          data.returnTime = returnTime.toLocaleString();
          data.isLate = isAfterDeadline(returnTime);

          saveStudentData(data); // optional local context update
          await sendUpdateToBackend(data); // 🔥 backend update

        } catch {
          setMessage("Invalid QR Code!");
        }
      },
      (error) => console.warn(`Scan error: ${error}`)
    );
  }, []);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(""), 4000);
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