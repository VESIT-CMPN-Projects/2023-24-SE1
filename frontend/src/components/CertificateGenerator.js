import React, { useState } from 'react';
import CertificateImage from '../assets/Certificate.png'; 
import html2canvas from 'html2canvas';

const CertificateGenerator = ({ name, division, onClose }) => {
  const [certificateData, setCertificateData] = useState(null);

  const generateCertificate = async () => {
    try {
      const certificateElement = document.createElement('div');
      certificateElement.innerHTML = `
        <img src="${CertificateImage}" alt="LeavingCertificate" />
        <p>Name: ${name}</p>
        <p>Division: ${division}</p>
      `;
  
      html2canvas(certificateElement).then(canvas => {
        const pngDataUrl = canvas.toDataURL();
        setCertificateData(pngDataUrl);
      });
    } catch (error) {
      console.error('Error generating certificate: ', error);
    }
  };

  const downloadCertificate = () => {
    try {
      const link = document.createElement('a');
      link.href = certificateData;
      link.download = 'certificate.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading certificate: ', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-lg text-center">
      <h2 className="text-lg font-bold mb-4">Certificate for {name}</h2>
      {certificateData ? (
        <>
          <img src={certificateData} alt="Certificate" className="max-w-full max-h-full mb-4" />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
            onClick={downloadCertificate}
          >
            Download Certificate
          </button>
        </>
      ) : (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
          onClick={generateCertificate}
        >
          Generate Certificate
        </button>
      )}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default CertificateGenerator;
