import React, { useRef, Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from '../../../shared/service/UserService'
import Spinner from "../../../shared/component/Spinner"
import {toast} from 'react-toastify'

let Registation = () => {

    let navigates = useNavigate();
    const [sleepTime, setsleepTime] = useState(1000);


    const fnameRef = useRef();
    const errRef = useRef();

    const PWD_REGEX1 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const PWD_REGEX = /^[a-z1-9]{3,10}$/; /* Allow 3 chars/ digit , number or letter */

    let [countrylist, setcountrylist] = useState([]);
    let [userState, setUserState] = useState({

        User: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            dob: '',
            gender: '',
            addressLine1: '',
            addressLine2: '',
            country: '',
            city: '',
            state: '',
            postalCode: '',
            acceptTerms: '',   
            userTypeID: '',
            roles:[
                {
                id: 1,
                name : 'User',
                description:'User role',
                createdBy: 'By-User',
                updateBy:'By-User',

                }
            ],
            userPicturesToAddEditDto: [
                {
                    base64data: '',
                    contentType: '',
                    fileName: '',
                }]
        },
    });
    
    const[userTypes, setUserTypes] = useState({});

    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [IsSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fnameRef.current.focus();
        (async () => {
            try {
                let userTypeResponse = await UserService.UserTypes();
                if(userTypeResponse.status === 200){
                   setUserTypes(userTypeResponse.data);
                }
                let response = window.getCountries();
                if (response) {
                    setcountrylist(response);
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(userState.User.password));
        setValidMatch(userState.User.password === userState.User.confirmPassword);

    }, [userState.User.password, userState.User.confirmPassword])

    let UpdateInput = (event) => {
        setUserState((userState) => ({
            User: {
                ...userState.User,
                [event.target.name]: event.target.value
            }
        }));
    }

    let updateCheck = (event) => {
        setUserState((userState) => ({
            User: {
                ...userState.User,
                [event.target.name]: event.target.checked
            }
        }));
    };

    let SubmitUserCreate = async (event) => {
        event.preventDefault();        
        errRef.current.focus();
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        setErrMsg('');
        try {

            setIsSaving(true);
            let response = await UserService.CreateUser(userState.User);
            await littleSleep(sleepTime);
            if (response) {
                setIsSaving(false);
                setErrMsg('');
                toast.success('Sign-up successful !, Login now', { position: toast.POSITION.TOP_CENTER, autoClose: 3000, });
                navigates("/user/login", { replace: true });
            }

        } catch (err) {
            console.log(err);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('User with email exist, you may login !');
            } else if (err.response?.status === 400) {
                setErrMsg('Invalid data provided, review data values and re-submit !');
            } else {
                setErrMsg('Registration Failed')
            }

        }
    }

    let littleSleep = async (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }


    const UploadProfilePics = async e => {
        
        const base64 = await convertBase64(e.target.files[0]);
        const contenttype = String(e.target.files[0].type);
        const filename = String(e.target.files[0].name);     

        const base64Trimed = base64.replace('data:', '')
            .replace(/^.+,/, '');
        setUserState((userState) => ({
            User: {
                ...userState.User,
                userPicturesToAddEditDto: [{
                    base64data: base64Trimed,
                    contentType: contenttype,
                    fileName: filename
                }]
            }
        }));

    };

    const convertBase64 = file => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = error => {
                reject(error);
            };
        });
    };

    return (
        <Fragment>
            <section>
                <hr />    
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                {
                    (IsSaving && !errMsg) ? <Spinner /> : ""
                }             
                <form onSubmit={SubmitUserCreate}>
                    <div className="row g-3 ms-1 me-1">
                        <div className=" col-sm-4">
                            <label htmlFor="firstName" className="form-label">First name</label>
                            <input type="text"
                                ref={fnameRef}
                                required
                                autoComplete="off"
                                value={userState.User.firstName}
                                onChange={UpdateInput}
                                className="form-control form-control-sm" name="firstName" id="firstName" placeholder="First name" />
                        </div>
                        <div className=" col-sm-4">
                            <label htmlFor="lastName" className="form-label">Last name</label>
                            <input type="text"
                                required
                                value={userState.User.lastName}
                                onChange={UpdateInput}
                                className="form-control form-control-sm" id="lastName" name="lastName" placeholder="Last name" />
                        </div>
                        <div className=" col-sm-4">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email"
                                required
                                value={userState.User.email}
                                onChange={UpdateInput}
                                className="form-control form-control-sm" id="email" name="email" placeholder="Email" />
                        </div>

                        <div className=" col-sm-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password"
                                required
                                value={userState.User.password}
                                onChange={UpdateInput}
                                className="form-control form-control-sm" id="password" name="password" placeholder="Enter your password"
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />

                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <i className="fa fa-info-circle" aria-hidden="true"></i>
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>

                        </div>


                        <div className=" col-sm-4">
                            <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
                            <input type="password"
                                required
                                value={userState.User.confirmPassword}
                                onChange={UpdateInput}
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                                className="form-control form-control-sm" id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Enter confirm password" />

                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <i className="fa fa-info-circle pe-1" aria-hidden="true"></i>
                                Must match the first password input field.
                            </p>
                        </div>


                        <div className=" col-sm-4">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input type="number"
                                required
                                value={userState.User.phone}
                                onChange={UpdateInput}
                                className="form-control form-control-sm" id="phone" name="phone" placeholder="Phone" />
                        </div>
                        <div className=" col-sm-4">
                            <label htmlFor="dob" className="form-label">DOB</label>
                            <input type="date"
                                required
                                value={userState.User.dob}
                                onChange={UpdateInput}
                                name="dob"
                                className="form-control form-control-sm" id="dob" placeholder="DOB" />
                        </div>

                        <div className=" col-sm-4">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <select className="form-select form-select-sm" aria-label="select gender"
                                id="gender" name="gender" required
                                value={userState.User.gender}
                                onChange={(e) => (setUserState(() =>
                                ({
                                    User: {
                                        ...userState.User,
                                        gender: Number(e.target.value),
                                    }
                                })))}
                            >   <option value="">Select gender</option>
                                <option value={1}>Male</option>
                                <option value={2}>Female</option>
                                <option value={3}>Other</option>
                            </select>
                        </div>




                        <div className=" col-sm-4">
                            <label htmlFor="addressline1" className="form-label">Address Line 1</label>
                            <input type="text"                                
                                value={userState.User.addressLine1}
                                onChange={UpdateInput}
                                className="form-control form-control-sm" id="addressline1"
                                name="addressLine1"
                                placeholder="Enter address" />
                        </div>
                        <div className=" col-sm-4">
                            <label htmlFor="Addressline2" className="form-label">Address Line 2</label>
                            <input type="text"                               
                                value={userState.User.addressLine2}
                                onChange={UpdateInput}
                                className="form-control form-control-sm" id="Addressline2"
                                name="addressLine2"
                                placeholder="Enter your address" />
                        </div>

                        <div className=" col-sm-4">
                            <label htmlFor="country" className="form-label">Country</label>
                            <select className="form-select form-select-sm" aria-label="select country"
                                id="country"
                                name="country"
                                value={userState.User.country}
                                onChange={UpdateInput}
                            >
                                <option value="">Select country</option>
                                {
                                    countrylist.length > 0 &&
                                    countrylist.map(countryName => {
                                        return (
                                            <option key={countryName} value={countryName}> {countryName}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className=" col-sm-4">
                            <label htmlFor="city" className="form-label">City</label>
                            <input type="text"
                                required
                                value={userState.User.city}
                                onChange={UpdateInput}
                                name="city"
                                className="form-control form-control-sm" id="city" placeholder="City" />
                        </div>
                        <div className=" col-sm-4">
                            <label htmlFor="state" className="form-label">State</label>
                            <input type="text"
                                required
                                value={userState.User.state}
                                onChange={UpdateInput}
                                name="state"
                                className="form-control form-control-sm" id="state" placeholder="Enter your state" />
                        </div>

                        <div className=" col-sm-4">
                            <label htmlFor="PostCode" className="form-label">Zip Code</label>
                            <input type="text"
                                required
                                value={userState.User.postalCode}
                                onChange={UpdateInput}
                                name="postalCode"
                                className="form-control form-control-sm" id="PostCode" placeholder="Enter your zip code" />
                        </div>
                        <div className=" col-sm-4">
                            <label htmlFor="usertype" className="form-label">User Type</label>
                            <select className="form-select form-select-sm" aria-label="select country"
                                id="usertype"
                                name="userTypeID"
                                value={userState.User.userTypeID}
                                onChange={UpdateInput}
                                required
                            >
                                <option value="">Select UserType</option>
                                {
                                    userTypes.length > 0 &&
                                    userTypes.map(uType => {
                                        return (
                                            <option key={uType.id} value={uType.id}> {uType.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>                      

                        {/* style={{ display: 'inline-block' }} */}
                        <div className="col-lg-3 col-md-6 col-sm-4">
                            {/* <img src={userState.User.applicationUserImageToAddDto[0].base64data}
                                className="img-thumbnail" style={{ height: '150px', width: '150px' }} /> */}

                            <img src={`data:${userState.User.userPicturesToAddEditDto[0].contentType};base64,${userState.User.userPicturesToAddEditDto[0].base64data}`}
                                className="img-thumbnail mb-3 img-fluid"  />

                            <input type="file" onChange={UploadProfilePics} accept="image/*"  ></input>
                            {/* accept="image/png, image/jpeg, image/gif" id="inputImages" */}

                        </div>
                        <div className=''>
                            <input
                                name='acceptTerms'
                                required
                                value={userState.User.acceptTerms}
                                onChange={updateCheck}
                                type="checkbox" className="form-check-input me-2" />
                            Accepts terms and conditions
                        </div>
                       
                      
                        <div className="text-end" >
                            <input type="submit" className='btn btn-primary btn-sm' value="Register"
                                disabled={!validPwd || !validMatch ? true : false} />
                            <Link to={"/user/login"} className="btn btn-warning btn-sm ms-2">Cancel</Link>
                        </div>
                    </div>
                </form>
                <hr />
            </section>
        </Fragment>
    )
}

export default Registation;