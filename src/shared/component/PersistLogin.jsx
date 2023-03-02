import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import useRefreshToken from '../hook/useRefreshToken';
import useAuth from '../hook/useAuth';


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const [sleepTime] = useState(500);
    const location = useLocation();

    useEffect(() => {
        console.log("Persist login fired .............................");
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await littleSleep(sleepTime);
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }
        // persist added here AFTER tutorial video
        // Avoids unwanted call to verifyRefreshToken
        auth?.token?.accessToken === undefined ? verifyRefreshToken() : setIsLoading(false);
        return () => isMounted = false;
    }, [])

    useEffect(() => {
        console.log(`IsLoading status is : ${isLoading}`)
        console.log(`Access Token is : ${JSON.stringify(auth?.token?.accessToken)}`)
    }, [isLoading])

    let littleSleep = async (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }

    return (
        <Fragment>
            {
                isLoading ? <p>Loading...</p>
                : 
                auth?.token?.accessToken ?                     
                        <Outlet />
                        :
                        <Navigate to="user/login" state={{ from: location }} replace />
            }
        </Fragment>
    )
}

export default PersistLogin