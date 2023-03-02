import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

let useValidation =  () => {
    const { auth } = useAuth();
    const location = useLocation();
     let IsUserLoggedIn = () =>{      
        try {             
            return (            
                auth?.tokens?.accessToken ?  
                <Outlet /> :
                <Navigate to="/unauthorized" state={{ from: location }} replace />
            );    
        } catch (err) {
            console.log("ReqiureValidation hook - Failed to verify logged in user :" + err);
        }
     }
     return [IsUserLoggedIn];

}

export default useValidation;