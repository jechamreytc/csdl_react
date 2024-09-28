import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminDashboard from './admin/AdminDashboard';

import { Toaster } from 'sonner';

import secureLocalStorage from 'react-secure-storage';
// import AddDepartment from './components/AddDepartment';
// import AddSchoolYear from './components/AddSchoolYear';
// import AddCourse from './components/AddCourse';
// import AddScholarshipType from './components/AddScholarshipType';
import AddOfficeMaster from './components/AddOfficeMaster';
import AddSupervisor from './components/AddSupervisor';
import AddScholar from './components/AddScholar';
import AddAdministrator from './components/AddAdmin';

// import AddScholarshipSubType from './components/AddScholarshipSubType';




function App() {
  if (secureLocalStorage.getItem("url") !== "http://localhost/csdl/") {
    secureLocalStorage.setItem("url", "http://localhost/csdl/");
  }
  return (

    <>
      <Toaster richColors position="top-right" duration={1500} />
      <Router>
        {/* <AddScholar />
      <AddOfficeMaster /> */}
        <Routes>

          <Route path="/" element={<AdminDashboard />} />

          {/* <Route path="/addAdministrator" element={<AddAdministrator />} /> */}
          {/* <Route path="/add-department" element={<AddDepartment />} /> */}
          {/* <Route path="/add-school-year" element={<AddSchoolYear />} /> */}
          {/* <Route path="/add-course" element={<AddCourse />} /> */}
          {/* <Route path="/add-scholarship-type" element={<AddScholarshipType />} /> */}
          <Route path="/addOfficeMaster" element={<AddOfficeMaster />} />
          <Route path="/addSupervisor" element={<AddSupervisor />} />
          {/* <Route path="/add-scholarship-sub-type" element={<AddScholarshipSubType />} /> */}
          <Route path="/AddScholar" element={<AddScholar />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
