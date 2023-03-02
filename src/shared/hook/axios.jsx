import axios from "axios";
import Settings from "../config/Settings";

let [ApiUrlStaging] = Settings();

 export default axios.create({
     baseURL: ApiUrlStaging()
 });



export const axiosPrivate = axios.create({
   
    baseURL: ApiUrlStaging(),
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    timeout: 5000,
});


