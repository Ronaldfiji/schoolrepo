import React, { Fragment, useState, useRef, useEffect} from 'react'
import { useNavigate,useLocation, Link } from 'react-router-dom'
import Spinner from "../../../shared/component/Spinner";
import useAxiosPrivate from '../../../shared/hook/useAxiosPrivate'
import useAuth from "../../../shared/hook/useAuth";
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../../shared/hook/axios';


const Enrollment = (props) => {

  const axiosPrivate = useAxiosPrivate();
  const { userInfo } = useAuth();  
  const errRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const [userCourse, setUserCourse] = useState('');
  const [courses, setCourse]= useState('');
  const [schools, setSchools]= useState('');
  const [enroll, setEnroll] =useState({
    userId:'',
    courseId:'',
    schoolId:'',
    createdBy: '',
  })
  const [ErrMsg, setErrMsg] = useState('');
  const [IsLoading, setIsLoading] = useState(false);
  const [apiDataRequestPageSize, setApiDataRequestPageSize] = useState(100);
  const [sleepTime] = useState(1000);
  const [enrollmentSuccess, SetenrollmentSuccess] = useState(false);


  useEffect(() =>{
  
    let isMounted = true;
    const controller = new AbortController();

    const getUserCourse = async () => {
     
        setIsLoading(true);
        setErrMsg('');
        try { 
          const response = await axiosPrivate.get(`/user/getusercourse/${userInfo?.Id}`, {
            signal: controller.signal
          }); 

          isMounted && setUserCourse(response.data);
          setEnroll((enroll) => ({
            ...enroll, 
            userId:response.data.id,
            createdBy:response.data.firstName
        }));
       
        } catch (err) {
          setErrMsg("Failed to get enrollment and course data, check api: " + err);
        }
        finally {
          setIsLoading(false);
        }
    }

getUserCourse();

return () => {
  isMounted = false;
  controller.abort();
}
},[enrollmentSuccess])

useEffect(() =>{

    let isMounted = true;
    const controller = new AbortController();

    const getCourse_School = async () => {
        setIsLoading(true);
        setErrMsg('');
        try { 
         
          const courseResponse = await axios.get(`/course/getcourses?pagesize=${apiDataRequestPageSize}`, {
            signal: controller.signal
          });
          const schoolResponse = await axios.get(`/school/getschools?pagesize=${apiDataRequestPageSize}`, {
            signal: controller.signal
          }); 

            if (courseResponse) {
                isMounted && setCourse(courseResponse.data.items)
            } else {
                throw Error('Failed search record. Contact systems admin !');
            }
            if (schoolResponse) {
                isMounted && setSchools(schoolResponse.data.items)
            } else {
                throw Error('Failed search record. Contact systems admin !');
            }     
          
        } catch (err) {
          setErrMsg("Failed to get enrollment and course data, check api: " + err);
        }
        finally {
          setIsLoading(false);
        }
    }

getCourse_School();

    return () => {
        isMounted = false;
        controller.abort();
    }
},[])




let UpdateInput = (event) => {
    setEnroll((enroll) => ({       
            ...enroll,
            [event.target.name]: event.target.value        
    }));
}


let SubmitEnrollment = async (event) => {
    event.preventDefault();        
    errRef.current.focus();
    SetenrollmentSuccess(false);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    setErrMsg('');
    try {
        
        setIsLoading(true);        
        const response = await axiosPrivate.post(`/enrollment/create`, enroll);
        await littleSleep(sleepTime);       
        if (response.status== 201) {
            setIsLoading(false);
            setErrMsg('');
            toast.success('Enrollment successful !', { position: toast.POSITION.TOP_CENTER, autoClose: 3000, });
            SetenrollmentSuccess(true);
            //navigates("/user/login", { replace: true });
        }

    } catch (err) {
        console.log(err);
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 409) {
            setErrMsg('Object with email exist, you may login !');
        } else if (err.response?.status === 400) {
            setErrMsg('Invalid data provided, cousre already enrolled or does not meet prerequisite !');
        } else {
            setErrMsg('Enrollment Failed')
        }
    } finally {
        setIsLoading(false);
      }
}

let DisplayGrades = async(uc)=>{
    var temp = props;
    props(uc);
    navigate("/user/grades", { replace: true});
   
}




