import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hook/useAuth";
//import jwtDecode from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => {
    const { auth, userInfo } = useAuth();
    const location = useLocation();

    //const decode = auth?.tokens?.accessToken ? jwtDecode(auth.tokens.accessToken ) : undefined

    let roles = userInfo?.role || [] 
       
    if (typeof roles === "string"){       
        roles = [];
        roles.push(userInfo?.role)
    }
 
    return (
        
         roles?.find(role => allowedRoles?.includes(role))
             ? <Outlet />          
             : auth?.token?.accessToken //changed from user to accessToken to persist login after refresh
                 ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                 : <Navigate to="user/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;

