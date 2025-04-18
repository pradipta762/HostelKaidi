import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';

const QRScanner = () => {

  const [scanResult, setScanResult] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      fps: 10,
      qrbox: 300
    });

    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        navigate("/scan-entry")
        scanner.clear(); // stop scanning after successful read
      },
      (error) => {
        console.warn(`Scan error: ${error}`);
      }
    );
  }, []);

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md text-center space-y-6">
      <div
        id="reader"
        className="border-4 border-dashed border-blue-500 rounded-lg p-2"
      ></div>

      {scanResult && (
        <div className="bg-green-100 text-green-700 font-medium p-3 rounded-lg break-words">
          ✅ Scanned Result: <br />
          <span className="text-sm">{scanResult}</span>
        </div>
      )}
    </div>
  );
};

export default QRScanner;