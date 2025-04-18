import React from 'react';

const Profile = ({ onClose }) => {
  const student = JSON.parse(localStorage.getItem('studentData'));

  if (!student) {
    return (
      <div className="p-4 bg-white rounded shadow-lg w-full max-w-sm mx-auto mt-10">
        <p className="text-gray-700">No profile data found.</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-sm relative text-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl font-bold"
        >
          ✕
        </button>

        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-green-500"
        />

        <h2 className="text-xl font-semibold text-gray-800 mb-1">{student.name}</h2>
        <p className="text-sm text-gray-600 mb-1"><strong>Reg No:</strong> {student.regId}</p>
        <p className="text-sm text-gray-600 mb-1"><strong>Department:</strong> {student.department}</p>
        <p className="text-sm text-gray-600 mb-1"><strong>Year:</strong> {student.year} Year</p>
        <p className="text-sm text-gray-600"><strong>Hostel:</strong> {student.hostelName}, Room No: {student.roomNo}</p>
      </div>
    </div>
  );
};

export default Profile;