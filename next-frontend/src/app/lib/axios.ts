import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:10000', 
  withCredentials: true,

});

export default api;