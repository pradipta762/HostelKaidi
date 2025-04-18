// src/context/StudentContext.js
import React, { createContext, useContext, useState } from 'react';

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [studentData, setStudentData] = useState({});

  const saveStudentData = (data) => {
    setStudentData(data);
  };

  return (
    <StudentContext.Provider value={{ studentData, saveStudentData }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
