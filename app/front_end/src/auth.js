import api from './api';

export const isAuthenticated = () => localStorage.getItem('TOKEN_KEY') !== null;
export const isWorker = () => localStorage.getItem('WORKER_KEY') !== null 
export const getToken = key => localStorage.getItem(key);

export const intranetLogin =  token => {
     localStorage.setItem('WORKER_KEY', token);
}
export const login =  token => {
    localStorage.setItem('TOKEN_KEY', token);
};
export const logout = () => {
    localStorage.removeItem('TOKEN_KEY');
    localStorage.removeItem('WORKER_KEY');
};