let littleSleep = async (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}


  return (
    <Fragment>
      <pre>{JSON.stringify(enroll)}</pre>
      <pre>{JSON.stringify(userCourse)}</pre>
        <ToastContainer position={"top-right"} pouseOnHover={true} draggable={true} theme="colored"
        icon={<i className="fa fa-info-circle fa-sm text-danger" aria-hidden="true"></i>} />
      <section className="pt-1">
        <p ref={errRef} className={ErrMsg ? "errmsg" : "offscreen"} aria-live="assertive">{ErrMsg}</p>
      </section>
      <section>
        {IsLoading ? <Spinner /> : ''}
      </section>
    
    <section>
      { Object.keys(userCourse).length > 0  ?
              <div className="row ">
                  <div className="col-md-4">
                      <div className="row  align-items-center">
                          <div className="col h6">
                           
                              <label className="col-form-label me-2">{(userCourse?.firstName)}  </label>
                              <label className="col-form-label">{(userCourse?.lastName)}  </label>
                          </div>
                      </div>
                       <div className="row g-3 align-items-center">
                          <div className="col-auto">
                              <label htmlFor="dob" className="col-form-label">DOB: </label>
                          </div>
                          <div className="col-auto">
                              <label id="dob">
                                  {
                                      userCourse?.dob ?
                                          format((new Date(userCourse?.dob)), "dd-MM-yyyy")
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
                              <label id="gender">{(userCourse?.gender)} </label>
                          </div>
                      </div>
                      <div className="row g-3 align-items-center">
                          <div className="col-auto">
                              <label htmlFor="phone" className="col-form-label">Phone: </label>
                          </div>
                          <div className="col-auto">
                              <label id="phone">{(userCourse?.phone)} </label>
                          </div>
                      </div>
                      <div className="row g-3 align-items-center">
                          <div className="col-auto">
                              <label htmlFor="email" className="col-form-label">Email: </label>
                          </div>
                          <div className="col-auto">
                              <label id="email">{(userCourse?.email)} </label>
                          </div>
                      </div> 

                  </div>

                 <div className='col-md-6'>
                 {
                          userCourse?.enrollments?.length > 0 ?
                              <div className="row g-3">
                                  <div className="col-auto">
                                      <div className="row">
                                          <div className="col">                                         
                                              <table className="table  table-hover table-striped text-left" style={{ fontSize: "0.9rem" }}>
                                                  <thead className="bg-danger text-white">
                                                      <tr>
                                                          <td>School</td>
                                                          <td>Code </td>
                                                          <td>Course</td>
                                                          <td>Year</td>
                                                          <td>Date Completed</td>
                                                          <td>Status</td>

                                                      </tr>
                                                  </thead>
                                                  <tbody>
                                                      {
                                                          userCourse?.enrollments?.length > 0 &&
                                                          userCourse?.enrollments?.map(uc => {
                                                              return (
                                                                  <tr key={uc?.id}>
                                                                      <td>{uc?.school?.name}</td>

                                                                      <td>                                                                   
                                                                        <Link to={'/user/grades'} state={uc}
                                                                        className="mouse-over text-sm" style={{fontStyle:"", color:"firebrick"}}>
                                                                        {uc?.courseEnrolled?.code}                                                                        
                                                                        </Link>
                                                                      </td>
                                                                      <td>{uc?.courseEnrolled?.name}</td>
                                                                      <td>{uc?.courseEnrolled?.schoolYear?.year}</td>
                                                                      <td>{
                                                                          uc?.dateCompleted ?
                                                                              format((new Date(uc?.dateCompleted)), "dd-MM-yyyy")
                                                                              : ""
                                                                      }
                                                                      </td>
                                                                      <td>{
                                                                          uc?.passed ? "Passed" :
                                                                              uc?.dateCompleted != null ?
                                                                                  "Failed"
                                                                                  : "InProgress"}
                                                                      </td>

                                                                  </tr>
                                                              );
                                                          })
                                                      }
                                                  </tbody>
                                              </table>                                            
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              : ""
                }
                 </div>

              </div>
              
            :""
        }
         </section>

          <section>
              <form onSubmit={SubmitEnrollment} className="enromment-form mt-2 p-2" >
                  <div className='row'>
                      <div className='col'>
                          <p className='h6'>Enroll into new course</p>
                      </div>
                  </div>
                  <div className="row g-3">
                      <div className=" col-sm-6">
                          <label htmlFor="courseID" className="form-label">Course</label>
                          <select className="form-select form-select-sm" required
                              id="courseID" name="courseId" value={enroll.courseId} onChange={UpdateInput} >
                              <option value="">Select Course</option>
                              {
                                  courses.length > 0 &&
                                  courses.map(course => {
                                      return (
                                          <option key={course.id} value={course.id}> {course.name}</option>
                                      )
                                  })
                              }
                          </select>
                      </div>
                      <div className=" col-sm-6">
                          <label htmlFor="SchoolID" className="form-label form-label">School</label>
                          <select className="form-select form-select-sm" required
                              id="SchoolID" name="schoolId" value={enroll.schoolId} onChange={UpdateInput}>
                              <option value="">Select School</option>
                              {
                                  schools.length > 0 &&
                                  schools.map(school => {
                                      return (
                                          <option key={school.id} value={school.id}> {school.name}</option>
                                      )
                                  })
                              }
                          </select>
                      </div>
                  </div>
                  <hr className="my-1"></hr>
                  <div className="text-end ">
                      <input type="submit" className='btn btn-danger btn-sm' value="Enroll now" />
                  </div>
              </form>
          </section>
         
    </Fragment>
  )
}

export default Enrollment