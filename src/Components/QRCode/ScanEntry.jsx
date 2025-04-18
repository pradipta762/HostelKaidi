import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../../context/StudentContext";

const ScanEntry = () => {
  const { studentData } = useContext(StudentContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (studentData?.uniqid) {
      const timer = setTimeout(() => navigate("/visit-form"), 2000);
      return () => clearTimeout(timer);
    }
  }, [studentData, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-medium text-gray-700">
        ⏳ Fetching your details...
      </p>
    </div>
  );
};

export default ScanEntry;
