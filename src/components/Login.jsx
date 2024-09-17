import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = '';
    if (!username.trim()) formErrors = 'Username is required';
    if (!password.trim()) formErrors = 'Password is required';

    if (password.length < 6) formErrors = 'Password must be at least 6 characters long';

    setError(formErrors);
    return formErrors === '';
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    

    if (validateForm()) {
      try{
        const response=await axios.post("http://localhost:3000/login",{f_userName:username,f_password:password});
        if(response.status===200){
          localStorage.setItem('username', username);
          navigate('/dashboard');
        }
        else{
          console.log("invalid login");
        }
      }catch(err){
        console.error("axios error",err);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
