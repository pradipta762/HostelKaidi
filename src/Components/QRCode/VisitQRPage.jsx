import React, { useContext } from 'react';
import QRCodeDisplay from './QRCodeDisplay';
import { StudentContext } from '../../context/StudentContext';

const VisitQRPage = () => {
  const { studentData } = useContext(StudentContext);

  const visitDetails = {
    qrId: studentData.qrId,
    registrationId: studentData.registrationId,
    name: studentData.name,
    hostelName: studentData.hostelName,
    roomNumber: studentData.roomNumber,
    place: studentData.visitPlace,
    purpose: studentData.visitPurpose,
    exitDate: studentData.exitDate,
    exitTime: studentData.exitTime,
    isReturned: false
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-gray-100 rounded-xl shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-4">Your Outing QR Code</h1>
      <QRCodeDisplay studentData={visitDetails} />
      <p className="mt-4 text-center text-sm text-gray-600">
        Please show this QR code to the security guard when returning.
      </p>
    </div>
  );
};

export default VisitQRPage;
