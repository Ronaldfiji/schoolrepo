//import axios from "axios";
import axios from '../hook/axios';

//import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Settings, {ApiUrlProd } from "../../shared/config/Settings"

const [ApiUrlStaging] = Settings();

 class UserService{

    //static baseUrl = `${ApiUrlStaging()}/user`;

    static CreateUser(User){       
        //let dataUrl = `${this.baseUrl}/create`;
        let dataUrl = `/user/create`;
        return axios.post(dataUrl, User);
    }

    static LoginUser(User){
        //let dataUrl = `${this.baseUrl}/login`;
        let dataUrl = `/user/login`;
        return axios.post(dataUrl, User, {
            headers: { 'Content-Type': 'application/json' },            
            withCredentials: true
        });
    }

    static UserTypes(){       
        //let dataUrl = `${this.baseUrl}/create`;
        let dataUrl = `/UserTypes/GetUserTypes`;
        return axios.get(dataUrl);
    }

    static GetUserXX(id, accessToken){
        let Req = axios.create({
             baseURL: this.baseUrl,
            //headers: { 'Content-Type': 'application/json' },
            //withCredentials: true,
            crossorigin: true,  
            headers: {'Authorization': 'Bearer '+accessToken},
            timeout: 1000,
        });

        let dataUrl =`/get/${id}`
        return Req.get(dataUrl);
    }
}


export default UserService;


//    async GetUserV2(id){
//         const axiosPrivate = useAxiosPrivate();
//         let dataUrl =`/get/${id}`
//         return await axiosPrivate.get(dataUrl);

//     }

  

//     import axios from 'axios';
// axios.defaults.baseURL = 'http://localhost:1010/'
// axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
// export default axios;