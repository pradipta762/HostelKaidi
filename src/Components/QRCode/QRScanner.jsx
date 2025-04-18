import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

const QRScanner = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 300,
    });

    scanner.render(
      (decodedText) => {
        navigate("/scan-entry");
        scanner.clear(); 
      },
      (error) => {
        console.warn(`Scan error: ${error}`);
      }
    );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md text-center space-y-6">
        <div
          id="reader"
          className="border-4 border-dashed border-blue-500 rounded-lg p-2"
        ></div>
      </div>
    </div>
  );
};

export default QRScanner;
