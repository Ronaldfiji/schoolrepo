import React, { Fragment, useState, useRef, useEffect, } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../shared/hook/useAxiosPrivate";
import Spinner from "../../../../shared/component/Spinner";
import UserService from "../../../../shared/service/UserService";
import {ToastContainer,  toast } from 'react-toastify';
import format from "date-fns/format";
import useAdminService from "../../service/useAdminService";


let EditUser = () => {

    let navigates = useNavigate();
    const [sleepTime] = useState(300);
    const fnameRef = useRef();
    const errRef = useRef();
    let { userid } = useParams();
    const [ErrMsg, setErrMsg] = useState('');
    const [IsLoading, setIsLoading] = useState(false);
    const[userTypes, setUserTypes] = useState({});
    const [countrylist, setcountrylist] = useState([]);
    const axiosPrivate = useAxiosPrivate();    
    const {getAllUserRoles, testFunction} = useAdminService();    
    const [DisplayRoles, setDisplayRoles] = useState([]);
    const [checked, setChecked] = useState([]);
   
    
    let [user, setUser] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
      addressLine1: '',
      addressLine2: '',
      country: '',
      city: '',
      state: '',
      postalCode: '', 
      userTypeId: '',
      userType: { id: '', name: '', description: '' },
      userPicturesDto: [
        {
          id: '',
          name: '',
          path: '',
          description: '',
          base64data: '',
          contentType: '',
          fileName: '',
        }],
      userPictures: [
        {
          id: '',
          name: '',
          path: '',
          description: '',
        }],
        roles: [{id: '',name: '',description: ''}]        
    })



    useEffect(() => {
     
        fnameRef.current.focus();
        (async () => {
            try {
                let response = window.getCountries();                
                if (response) {
                    setcountrylist(response);
                }
                let userTypeResponse = await UserService.UserTypes();                
                if(userTypeResponse.status === 200){
                   setUserTypes(userTypeResponse.data);
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])


    const updateRoleState = async (userRole, AllRoles) => {
       
        const dbRoles = AllRoles.data.items;
        
        try {
            var roles =[];
            for (let i = 0; i < dbRoles.length; i++) {
                var role = {
                    id: dbRoles[i].id,
                    'name': dbRoles[i].name,
                    'checked': false,
                }
                for (let j = 0; j < userRole.length; j++) {

                    if (dbRoles[i].name === userRole[j].name) {
                        role.checked = true
                    }
                }
                roles.push(role);
            }            
            setDisplayRoles(roles);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
     
        let isMounted = true;
        const controller = new AbortController();
        setErrMsg('');
        setIsLoading(true);

        let getUser = async () => {
            try {
                let response = await axiosPrivate.get(`/user/getuser/${userid}`, { signal: controller.signal })
                if (response) {
                    isMounted && setUser(response.data);                    
                }
                setUser((user) => ({
                    ...user,
                   gender :GetGenderValue(user.gender),
                }));

                const AllRoles = await getAllUserRoles();                
                await updateRoleState(response?.data?.roles, AllRoles);
              
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No Server Response' + err);
                } else if (err.response?.status === 400) {
                    setErrMsg('Invalid data provided, update request data and re-submit');
                } else if (err.response?.status === 404) {
                    setErrMsg(`User with id: ${userid} does not exist !`);
                } else if (err.response?.status === 401) {
                    setErrMsg('Unauthorized');
                } else if (err.response?.status === 403) {
                    setErrMsg('Unauthorized, forbidden, no permission to add or update.');
                } else {
                    setErrMsg('Failed to fetch user record !');
                }
                errRef.current.focus();
            }
            finally {
                setIsLoading(false);
            }
        }

        getUser(userid);

        return () => {
            isMounted = false;
            controller.abort();
        }

    }, [userid])


    let UpdateInput = (event) => {
        setUser((user) => ({
            ...user,
            [event.target.name]: event.target.value
        }));
    }

    let  SubmitUpdate = async(e) => {
        e.preventDefault();
        let isMounted = true;
        const controller = new AbortController();
        try {

            setErrMsg('');
            setIsLoading(true);  
            let response =  await axiosPrivate.patch(`/user/updateuseradmin/${user.id}`, user, {signal: controller.signal});
            if (response) {              
                isMounted && navigates('/admin/users', { replace: true });
                toast.success('Profile updated successfully', { position: toast.POSITION.TOP_CENTER, autoClose: 3000, });
            }
              else {
                 throw Error('Failed to update user. Contact systems admin !');
             }

        } catch (err) {

            if (!err?.response) {
                setErrMsg('No Server Response' + err);
            } else if (err.response?.status === 400) {
                setErrMsg('Invalid data provided, update request data and re-submit');
            } else if (err.response?.status === 404) {
                setErrMsg(`User with id: ${userid} does not exist !`);
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else if (err.response?.status === 403) {
                setErrMsg('Unauthorized, forbidden, no permission to add or update.');
            } else {
                setErrMsg('Failed to fetch user record !');
            }
            errRef.current.focus();
        }
        finally {
            setIsLoading(false);
        }

        return () => {
            isMounted = false;
            controller.abort();
        }
    }


    const UploadProfilePics = async e => {

        const base64 = await convertBase64(e.target.files[0]);
        const contenttype = String(e.target.files[0].type);
        const filename = String(e.target.files[0].name);

        const base64Trimed = base64.replace('data:', '')
            .replace(/^.+,/, '');
        setUser((user) => ({
            ...user,
            userPicturesDto: [{
                base64data: base64Trimed,
                contentType: contenttype,
                fileName: filename
            }],
            userPictures:{}

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

    let GetGenderValue = (gender)=>{
        if(gender.toLowerCase()== 'male')
        return 1;
        else if(gender.toLowerCase()== 'female')
        return 2;
        else if(gender.toLowerCase()== 'other')
        return 3;

    }

    // Add/Remove checked item from list
    const handleCheck = (event) => {

        for (let i = 0; i < DisplayRoles.length; i++) {
            if (DisplayRoles[i].id == event.target.value) {                
                if (event.target.checked) {
                    DisplayRoles[i].checked = true;
                }
                else {
                    DisplayRoles[i].checked = false;
                }
            }
        }

        var rolesToAdd = [];
        for (let i = 0; i < DisplayRoles.length; i++) {
            if (DisplayRoles[i].checked === true) {
                rolesToAdd.push({ id: DisplayRoles[i].id, 'name': DisplayRoles[i].name, 'description': DisplayRoles[i].name })
            }
        }
        console.log('roles to add: ' + JSON.stringify(rolesToAdd));
        setUser((user) => ({
            ...user, roles: rolesToAdd,
        }))
    };

   // Return classes based on whether item is checked
     var isChecked = (item) => item === true ? "checked-item" : "not-checked-item"; 

    return (
        <Fragment>
            <section className="pt-3">
                <p ref={errRef} className={ErrMsg ? "errmsg" : "offscreen"} aria-live="assertive">{ErrMsg}</p>
            </section>
            <section>                           
                <div className="row">
                    <div className="col">
                        {
                            (IsLoading && !ErrMsg) ? <Spinner /> : ""
                        }
                        <form onSubmit={SubmitUpdate}>
                            <div className="row g-3 ms-1 me-1">
                                <div className=" col-sm-4">
                                    <label htmlFor="firstName" className="form-label">First name</label>
                                    <input type="text"
                                        ref={fnameRef}
                                        required
                                        autoComplete="off"
                                        value={user.firstName}
                                        onChange={UpdateInput}
                                        className="form-control form-control-sm" name="firstName" id="firstName" placeholder="First name" />
                                </div>
                                <div className=" col-sm-4">
                                    <label htmlFor="lastName" className="form-label">Last name</label>
                                    <input type="text"
                                        required
                                        autoComplete="off"
                                        value={user.lastName}
                                        onChange={UpdateInput}
                                        className="form-control form-control-sm" name="lastName" id="lastName" placeholder="First name" />
                                </div>
                                <div className=" col-sm-4">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email"
                                        required
                                        value={user.email}
                                        onChange={UpdateInput}
                                        className="form-control form-control-sm" id="email" name="email" placeholder="Enter Email" />
                                </div>

                                <div className=" col-sm-4">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input type="number"
                                        required
                                        value={user.phone}
                                        onChange={UpdateInput}
                                        className="form-control form-control-sm" id="phone" name="phone" placeholder="Phone" />
                                </div>
                                <div className=" col-sm-4">
                                    <label htmlFor="dob" className="form-label">DOB</label>
                                    <input type="date"
                                        required
                                        value=
                                        {
                                            user?.dob ?
                                                format(new Date(user?.dob), 'yyyy-MM-dd')
                                                :
                                                format(new Date(), 'yyyy-MM-dd')
                                        }
                                        onChange={UpdateInput}
                                        name="dob"
                                        className="form-control form-control-sm" id="dob" placeholder="DOB" />
                                </div>

                                <div className=" col-sm-4">
                                    <label htmlFor="gender" className="form-label">Gender</label>
                                    <select className="form-select form-select-sm" aria-label="select gender"
                                        id="gender" name="gender" required
                                        value={user.gender}
                                        onChange={(e) => (setUser(() =>
                                        ({

                                            ...user,
                                            gender: Number(e.target.value),

                                        })))}
                                    >
                                        {
                                            user.gender.length > 3 ?
                                                <option value="">{user.gender}</option> : ""
                                        }
                                        <option value={1}>Male</option>
                                        <option value={2}>Female</option>
                                        <option value={3}>Other</option>
                                    </select>
                                </div>


                                <div className=" col-sm-4">
                                    <label htmlFor="addressline1" className="form-label">Address Line 1</label>
                                    <input type="text"
                                        required
                                        value={user.addressLine1}
                                        onChange={UpdateInput}
                                        className="form-control form-control-sm" id="addressline1"
                                        name="addressLine1"
                                        placeholder="Enter your address" />
                                </div>
                                <div className=" col-sm-4">
                                    <label htmlFor="addressline2" className="form-label">Address Line 2</label>
                                    <input type="text"
                                        required
                                        value={user.addressLine2}
                                        onChange={UpdateInput}
                                        className="form-control form-control-sm" id="addressline2"
                                        name="addressLine2"
                                        placeholder="Enter your address" />
                                </div>

                                <div className=" col-sm-4">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <select className="form-select form-select-sm" aria-label="select country"
                                        id="country"
                                        name="country"
                                        value={user.country}
                                        onChange={UpdateInput}
                                    >
                                        <option value="">{user.country}</option>
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
                                        value={user.city}
                                        onChange={UpdateInput}
                                        name="city"
                                        className="form-control form-control-sm" id="city" placeholder="City" />
                                </div>
                                <div className=" col-sm-4">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <input type="text"
                                        required
                                        value={user.state}
                                        onChange={UpdateInput}
                                        name="state"
                                        className="form-control form-control-sm" id="state" placeholder="Enter your state" />
                                </div>

                                <div className=" col-sm-4">
                                    <label htmlFor="postcode" className="form-label">Postal Code</label>
                                    <input type="text"
                                        required
                                        value={user.postalCode}
                                        onChange={UpdateInput}
                                        name="postalCode"
                                        className="form-control form-control-sm" id="postcode" placeholder="Enter your zip code" />
                                </div>

                                <div className=" col-sm-4">
                                  <label htmlFor="usertype" className="form-label">User Type</label>
                                  <select className="form-select form-select-sm" aria-label="select user type"
                                    id="usertype"
                                    name="userTypeId"
                                    //value={user?.userType?.id}
                                    onChange={UpdateInput}
                                    required
                                  >
                                    <option value={user?.userType?.id}>{user?.userType?.name}</option> 
                                    {/* <option value="">Select UserType</option> */}
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

                                <div className=" col-sm-4">
                                    <div className="checkList">
                                    <label htmlFor="postcode" className="form-label">Roles: </label>
                                        <div className="list-container">      
                                        {    
                                                DisplayRoles?.length > 0 &&
                                                DisplayRoles?.map((role, index) => (
                                                    <div   key={index}>
                                                        <input value={role.id} type="checkbox" defaultChecked={role.checked} onChange={handleCheck}
                                                        />
                                                        <span className={isChecked(role.checked)}>{role.name}</span>
                                                    </div>
                                                ))
                                        }                                       
                                        </div>
                                    </div>
                                </div>


                                <div className="col-lg-3 col-md-6 col-sm-4">                                 
                                  {
                                    user?.userPicturesDto?.length > 0 &&
                                      user?.userPicturesDto[0]?.fileName != '' ?
                                      <img src={`data:${user?.userPicturesDto[0]?.contentType};base64,${user?.userPicturesDto[0]?.base64data}`}
                                        className="img-thumbnail mb-3 img-fluid" alt="no img" />
                                      : ""
                                  }
                                  {
                                    user?.userPictures?.length > 0 ?
                                      user?.userPictures[0]?.path != ""?
                                        <img src={`https://localhost/${user?.userPictures[0]?.path}`} alt="Responsive image"
                                          className="img-thumbnail  img-fluid img-responsive" />
                                        : ""
                                      : ""
                                  } 

                                    <input type="file" onChange={UploadProfilePics} accept="image/*"  ></input>
                                    {/* accept="image/png, image/jpeg, image/gif" id="inputImages" */}

                                </div>
                                <div className="text-end" >
                                    <input type="submit" className='btn btn-primary btn-sm' value="Update"
                                    />
                                    <Link to={"/admin/users"} className="btn btn-warning btn-sm ms-2">Cancel</Link>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Fragment>
    )

}

export default EditUser;

