import React, { createContext, useContext, useState, useEffect } from "react";
import studentDetails from "../utils/data";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [studentData, setStudentData] = useState({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("studentData"));
    if (storedData) {
      setStudentData(storedData);
    } else {
      saveStudentData(studentDetails);  // Only save default if nothing is there
    }
  }, []);

  const saveStudentData = (data) => {
    localStorage.setItem("studentData", JSON.stringify(data));
    setStudentData(data);
  };

  return (
    <StudentContext.Provider value={{ studentData, saveStudentData }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
