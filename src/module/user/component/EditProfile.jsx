import React, { Fragment, useRef, useState, useEffect } from "react";
import Spinner from "../../../shared/component/Spinner";
import format from "date-fns/format";
import UserService from '../../../shared/service/UserService'
import useAxiosPrivate from '../../../shared/hook/useAxiosPrivate'

const EditProfile = ({ CloseEditDialogue, User }) => { 

  const axiosPrivate = useAxiosPrivate();
  const fnameRef = useRef();
  const errRef = useRef();
  const [ErrMsg, setErrMsg] = useState('');
  const [IsLoading, setIsLoading] = useState(false);
  const[userTypes, setUserTypes] = useState({});

  const [user, setUser] = useState({
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
    userTypeID: '',
    userType:{id:'', name:'', description:''},
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
  })

  let [countrylist, setcountrylist] = useState([]);
  const [sleepTime, setsleepTime] = useState(1);

  useEffect(() => {
    fnameRef.current.focus();
    (async () => {
      setIsLoading(true)
      try {
        await littleSleep(sleepTime);
        setUser(User);
        setUser((user) => ({
          ...user,
          gender: GetGenderValue(User.gender),
        }));

        let userTypeResponse = await UserService.UserTypes();
        if (userTypeResponse.status === 200) {
          setUserTypes(userTypeResponse.data);
        }

        let response = window.getCountries();
        if (response) {
          setcountrylist(response);
        }
      } catch (error) {
        console.log(error);
      }
      finally {
        setIsLoading(false);
      }
    })()
  }, [])

  let littleSleep = async (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  let UpdateInput = (event) => {
    setUser((user) => ({
      ...user,
      [event.target.name]: event.target.value

    }));
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

  let GetGenderValue = (gender) => {
    if (gender.toLowerCase() == 'male')
      return 1;
    else if (gender.toLowerCase() == 'female')
      return 2;
    else if (gender.toLowerCase() == 'other')
      return 3;

  }

  let CloseEditDialogueAfter = () => {
    return CloseEditDialogue(true);
  }

  let SubmitUpdate = async (e) => {
    e.preventDefault();
    let isMounted = true;
    const controller = new AbortController();
            try {
                    setErrMsg('');
                    setIsLoading(true);                   
                    const response = await axiosPrivate.patch(`/user/update/${user.id}`, user, { signal: controller.signal });
                    if (response) {        
                        CloseEditDialogueAfter();
                    }
                    else {
                        throw Error('Failed to update user. Contact systems admin !');
                    }
            }
            catch (err) {

                    if (!err?.response) {
                        setErrMsg('No Server Response' + err);
                    } else if (err.response?.status === 400) {
                        setErrMsg('Invalid data provided, update request data and re-submit');
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

  return (
    <Fragment>
      <div className="modal fade show d-block " id="myModal"
        aria-modal="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header justify-content-endXX">
              <h5 className="modal-title">Update your profile</h5>
              <button type="button" className="close" data-dismiss="modal" onClick={() => CloseEditDialogue(false)} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>            
            <div className="modal-body">
              <div>
                <section className="pt-1">
                  <p ref={errRef} className={ErrMsg ? "errmsg" : "offscreen"} aria-live="assertive">{ErrMsg}</p>
                </section>
                <section>
                  {(!ErrMsg && IsLoading) ? <Spinner /> : ""}
                </section>
              </div>
              <form onSubmit={SubmitUpdate}>
                <div className="row g-3">
                  <div className="col-sm-4">
                    <label htmlFor="firstName" className="form-label">First name</label>
                    <input type="text"
                      ref={fnameRef}
                      required
                      autoComplete="off"
                      value={user.firstName}
                      onChange={UpdateInput}
                      className="form-control form-control-sm" name="firstName" id="firstName" placeholder="First name" />
                  </div>
                  <div className="col-sm-4">
                    <label htmlFor="lastName" className="form-label">Last name</label>
                    <input type="text"
                      required
                      autoComplete="off"
                      value={user.lastName}
                      onChange={UpdateInput}
                      className="form-control form-control-sm" name="lastName" id="lastName" placeholder="Last name" />
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
                    <label htmlFor="addressLine1" className="form-label">Address Line 1</label>
                    <input type="text"
                      required
                      value={user.addressLine1}
                      onChange={UpdateInput}
                      className="form-control form-control-sm" id="addressLine1"
                      name="addressLine1"
                      placeholder="Enter your address" />
                  </div>
                  <div className=" col-sm-4">
                    <label htmlFor="addressLine2" className="form-label">Address Line 2</label>
                    <input type="text"
                      required
                      value={user.addressLine2}
                      onChange={UpdateInput}
                      className="form-control form-control-sm" id="addressLine2"
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
                    <label htmlFor="postalCode" className="form-label">Postal Code</label>
                    <input type="text"
                      required
                      value={user.postalCode}
                      onChange={UpdateInput}
                      name="postalCode"
                      className="form-control form-control-sm" id="postalCode" placeholder="Enter your postal code" />
                  </div>

                  <div className=" col-sm-4">
                            <label htmlFor="usertype" className="form-label">User Type</label>
                            <select className="form-select form-select-sm" aria-label="select country"
                                id="usertype"
                                name="userTypeID"
                                value={user?.userType?.id}
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


                  <div className="col-lg-3 col-md-6 col-sm-4">
                    {                  
                      user?.userPicturesDto?.length > 0 &&
                        user?.userPicturesDto[0]?.fileName != '' ?
                        <img src={`data:${user.userPicturesDto[0].contentType};base64,${user.userPicturesDto[0].base64data}`}
                          className="img-thumbnail mb-3 img-fluid" alt="no img" />
                        : ""
                    }
                    {
                     user?.userPictures?.length > 0 ?
                      user?.userPictures[0]?.path != null ?
                        <img src={`https://localhost/${user?.userPictures[0].path}`} alt="Responsive image"
                          className="img-thumbnail  img-fluid img-responsive" />
                        : ""
                        :""
                    }

                    <input type="file" onChange={UploadProfilePics} accept="image/*"  ></input>
                            {/* accept="image/png, image/jpeg, image/gif" id="inputImages" */}
                  </div>
                </div>
                <hr />
                <div className=" text-end">
                  <button type="button" className="btn btn-sm btn-secondary me-2" data-dismiss="modal"
                    onClick={() => CloseEditDialogue(false)} >Close</button>
                  <button type="submit" className="btn btn-sm btn-primary me-2">Save changes</button>
                </div>

              </form>
            </div>
            {/* <div className="modal-footer">
              <button type="button" className="btn btn-sm btn-secondary" data-dismiss="modal" onClick={() => CloseEditDialogue(false)} >Close</button>
            </div> */}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default EditProfile;


{/* <a className="btn btn-sm btn-secondary me-2" data-dismiss="modal" onClick={() => CloseEditDialogue(false)}> Close </a> 
  */}