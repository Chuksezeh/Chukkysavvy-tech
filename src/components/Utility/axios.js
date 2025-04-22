import axios from 'axios';

const baseURLChukkytech = "http://localhost:5001/";


const chukkytechAxios = axios.create({
  baseURL: baseURLChukkytech
});





export { chukkytechAxios };
