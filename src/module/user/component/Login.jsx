
import React, { Fragment, useState, useRef, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Spinner from "../../../shared/component/Spinner";
import UserService from "../../../shared/service/UserService";
import useAuth from "../../../shared/hook/useAuth";
import {ToastContainer,  toast } from 'react-toastify';
import jwtDecode from "jwt-decode";

const Login = () => {

    const { setAuth, userInfo, setUserInfo } = useAuth();
    const navigate = useNavigate();
    const emailRef = useRef();
    const errRef = useRef();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [IsLoading, setIsLoading] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    let [User, setUser] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    // let ShowToast = () => {
    //     toast.success('Logged In');
    // }

    let loginUser = async (event) => {
        event.preventDefault();
        setErrMsg('');
        try {
            setIsLoading(true);
            let response = await UserService.LoginUser(User);

            if (response) {
                let token = { token: response?.data }
                setAuth(token);
                var decodedToken = response?.data?.accessToken ? jwtDecode(response?.data?.accessToken) : undefined
                setUserInfo(decodedToken);
                setErrMsg('');
                setUser('');
                toast.success('Logged in successfully', { position: toast.POSITION.TOP_CENTER, autoClose: 3000, });
                //navigate(from, { replace: true });
                navigate("/user/profile", { replace: true });
            }

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response' + err);
            } else if (err.response?.status === 400) {
                setErrMsg('Missing email or Password');
            } else if (err.response?.status === 404) {
                setErrMsg('Invalid email or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <Fragment>

            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                {(!errMsg && IsLoading) ? <Spinner /> : ''}
                <div className="container   ">
                    <div className="row align-items-center vh-80 " >
                        <div className="mx-auto">
                            <div className="jumbotron d-flex justify-content-center  ">
                                <div className="card">
                                    <div className="card-header">
                                        Login
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={loginUser} >
                                            <div className="row g-3">
                                                <div className="form-group  ">
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                    <input type="email"
                                                        required
                                                        autoComplete="off"
                                                        ref={emailRef}
                                                        onChange={(e) => setUser({ ...User, email: e.target.value })}
                                                        className="form-control form-control-sm" id="email" placeholder="Email" />
                                                </div>
                                                <div className="form-group ">
                                                    <label htmlFor="password" className="form-label">Password</label>
                                                    <input type="password"
                                                        required
                                                        autoComplete="off"
                                                        onChange={(e) => setUser({ ...User, password: e.target.value })}
                                                        className="form-control form-control-sm" id="password" placeholder="Password" />
                                                </div>
                                                <div className="text-end ">
                                                    <span className="line me-5 "><Link to="/user/signup">Sign Up</Link></span>
                                                    <button type="submit" className="btn btn-outline-primary btn-sm me-2">Login</button>
                                                    <Link to={"/"} className="btn btn-outline-warning btn-sm">Cancel</Link>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
            <ToastContainer position={"top-right"} pouseOnHover={true} draggable={true} theme="colored"/>
            </section>

            {/* <section>
                <button className="btn btn-primary form-control" onClick={ShowToast}>Toast Messg</button>
                <ToastContainer />
            </section> */}
            {/* <div className="d-flex justify-content-center  aligns-items-center vh-100">
                <div>
                    <div className="card  m-1 mb-5">
                        <h4 className="card-header">Login</h4>
                        <div className="card-body">
                            <form >
                                <div className="row g-3">
                                    <div className="form-group  ">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control form-control-sm" id="email" placeholder="Email" />
                                    </div>
                                    <div className="form-group ">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control form-control-sm" id="password" placeholder="Password" />
                                    </div>
                                    <div className="text-end">
                                        <button type="button" className="btn btn-outline-primary btn-sm me-2">Login</button>
                                        <button type="button" className="btn btn-outline-warning btn-sm">Cancel</button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div> */}
        </Fragment>
    )

}

export default Login