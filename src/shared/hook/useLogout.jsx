
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useLogout = () => {
    const { setAuth, userInfo, setUserInfo } = useAuth();
    
    const axiosPrivate = useAxiosPrivate();
    
    const logout = async () => {        
        const controller = new AbortController();
        try {
             // `${baseUrl}/logout/${userInfo.Id
            let response = await axiosPrivate.get(`/user/logout/${userInfo.Id}`, {
                signal: controller.signal
            });
               console.log("Logging out status :"+ JSON.stringify(response.status));
             if (response?.status===204) {                             
                setAuth({});
                setUserInfo({});
             }
             return response;                    
        } catch (err) {            
            console.error('Failed to logout user: ' + err);
            throw Error('Failed to logout. Contact systems admin !' + err);
        }
        return () => {            
            controller.abort();
        }
    }

    return logout;
}

export default useLogout