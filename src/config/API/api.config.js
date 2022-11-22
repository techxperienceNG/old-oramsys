//import API_LOCAL from './api-local';
import API_PROD from "./api-prod"
// import API_LOCAL from "./api-local"
// const hostname = window.location.hostname
const port = window.location.port
// let isLocalApi = +port >= 5000

export const API = API_PROD
// console.log("API", API, hostname, isLocalApi);
