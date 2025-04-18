// QRCodeDisplay.js
import React from 'react';
import QRCode from 'react-qr-code';

const QRCodeDisplay = ({ studentData }) => {
  return (
    <div className="flex justify-center items-center min-h-[300px] p-4 bg-white rounded-xl shadow-md text-center">
      <QRCode value={JSON.stringify(studentData)} size={200} />
    </div>
  );
};

export default QRCodeDisplay;
