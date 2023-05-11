import axios from "axios";

const loc = window.location
axios.defaults.withCredentials = true
const token = localStorage.getItem('token')

export default axios.create({
  // baseURL: 'https://teslamartv2.herokuapp.com/data',
  baseURL: `${loc.protocol}//${loc.hostname}${loc.hostname === 'localhost' ? ':7070/data' : '/data'}`,

    // headers: {  "Access-Control-Allow-Origin": "https://teslamartv2.herokuapp.com"}
  headers: {"Access-Control-Allow-Origin": "http://localhost:7071", "Authorization": 'Bearer ' + token  }

});