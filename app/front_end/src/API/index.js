import axios from 'axios';

const API = 'http://localhost:5000';

export const requests = {
    get: async (endpoint, header={}) => 
        await axios.get(API + endpoint, {
            headers: { 'Content-Type': 'application/json', ...header }}),
    
    post: async (endpoint, data={}, header={}) => 
        await axios.post(API + endpoint, data, {
            headers: { 'Content-Type': 'application/json', ...header }}),
}