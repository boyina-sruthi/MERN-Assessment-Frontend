import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
  const CreateEmployee = ()=>{
    const [f_Name,setF_Name] = useState('');
    const [f_Email,setF_Email] = useState('');
    const [f_Course,setF_Course] = useState('');
    const [f_Designation,set_F_Designation] = useState('');
    const [f_Gender,setF_Gender] = useState('');
    const [f_Mobile,setF_Mobile] = useState('');
    const [errors, setErrors] = useState({});
    const navigate=useNavigate();

  const validateForm = () => {
    let formErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^[0-9]{10}$/;

    if (!f_Name.trim()) formErrors.name = 'Name is required';
    if (!f_Email.trim()) {
      formErrors.f_Email = 'Email is required';
    } else if (!emailPattern.test( f_Email)) {
      formErrors.f_Email = 'Invalid email format';
    }
    if (!f_Mobile.trim()) {
      formErrors.f_Mobile = 'Mobile number is required';
    } else if (!mobilePattern.test( f_Mobile)) {
      formErrors.f_Mobile = 'Mobile number must be 10 digits';
    }
    if (!f_Designation) formErrors.f_Designation = 'Please select a designation';
    if (!f_Gender) formErrors.f_Gender = 'Please select a gender';
    if (!f_Course) formErrors.f_Course = 'Please select at least one course';
    // if (! image) {
    //   formErrors.image = 'Please upload an image';
    // } else if (!['image/jpeg', 'image/png'].includes( image.type)) {
    //   formErrors.image = 'Only JPG and PNG files are allowed';
    // }
    console.log(formErrors);
    const arr=Object.keys(formErrors);
    if(arr.length!==0){
      return false;
    }
    return true;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("the error");
      try{
        console.log("hello");
        const employeeDetails ={f_Name,f_Email,f_Course,f_Designation,f_Gender,f_Mobile};
        console.log(employeeDetails);
        const response=await axios.post("http://localhost:3000/createEmployee",employeeDetails);
        console.log(response);
        if(response.status===201){
          navigate('/employee-list');
        }else{
          console.log("employee not created");
        }
      }catch(err){
        console.error("axios error",err);
      }
    }
  }
  
  return (
    <div>
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={ f_Name}
            onChange={(e) => setF_Name(e.target.value)}
            required
          />
          {errors.f_Name && <p style={{ color: 'red' }}>{errors.f_Name}</p>}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={ f_Email}
            onChange={(e) => setF_Email(e.target.value)}
            required
          />
          {errors.f_Email && <p style={{ color: 'red' }}>{errors.f_Email}</p>}
        </div>
        <div>
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={ f_Mobile}
            onChange={(e) => setF_Mobile(e.target.value)}
            required
          />
          {errors.f_Mobile && <p style={{ color: 'red' }}>{errors.f_Mobile}</p>}
        </div>
        <div>
          <select name="designation" value={ f_Designation} onChange={(e) => set_F_Designation(e.target.value)} required>
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
            name="gender"
            value="Male"
            checked={f_Gender === 'Male'}
            onChange={(e) => setF_Gender(e.target.value)}
            required
          /> Male
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={f_Gender === 'Female'}
            onChange={(e) => setF_Gender(e.target.value)}
            required
          /> Female
          {errors.f_Gender && <p style={{ color: 'red' }}>{errors.f_Gender}</p>}
        </div>
        <div>
          <label>Courses:</label>
          <select name="course" value={f_Course} onChange={(e) => setF_Course(e.target.value)}>
            <option value="course1">Course 1</option>
            <option value="course2">Course 2</option>
            <option value="course3">Course 3</option>
          </select>
          {errors.f_Course && <p style={{ color: 'red' }}>{errors.f_Course}</p>}
        </div>
        {/* <div>
          <input
            type="file"
            name="image"
            accept=".jpg,.png"
            onChange={handleFileChange}
          />
          {errors.image && <p style={{ color: 'red' }}>{errors.image}</p>}
        </div> */}
        <button type="submit">Create</button>
      </form>
    </div>
  );
  };


export default CreateEmployee;
