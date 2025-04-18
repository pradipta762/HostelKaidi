import React from 'react';
import QRCode from 'react-qr-code';

const QRCodeDisplay = ({ studentData }) => {
  const isReturned = studentData?.isReturned;

  return (
    <div className="flex justify-center items-center min-h-[300px] p-4 bg-white rounded-xl shadow-md text-center">
      {!isReturned ? (
        <QRCode value={JSON.stringify(studentData)} size={200} />
      ) : (
        <div>
          <h2 className="text-lg font-semibold">Returned to hostel</h2>
        </div>
      )}
    </div>
  );
};

export default QRCodeDisplay;
