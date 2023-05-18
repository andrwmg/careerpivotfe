import axios from "axios";

const loc = window.location
axios.defaults.withCredentials = true
const token = localStorage.getItem('token')

const api = axios.create({
  // baseURL: 'https://teslamartv2.herokuapp.com/data',
  baseURL: `${loc.protocol}//${loc.hostname}${loc.hostname === 'localhost' ? ':7070/data' : '/data'}`,

  // headers: {  "Access-Control-Allow-Origin": "https://teslamartv2.herokuapp.com"}
  headers: { "Access-Control-Allow-Origin": "http://localhost:7071", "Authorization": localStorage.getItem('token') }

});

api.interceptors.response.use(
  response => {
    // Successful responses
    return response;
  },
  error => {
    // Handle error responses
    if (error.response && error.response.status === 401) {
      window.location.replace('/logout')
      // Handle unauthorized access, e.g., redirect to login
      // } else if (error.response && error.response.status === 404) {
      //   // Handle not found errors
      // } else {
      //   // Handle other error cases
    }
    return Promise.reject(error);
  }
);

export default api