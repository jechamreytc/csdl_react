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
import ScholarList from './dashboard/ScholarList';
import Login from './login/login';
import MainDashboard from './dashboard/MainDashboard';
import Qrcode from './Qrcode/qrcode';
import AddBatchScholar from './modal/AddBatchScholar';
import AssignStudent from './dashboard/AssignStudent';
import Account from './dashboard/Account';
import GetAdminList from './modal/GetAdminList';
import GetDepartment from './modal/GetDepartment';
import AddAdministrator from './components/AddAdmin';
import GetOfficeMaster from './modal/GetOfficeMaster';
import GetBuilding from './modal/GetBuilding';
import Batch from './dashboard/Batch';


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

          <Route path="/" element={<Login />} />

          <Route path="/addAdministrator" element={<AddAdministrator />} />
          {/* <Route path="/add-department" element={<AddDepartment />} /> */}
          {/* <Route path="/add-school-year" element={<AddSchoolYear />} /> */}
          {/* <Route path="/add-course" element={<AddCourse />} /> */}
          {/* <Route path="/add-scholarship-type" element={<AddScholarshipType />} /> */}
          <Route path="/OfficeMaster" element={<AddOfficeMaster />} />
          <Route path="/addSupervisor" element={<AddSupervisor />} />
          {/* <Route path="/add-scholarship-sub-type" element={<AddScholarshipSubType />} /> */}
          <Route path="/AddScholar" element={<AddScholar />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/ScholarList" element={<ScholarList />} />
          <Route path='/qrcode' element={<Qrcode />} />
          <Route path="/MainDashboard" element={<MainDashboard />} />
          <Route path="/AddBatchScholar" element={<AddBatchScholar />} />
          <Route path="/AssignStudent" element={<AssignStudent />} />
          <Route path="/Account" element={<Account />} />
          <Route path='/adminlist' element={<GetAdminList />} />
          <Route path="/DepartmentList" element={<GetDepartment />} />
          <Route path="/OfficeMasterList" element={<GetOfficeMaster />} />
          <Route path="/BuildingList" element={<GetBuilding />} />
          <Route path="/Batch" element={<Batch />} />


        </Routes>
      </Router>


    </>
  );
}

export default App;
