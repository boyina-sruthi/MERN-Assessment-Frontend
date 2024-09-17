import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteEmployee = () => {
  const [employee, setEmployee] = useState({
    f_Name: '',
    f_Email: '',
    f_Course: '',
    f_Designation: '',
    f_Gender: '',
    f_Mobile: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/employee/${id}`);
        setEmployee(response.data);
      } catch (err) {
        console.error('Error fetching employee details', err);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const handleDelete = async (confirm) => {
    if (confirm) {
      try {
        const response = await axios.delete(`http://localhost:3000/deleteEmployee/${id}`);
        console.log(response);
        if (response.status === 204) {
          alert('Employee deleted successfully!');
          navigate('/employee-list');
        } else {
          alert('Failed to delete employee.');
        }
      } catch (err) {
        console.error('Error deleting employee', err);
        alert('An error occurred while deleting the employee.');
      }
    } else {
      alert('Employee not deleted.');
    }
  };

  return (
    <div>
      <h2>Delete Employee</h2>
      <p>Are you sure you want to delete the employee {employee.f_Name}?</p>
      <button onClick={() => handleDelete(true)}>Yes</button>
      <button onClick={() => handleDelete(false)}>No</button>
    </div>
  );
};

export default DeleteEmployee;
