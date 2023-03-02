import axios from "axios";

const baseUrl = `https://localhost/api/user`;

// export default axios.create({
//     baseURL: baseUrl
// });


export const axiosPrivate = axios.create({
    baseURL: baseUrl,
    headers: { 'Content-Type': 'application/json' },
    //withCredentials: true,
    timeout: 5000,


});