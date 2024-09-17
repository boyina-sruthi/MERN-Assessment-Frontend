import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        console.log("axioscalls");
        const response = await axios.get('http://localhost:3000/employees');
        if(response.status===404){
          console.log("No employee found");
        }
        setEmployees(response.data);
        setFilteredEmployees(response.data); 
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);


  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
    const searchValue = e.target.value.toLowerCase();
    const filtered = employees.filter(employee => 
      employee.name.toLowerCase().includes(searchValue) ||
      employee.email.toLowerCase().includes(searchValue) ||
      employee.mobile.includes(searchValue)
    );
    setFilteredEmployees(filtered);
  };
  const handleEdit = (id)=>{
    navigate(`/employee-edit/${id}`);
  }
  const handleDelete= (id)=>{
    navigate(`/employee-delete/${id}`);
  }

  return (
    <div>
      <h2>Employee List</h2>

      
      <div>
        <strong>Total Count: {filteredEmployees.length}</strong>
      </div>

      <div>
        <input
          type="text"
          placeholder="Enter Search Keyword"
          value={searchKeyword}
          onChange={handleSearch}
        />
      </div>

      <table cellSpacing={20} cellPadding={20} align='center'>
        <thead>
          <tr>
            <th>Unique Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee, index) => (
              <tr key={index}>
                <td>{employee._id}</td>
                <td><img src={employee.imageUrl} alt="employee" width="50" /></td>
                <td>{employee.f_Name}</td>
                <td>{employee.f_Email}</td>
                <td>{employee.f_Mobile}</td>
                <td>{employee.f_Designation}</td>
                <td>{employee.f_Gender}</td>
                <td>{employee.f_Course}</td>
                <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
                <td>
                <button onClick={() => handleEdit(employee._id)}>Edit</button>
                <button onClick={() => handleDelete(employee._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
