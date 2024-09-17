import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  // Your backend URL

export const login = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials)
    .then(response => response.data);
};

export const createEmployee = (formData) => {
  return axios.post(`${API_URL}/employees`, formData)
    .then(response => response.data);
};

// Add more API services for fetching, updating, and deleting employees
