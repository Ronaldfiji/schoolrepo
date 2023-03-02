import { useContext, useDebugValue,  } from "react";
import AuthContext from "../../context/AuthProvider";
//import AuthProvider  from "../../../context/AuthProvider";

const useAuth = () => {
    const { auth } = useContext(AuthContext);
    //const { setAuth } = useContext(AuthProvider);
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out") // this is to log details in react dev tool.
    return useContext(AuthContext);
}


// const useAuth = () => {
//     return useContext(AuthContext);
// }

export default useAuth;


// console.log('useAuth firing in useAuth function ! ');
// useEffect(() => {
//     console.log('Use effect fired in useAuth State hook to get local storage data' + JSON.stringify( auth));
//     if (Object.keys(auth).length == 0 || auth == undefined) {
//             console.log('auth is undefined  .. ..');
//             const tokens = JSON.parse(localStorage.getItem('tokens'));
//             const user = JSON.parse(localStorage.getItem('user'));
//             setAuth(tokens, user);
          
            
//     }
// }, [])