import axios from 'axios';
import { getToken } from '../auth';


export default axios.create({
  baseURL: 'http://localhost:5000',
  headers: {authorization: getToken('TOKEN_KEY')}
});

export const apiworker = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {authorization: getToken('WORKER_KEY')}
});