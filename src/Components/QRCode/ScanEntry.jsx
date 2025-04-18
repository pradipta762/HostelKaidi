import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StudentContext } from '../../context/StudentContext';

const ScanEntry = () => {
  const { studentData } = useContext(StudentContext);
  const navigate = useNavigate();
  console.log(studentData)

  setTimeout(() => {
    navigate("/visit-form")
  }, 2000)

  return (
    <p> Fetching Ur Details.....</p>
  )
}

export default ScanEntry