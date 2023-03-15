import React, { Fragment, useEffect, useState, useRef } from "react";
import useAuth from "../../../shared/hook/useAuth";
import { format } from 'date-fns';
import useAxiosPrivate from '../../../shared/hook/useAxiosPrivate'
import Spinner from "../../../shared/component/Spinner";
import { ToastContainer, toast } from 'react-toastify';
import EditProfile from "./EditProfile";
import Course from "./Course";
import { Link } from "react-router-dom";

const Profile = () => {

  const [EditDialogue, setEditDialogue] = useState(false);
  let [IsUpdateSuccess, setIsUpdateSuccess] = useState(0);
  const [ErrMsg, setErrMsg] = useState('');
  const [IsLoading, setIsLoading] = useState(false);
  const errRef = useRef();
  const [user, setUser] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const { userInfo } = useAuth();

  useEffect(() => {

    let isMounted = true;
    const controller = new AbortController();
    const getUserDetails = async () => {
      setIsLoading(true);
      setErrMsg('');
      try {
        const response = await axiosPrivate.get(`/user/getuser/${userInfo?.Id}`, {
          signal: controller.signal
        });
        isMounted && setUser(response.data);
      } catch (err) {       
        setErrMsg("Failed to get user, check api: " + err);
      }
      finally {
        setIsLoading(false);
      }
    }

    getUserDetails();

    return () => {
      isMounted = false;
      controller.abort();
    }

  }, [IsUpdateSuccess]);


  /* ** Redundant function 
  let GetUserData_REDENDUNT = async () => {

    let isMounted = true;
    const controller = new AbortController();
    setIsLoading(true);
    setErrMsg('');
    try {
      const response = await axiosPrivate.get(`/user/getuser/${userInfo?.Id}`, {
        signal: controller.signal
      });
      isMounted && setUser(response.data);
    } catch (err) {
      console.log('Failed to get user, check api : ' + JSON.stringify(err));
      setErrMsg("Failed to get user, check api: " + err);
      errRef.current.focus();
    }
    finally {
      setIsLoading(false);
    }
    return () => {
      isMounted = false;
      controller.abort();
    }
  }*/

  const DisplayEditDialogue = () => {
    setEditDialogue(true)
}


const CloseEditDialogue = async (editStatus) => {       
    setEditDialogue(false);
    if(editStatus){           
        setIsUpdateSuccess(++IsUpdateSuccess);           
    }
}

  return (
    <Fragment> 
    
      <ToastContainer position={"top-right"} pouseOnHover={true} draggable={true} theme="colored"
        icon={<i className="fa fa-info-circle fa-sm text-danger" aria-hidden="true"></i>} />
      <section className="pt-3">
        <p ref={errRef} className={ErrMsg ? "errmsg" : "offscreen"} aria-live="assertive">{ErrMsg}</p>
      </section>
      <section>
        {IsLoading ? <Spinner /> : ''}
      </section>
      { Object.keys(user).length > 0  ?
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <div className="row g-3 align-items-center">
              <div className="col-auto h5">
                <label className="col-form-label me-2">{(user?.firstName)}  </label>
                <label className="col-form-label">{(user?.lastName)}  </label>
              </div>
            </div>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="dob" className="col-form-label">DOB: </label>
              </div>
              <div className="col-auto">
                <label id="dob">
                  {
                    user?.dob ?
                      format((new Date(user?.dob)), "dd-MM-yyyy")
                      : ""
                  }
                </label>
              </div>
            </div>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="gender" className="col-form-label">Gender: </label>
              </div>
              <div className="col-auto">
                <label id="gender">{(user?.gender)} </label>
              </div>
            </div>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="phone" className="col-form-label">Phone: </label>
              </div>
              <div className="col-auto">
                <label id="phone">{(user?.phone)} </label>
              </div>
            </div>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="email" className="col-form-label">Email: </label>
              </div>
              <div className="col-auto">
                <label id="email">{(user?.email)} </label>
              </div>
            </div>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="address" className="col-form-label">Address: </label>
              </div>
              <div className="col-auto">
                <label id="address1">{(user?.addressLine1)} </label>,
                <label id="address2">{(user?.addressLine2)} </label>
              </div>
            </div>
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label htmlFor="country" className="col-form-label">Country: </label>
              </div>
              <div className="col-auto">
                <label id="country">{(user?.country)} </label>
              </div>
            </div>

            <h5 className="">Roles</h5>
                        <div className="row g-3">
                            <div className="col-auto">
                                {/* <label for="role" class="form-label">Roles:  </label> */}
                                <ul className="list-group mb-3 fa-ul"> 
                                      {
                                    user?.roles?.length > 0 &&
                                    user?.roles?.map(role => {
                                        return (                                            
                                            <li key={role.id}><span className="fa-li"><i className="fa-solid fa-check-square"></i></span> <em>{role.name}</em></li>
                                        )
                                    })
                                  }
                                </ul>
                            </div>
                        </div>
                       

                        <div className="row g-3 align-items-center">
                          <div className="col-auto">
                            <label htmlFor="usertype" className="col-form-label h6"> Classification:</label>
                          </div>
                          <div className="col-auto">
                            <label id="usertype">{(user?.userType?.name)} </label>
                          </div>
                        </div>

                      <div className="row g-3 align-items-center mb-2">
                        <div className="col">
                          <span className=' input-group w-80 align-items-center justify-content-between'>
                            <input type="submit" onClick={DisplayEditDialogue}
                              className="btn btn-sm btn-danger form-control mt-3 me-2" value="Edit" />
                            <i className="fa fa-pencil  mt-2 mouse-over" onClick={DisplayEditDialogue} ></i>
                          </span>
                        </div>
                      </div>
          </div>
          <div className="col-md-4 mt-2">
            <div className="card shadow">

              {
                user?.userPictures?.length > 0 ?
                  user?.userPictures[0]?.path ?
                    <div className="col">
                      <img src={`https://localhost/${user?.userPictures[0]?.path}`} alt="Responsive image"
                        className="img-thumbnail  img-fluid img-responsive card-img-top" style={{ maxHeight: "340px" }} />
                    </div>
                    : ""
                  : ""
              }
            </div>            
          </div>
        </div>
        : ""
      }

      <section>
      
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-4">
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <Course />
              </div>
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="d-flex aligns-items-center justify-content-center ms-5" >
              <Link to='/user/enrollment' className="btn btn-danger btn-sm "> Enroll into new course</Link>
            </div>
          </div>
        </div>
              



      </section>

      <div className="row">
        <div className="col">
          {
            EditDialogue && <EditProfile CloseEditDialogue={CloseEditDialogue} User={user} />
          }
        </div>
      </div>


    </Fragment>

  )
}

export default Profile