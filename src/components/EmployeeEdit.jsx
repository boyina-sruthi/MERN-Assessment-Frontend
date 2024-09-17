import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const EmployeeEdit = () => {
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
        console.log(id);
        const response = await axios.get(`http://localhost:3000/employee/${id}`);
        const { f_Name, f_Email,f_Course, f_Designation, f_Gender, f_Mobile } = response.data;
        setEmployee(response.data);
      } catch (err) {
        console.error("Error fetching employee details", err);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const validateForm = () => {
    let formErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^[0-9]{10}$/;

    if (!employee.f_Name.trim()) formErrors.f_Name = 'Name is required';
    if (!employee.f_Email.trim()) {
      formErrors.f_Email = 'Email is required';
    } else if (!emailPattern.test(employee.f_Email)) {
      formErrors.f_Email = 'Invalid email format';
    }
    if (!employee.f_Mobile.trim()) {
      formErrors.f_Mobile = 'Mobile number is required';
    } else if (!mobilePattern.test(employee.f_Mobile)) {
      formErrors.f_Mobile = 'Mobile number must be 10 digits';
    }
    if (!employee.f_Designation) formErrors.f_Designation = 'Please select a designation';
    if (!employee.f_Gender) formErrors.f_Gender = 'Please select a gender';
    if (!employee.f_Course) formErrors.f_Course = 'Please select at least one course';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value }); // Update specific field in employee object
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // const updatedEmployeeDetails = { f_Name, f_Email, f_Course, f_Designation, f_Gender, f_Mobile };
        console.log("inside the validate");
        console.log(employee);
        const response = await axios.put(`http://localhost:3000/editEmployee/${id}`, employee);
        console.log(response);
        
        
        if (response.status === 200) {
          navigate('/employee-list');
        } else {
          console.log("Employee update failed");
        }
      } catch (err) {
        console.error("axios error", err);
      }
    }
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="f_Name" // Changed to a unified state key
            placeholder="Name"
            value={employee.f_Name || ''} // Handle controlled input to avoid warnings
            onChange={handleChange}
            required
          />
          {errors.f_Name && <p style={{ color: 'red' }}>{errors.f_Name}</p>}
        </div>
        <div>
          <input
            type="email"
            name="f_Email"
            placeholder="Email"
            value={employee.f_Email || ''} // Handle controlled input to avoid warnings
            onChange={handleChange}
            required
          />
          {errors.f_Email && <p style={{ color: 'red' }}>{errors.f_Email}</p>}
        </div>
        <div>
          <input
            type="text"
            name="f_Mobile"
            placeholder="Mobile"
            value={employee.f_Mobile || ''} // Handle controlled input to avoid warnings
            onChange={handleChange}
            required
          />
          {errors.f_Mobile && <p style={{ color: 'red' }}>{errors.f_Mobile}</p>}
        </div>
        <div>
          <select
            name="f_Designation" // Changed to a unified state key
            value={employee.f_Designation || ''} // Handle controlled select to avoid warnings
            onChange={handleChange}
            required
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          {errors.f_Designation && <p style={{ color: 'red' }}>{errors.f_Designation}</p>}
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="radio"
            name="f_Gender"
            value="Male"
            checked={employee.f_Gender === 'Male'} // Ensure radio is checked based on state
            onChange={handleChange}
            required
          /> Male
          <input
            type="radio"
            name="f_Gender"
            value="Female"
            checked={employee.f_Gender === 'Female'} // Ensure radio is checked based on state
            onChange={handleChange}
            required
          /> Female
          {errors.f_Gender && <p style={{ color: 'red' }}>{errors.f_Gender}</p>}
        </div>
        <div>
          <label>Courses:</label>
          <select
            name="f_Course" // Changed to a unified state key
            value={employee.f_Course || ''} // Handle controlled select to avoid warnings
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            <option value="course1">Course 1</option>
            <option value="course2">Course 2</option>
            <option value="course3">Course 3</option>
          </select>
          {errors.f_Course && <p style={{ color: 'red' }}>{errors.f_Course}</p>}
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EmployeeEdit;
