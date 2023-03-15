import axios from "axios";

const baseUrl = `https://localhost/api/user`;

// export default axios.create({
//     baseURL: baseUrl
// });


export const axiosPrivateTest = axios.create({
    baseURL: baseUrl,
    headers: { 'Content-Type': 'application/json' },
    //withCredentials: true,
    timeout: 5000,


});