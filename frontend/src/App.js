import "./output.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from "react";
import LoginComponent from "./routes/Login";
import HomeComponent from "./routes/Home";
import AboutUsComponent from "./routes/AboutUs";
import AcademicsComponent from "./routes/Academics";
import ActivitiesComponent from "./routes/Activities";
import AdmissionComponent from "./routes/Admission";
import DashboardComponent from "./routes/Dashboard";
import { NoticeProvider } from './components/NoticeContext';// Assuming you have an AuthContext for managing authentication

function App() { 

  return (
    <div className="App h-screen font-poppins text-base">
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<NoticeProvider><HomeComponent /></NoticeProvider>} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/AboutUs" element={<AboutUsComponent />} />
          <Route path="/Academics" element={<AcademicsComponent />} />
          <Route path="/Activities" element={<ActivitiesComponent />} />
          <Route path="/Admission" element={<AdmissionComponent />} />
          <Route path="/Dashboard" element={<NoticeProvider><DashboardComponent /></NoticeProvider>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
