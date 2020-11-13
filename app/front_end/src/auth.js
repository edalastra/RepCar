import api from './api';

export const TOKEN_KEY = localStorage;
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
    api.defaults.headers.Authorization = `Bearer ${token}`
};
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};
