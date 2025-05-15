import axios from 'axios';

const baseURLChukkytech = process.env.REACT_APP_BASE_URL;


console.log("baseURLChukkytech", baseURLChukkytech)

const chukkytechAxios = axios.create({
  baseURL: baseURLChukkytech
});





export { chukkytechAxios };
