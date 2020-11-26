import api from './api';

export const TOKEN_KEY = localStorage;
export const WORKER_KEY = localStorage;

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const isWorker = () => localStorage.getItem(WORKER_KEY) !== null 
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getTokenWorker = () => localStorage.getItem(WORKER_KEY);

export const intranetLogin = token => {
    localStorage.setItem(WORKER_KEY, token);
}
export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};
