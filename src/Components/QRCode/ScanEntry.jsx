import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../../context/StudentContext";

const ScanEntry = () => {
  const { studentData } = useContext(StudentContext);
  const navigate = useNavigate();
  console.log(studentData);

  setTimeout(() => {
    navigate("/visit-form");
  }, 2000);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-medium text-gray-700">
        ⏳ Fetching your details...
      </p>
    </div>
  );
};

export default ScanEntry;
