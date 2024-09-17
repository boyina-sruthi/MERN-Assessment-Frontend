import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateEmployee from './components/CreateEmployee';
import EmployeeList from './components/EmployeeList';
import EmployeeEdit from './components/EmployeeEdit';
import DeleteEmployee from './components/DeleteEmployee';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/employee-list" element={<EmployeeList/>}/>
        <Route path="/employee-edit/:id" element={<EmployeeEdit/>}/>
        <Route path="/employee-delete/:id" element={<DeleteEmployee/>}/>
      </Routes>
    </Router>
  );
};

export default App;
