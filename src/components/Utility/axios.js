import axios from 'axios';

const baseURLChukkytech = "http://localhost:5000/";


const chukkytechAxios = axios.create({
  baseURL: baseURLChukkytech
});





export { chukkytechAxios };
