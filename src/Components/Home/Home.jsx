import React, { useState, useEffect } from "react";
import QRScanner from "../QRCode/QRScanner";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user === "student") {
      navigate("/student-scan");
    } else if (user === "security") {
      navigate("/security-scan");
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-semibold mb-6">Choose User Type</h1>
      <div className="flex gap-6">
        <button
          onClick={() => setUser("student")}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl text-lg font-medium transition"
        >
          Student
        </button>
        <button
          onClick={() => setUser("security")}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl text-lg font-medium transition"
        >
          Security
        </button>
      </div>
    </div>
  );
};

export default Home;
