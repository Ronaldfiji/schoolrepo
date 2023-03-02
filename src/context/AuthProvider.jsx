import { createContext,  useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [userInfo, setUserInfo] = useState({});
   
    // const {auth,setAuth} = useAuth();
    return (
        <AuthContext.Provider value={{ auth, setAuth,
        userInfo, setUserInfo }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;
// useEffect(() => {
//     (async () => {
//         try {
//             console.log('AuthProvider - Setting auth state from local storage, auth state is null on reload => '+JSON.stringify(auth));
//             var tokens = JSON.parse(localStorage.getItem("tokens"));
//             var user = JSON.parse(localStorage.getItem("user"));
//             if (tokens != null && tokens != undefined && user != null && user != undefined) {
//                 console.log('Adding token from local storeage');
//                 setAuth(() => ({
//                     ...auth,
//                     tokens: tokens, user: user,
//                 }));
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     })();

// }, [])