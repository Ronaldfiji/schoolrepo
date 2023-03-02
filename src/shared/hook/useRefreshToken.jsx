//import axios from 'axios';
import  axios  from "./axios";
import useAuth from './useAuth';
import jwtDecode from "jwt-decode";

const useRefreshToken = () => {
    const { auth, setAuth , setUserInfo} = useAuth();

   

    const refresh = async () => {

        try {          

            //if (auth?.token?.accessToken != null ) {
                  
                //refreshTokenRequest = { "accessToken": auth?.tokens?.accessToken, "refreshToken": auth?.tokens?.refreshToken, };                
                //const response = await axios.post('https://localhost/api/User/RefreshToken', refreshTokenRequest);
                const response = await axios.get('/User/RefreshToken', {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' },
                });
               
                setAuth(prev => {
                    console.log("OLD token : " + JSON.stringify(prev));
                    console.log("New token : " + JSON.stringify(response.data));
                    return {
                        ...prev,
                        //roles: response.data.roles,
                        //accessToken: response.data.accessToken,
                        token: response.data,
                    }
                });
                var decodedToken = response?.data?.accessToken ? jwtDecode(response?.data?.accessToken) : undefined
                setUserInfo(decodedToken);
                
                return response.data;
            //}
        }
        catch (err) {
            return err;
        }
    }
    return refresh;
};

export default useRefreshToken;
