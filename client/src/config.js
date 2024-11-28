import * as dotenv from 'dotenv';
dotenv.config({path: '../client/.env'}); 
// export const API_URL = 'http://localhost:3000';
//export const API_URL = 'https://faceplate-server.onrender.com';
export const API_URL = import.meta.env.VITE_API_URL || 'https://faceplate-server.onrender.com';
//export const API_URL = process.env.REACT_APP_API_URL || 'https://faceplate-server.onrender.com';
