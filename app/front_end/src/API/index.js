import axios from 'axios';
import { getToken, isAuthenticated, getTokenWorker } from '../auth';


export default axios.create({
  baseURL: 'http://localhost:5000',
  headers: {authorization: getToken()}
});

export const apiworker = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {authorization: getTokenWorker()}
});