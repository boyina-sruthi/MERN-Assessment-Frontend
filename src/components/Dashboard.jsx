import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const redirectToCreateEmployee = () => {
    navigate('/create-employee');
  };
  const EmployeeList = ()=>{
    navigate('/employee-list');
  }
  const username=localStorage.getItem('username')

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to the dashboard!</p>
      <h3>{username}</h3>
      <button onClick={redirectToCreateEmployee} >Go to Create Employee</button>
      <button onClick={EmployeeList}>employeelist</button>
    </div>
  );
};

export default Dashboard;
