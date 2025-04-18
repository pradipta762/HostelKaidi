import React, { useState } from 'react';
import { useStudent } from '../../context/StudentContext';
import { useNavigate } from 'react-router-dom';

const VisitForm = () => {
  const { studentData, saveStudentData } = useStudent();
  const [placeOfvisit, setPlaceOfVisit] = useState('')
  const [purposeOfvisit, setPurposeOfVisit] = useState('')
  const navigate = useNavigate();

  const generateUniqueQRId = () => {
    const uniqueId = Math.floor(Math.random() * 1000000) + 1;
    return uniqueId;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(studentData)

    const qrData = {
      ...studentData,
      qrId: generateUniqueQRId(),
      exitDate: new Date().toLocaleDateString(),
      exitTime: new Date().toLocaleTimeString(),
      place: placeOfvisit,
      purpose: purposeOfvisit
    }
    saveStudentData(qrData)
    console.log(qrData)
    navigate('/qr-display');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded mt-10 shadow">
      <h2 className="text-xl font-bold mb-4">Visit Form</h2>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="place-of-visit">Place of visit : </label>
        <input 
          type="text" 
          id="place-of-visit"
          name='place-of-visit'
          value={placeOfvisit}
          onChange={(e) => {setPlaceOfVisit(e.target.value)}}
          className="w-full p-2 border rounded mb-3"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="purpose-of-visit">Purpose of visit : </label>
        <input 
          type="text" 
          id="purpose-of-visit"
          name='purpose-of-visit'
          value={purposeOfvisit}
          onChange={(e) => {setPurposeOfVisit(e.target.value)}}
          className="w-full p-2 border rounded mb-3"
          required
        />
      </div>
      <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Generate QR</button>
    </form>
  );
};

export default VisitForm;
