import axios from 'axios';
import { getToken, isAuthenticated } from '../auth';


export default axios.create({
  baseURL: 'http://localhost:5000',
  headers: {authorization: getToken()}
});