import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";
import jwtDecode from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    const decode = auth?.tokens?.accessToken ? jwtDecode(auth.tokens.accessToken ) : undefined

    let roles = decode?.role || [] 
       
    if (typeof roles === "string"){       
        roles = [];
        roles.push(decode?.role)
    }
 
    return (
        
         roles?.find(role => allowedRoles?.includes(role))
             ? <Outlet />          
             : auth?.tokens?.accessToken //changed from user to accessToken to persist login after refresh
                 ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                 : <Navigate to="auth/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;