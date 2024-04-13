import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import CertificateGenerator from './CertificateGenerator';

const StudentCertificate = ({ onClose }) => {
  const [students, setStudents] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        let query = db.collection('Student');

        if (selectedDivision !== '') {
          query = query.where('Division', '==', selectedDivision);
        }
        query = query.where('Standard', '==', '10');
        const snapshot = await query.get();
        const studentData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudents(studentData);
      } catch (error) {
        console.error('Error fetching students: ', error);
      }
    };
    fetchStudents();
  }, [selectedDivision]);

  const generateCertificate = async (name, division) => {
    try {
      console.log('Generating certificate...');
      const student = students.find(student => student.Name === name && student.Division === division);
      setSelectedStudent(student);
    } catch (error) {
      console.error('Error generating certificate: ', error);
    }
  };

  return (
    <div className="w-full h-full bg-gray-800">
      <div className="flex flex-row items-center">
        <h1 className="text-2xl font-bold m-4 float-left text-white">Student List</h1>
        <div className="flex space-x-4">
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-300"
          >
            <option value="">Select Division</option>
            <option value="A">Division A</option>
            <option value="B">Division B</option>
            <option value="C">Division C</option>
          </select>
          <button
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
      <table className="w-full border-collapse border border-gray-300 bg-gray-800">
        <thead>
          <tr className="bg-gray-900 text-white">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Standard</th>
            <th className="p-2">Division</th>
            <th className="p-2">RollNo</th>
            <th className="p-2">Gender</th>
            <th className="p-2">BirthDate</th>
            <th className="p-2">Category</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border border-gray-300 text-white">
              <td className="p-2 text-center">{student.ID}</td>
              <td className="p-2 text-center">{student.Name}</td>
              <td className="p-2 text-center">{student.Standard}</td>
              <td className="p-2 text-center">{student.Division}</td>
              <td className="p-2 text-center">{student.RollNo}</td>
              <td className="p-2 text-center">{student.Gender}</td>
              <td className="p-2 text-center">{student.BirthDate}</td>
              <td className="p-2 text-center">{student.Category}</td>
              <td className="p-2 text-center">
                <button
                  className="bg-blue-500 text-white px-4 rounded hover:bg-blue-700 mr-2"
                  onClick={() => generateCertificate(student.Name, student.Division)}
                >
                  Generate Certificate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedStudent && (
        <CertificateGenerator
          name={selectedStudent.Name}
          division={selectedStudent.Division}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
};

export default StudentCertificate;
