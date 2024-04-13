import React, { useState,useEffect } from "react";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";
import StudentEdit from "../components/StudentEdit";
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';
import TeacherForm from "../components/TeacherForm";
import TeacherList from "../components/TeacherList";
// import StudentCertificate from "../components/StudentCertificate";

const DashboardComponent = () => {
  const [isStudentFormOpen, setStudentFormOpen] = useState(false);
  const [isStudentListOpen, setStudentListOpen] = useState(false);
  const [isStudentEditOpen, setStudentEditOpen] = useState(false);
  const [editStudentData, setEditStudentData] = useState(null);
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeType, setNoticeType] = useState('');
  const [noticeSubject, setNoticeSubject] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showManageNotices, setShowManageNotices] = useState(false);
  const [selectedNoticeId, setSelectedNoticeId] = useState(null);
  const [isTeacherFormOpen, setTeacherFormOpen] = useState(false);
  const [isTeacherListOpen, setTeacherListOpen] = useState(false);
  // const [showLeavingCertificate, setShowLeavingCertificate] = useState(false);
  const [notices, setNotices] = useState([]);
  const history = useNavigate();

  const handleAddStudentClick = () => {
    setStudentFormOpen(true);
  };

  const handleCloseStudentForm = () => {
    setStudentFormOpen(false);
  };

  const handleDisplayStudentsClick = () => {
    setStudentListOpen(true);
  };

  const handleCloseStudentList = () => {
    setStudentListOpen(false);
  };

  const handleEditStudentClick = () => { 
    setStudentEditOpen(true);
  };

  const handleCloseStudentEdit = () => {
    setStudentEditOpen(false);
    setEditStudentData(null);
  };

  const handleDisplayTeachersClick = () => {
    setTeacherListOpen(true);
  };

  // const toggleLeavingCertificateModal = () => {
  //   setShowLeavingCertificate(!showLeavingCertificate);
  // };

  const handleLogOutClick = () => {
    history('/Login');
  };

  const handleManageNoticesClick = () => {
    setShowManageNotices(true);
  };

  const handleEditNotice = (id) => {
    setSelectedNoticeId(id);
    const noticeToUpdate = notices.find(notice => notice.id === id);
    if (noticeToUpdate) {
      setNoticeType(noticeToUpdate.type);
      setNoticeSubject(noticeToUpdate.subject);
      setNoticeContent(noticeToUpdate.content);
    }
  };

  const handleUpdateNotice = async () => {
    try {
      await db.collection("notices").doc(selectedNoticeId).update({
        type: noticeType,
        subject: noticeSubject,
        content: noticeContent,
      });
  
      setSelectedNoticeId(null);
      setNoticeType('');
      setNoticeSubject('');
      setNoticeContent('');
    } catch (error) {
      console.error("Error updating notice in Firestore:", error);
    }
  };
  

  const handleDeleteNotice = async (id) => {
    try {
      await db.collection("notices").doc(id).delete();
      setNotices(notices.filter(notice => notice.id !== id));
    } catch (error) {
      console.error("Error deleting notice from Firestore:", error);
    }
  };

  const handleNoticeSubmit = async () => {
    try {
      await db.collection("notices").add({
        type: noticeType,
        subject: noticeSubject,
        content: noticeContent,
      });

      setNoticeContent('');
      setNoticeType('');
      setNoticeSubject('');
      setShowDropdown(false);
    } catch (error) {
      console.error("Error adding notice to Firestore:", error);
    }
  };

  const handleCancel = () => {
    setNoticeContent('');
    setNoticeType('');
    setNoticeSubject('');
    setShowDropdown(false);
  };

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const snapshot = await db.collection("notices").get();
        const fetchedNotices = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNotices(fetchedNotices);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices();
  }, []);


  return (
    <div className="mx-auto h-screen overflow-auto bg-gray-800 flex flex-col text-lg">
      <div className="h-1/10 bg-gray-900 text-white flex items-center justify-between p-4">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
          onClick={handleLogOutClick}
        >
          Log Out
        </button>
      </div>
      <div className="flex flex-row h-9/10">
        <div className="bg-gray-900 h-full text-white w-1/5 p-4 flex flex-col space-y-4 font-semibold">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={handleAddStudentClick}
          >
            Add Student
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={handleDisplayStudentsClick}
          >
            View Students
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={handleEditStudentClick} 
          >
            Edit Student
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() => setShowDropdown(true)}
          >
            Important Notices
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={handleManageNoticesClick}
          >
            Manage Notices
          </button>
          <button 
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() => setTeacherFormOpen(true)}
          >
            Add Teacher
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={handleDisplayTeachersClick}
          >
            Manage Teachers
          </button>
          {/* <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() => setShowLeavingCertificate(true)} // Trigger leaving certificate modal
          >
            Leaving Certificates
          </button> */}
        </div>
        <div className="w-4/5 p-4 h-full">
          {isStudentFormOpen && <StudentForm onClose={handleCloseStudentForm} />}
          {isStudentListOpen && <StudentList onClose={handleCloseStudentList} onEdit={handleEditStudentClick} />}
          {isStudentEditOpen && (
            <StudentEdit
              studentData={editStudentData} 
              onClose={handleCloseStudentEdit}
            />
          )}
          {showDropdown && (
            <div className="dropdown bg-gray-900 p-4 rounded shadow-md mt-2">
              <div className="space-x-2 flex flex-row">
                <div className="flex flex-col h-full w-1/5 space-x-2">
                  <select
                    value={noticeType}
                    onChange={(e) => setNoticeType(e.target.value)}
                    className="w-full h-12 px-4 py-2 rounded-md border border-gray-300 text-white bg-gray-800">
                    <option value="" disabled>Notice Type</option>
                    <option value="Text">TextMessage</option>
                    <option value="Image">Image</option>
                    <option value="Link">Link</option>
                  </select>
                  <div className="flex flex-row space-x-2 justify-space-between">
                    <button
                      className="flex items-center mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 w-full"
                      onClick={handleNoticeSubmit}
                    >
                      Add Notice
                    </button>
                    <button
                      className="flex items-center mt-4 bg-red-500 text-white text-center py-2 px-4 rounded hover:bg-red-700 w-full"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                <div className="flex flex-col h-full w-4/5">
                  <textarea
                    value={noticeSubject}
                    onChange={(e) => setNoticeSubject(e.target.value)}
                    className="placeholder-white text-white w-full h-12 px-4 py-2 mb-4 rounded-md border border-gray-300 bg-gray-800"
                    placeholder="Notice Subject" />
                  <textarea
                    value={noticeContent}
                    onChange={(e) => setNoticeContent(e.target.value)}
                    className="placeholder-white text-white w-full px-4 py-2 mb-4 rounded-md border border-gray-300 bg-gray-800"
                    placeholder="Notice Content" />
                </div>
              </div>
            </div>
              )}
              {showManageNotices && (
                <div className="w-full overflow-x-auto">
                  <h2 className="text-white text-xl font-semibold mb-4">Manage Notices</h2>
                  <table className="min-w-full divide-y divide-gray-200 bg-gray-800">
                  <thead className="bg-gray-900">
                    <tr className="text-white">
                      <th className="px-6 py-3 font-bold">Type</th>
                      <th className="px-6 py-3 font-bold">Subject</th>
                      <th className="px-6 py-3 font-bold">Content</th>
                      <th className="px-6 py-3 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-white">
                    {notices.map((notice, index) => (
                      <tr key={index} className="bg-gray-900">
                        <td className="px-6 py-4">
                          {selectedNoticeId === notice.id ? (
                            <select
                              value={noticeType}
                              onChange={(e) => setNoticeType(e.target.value)}
                              placeholder="Type"
                              className="px-3 py-1 rounded border bg-gray-800 border-gray-300 focus:outline-none"
                            >
                              <option value="Text">TextMessage</option>
                              <option value="Image">Image</option>
                              <option value="Link">Link</option>
                            </select>
                          ) : (
                            <div>{notice.type}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {selectedNoticeId === notice.id ? (
                            <input
                              type="text"
                              value={noticeSubject}
                              onChange={(e) => setNoticeSubject(e.target.value)}
                              placeholder="Subject"
                              className="px-3 py-1 rounded border bg-gray-800 border-gray-300 focus:outline-none"
                            />
                          ) : (
                            <div>{notice.subject}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {selectedNoticeId === notice.id ? (
                            <textarea
                              value={noticeContent}
                              onChange={(e) => setNoticeContent(e.target.value)}
                              className="placeholder-white text-white w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-800 focus:outline-none"
                              placeholder="Content"
                            />
                          ) : (
                            <div>{notice.content}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {selectedNoticeId === notice.id ? (
                            <div className="flex space-x-2">
                              <button onClick={handleUpdateNotice} className="w-24 px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none">
                                Submit
                              </button>
                              <button onClick={() => setSelectedNoticeId(null)} className="w-24 px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none">
                                Close
                              </button>
                            </div>
                          ) : (
                            <div className="flex space-x-2">
                              <button className="w-24 px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none" onClick={() => handleEditNotice(notice.id)}>
                                Edit
                              </button>
                              <button className="w-24 px-4 py-2 mt-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none" onClick={() => handleDeleteNotice(notice.id)}>
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              )}
              {isTeacherFormOpen && ( 
                <TeacherForm onClose={() => setTeacherFormOpen(false)} />
              )}
              {isTeacherListOpen && (
                <TeacherList onClose={() => setTeacherListOpen(false)} />
              )}
              {/* {showLeavingCertificate && ( 
                <StudentCertificate onClose={toggleLeavingCertificateModal} />
              )} */}
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
