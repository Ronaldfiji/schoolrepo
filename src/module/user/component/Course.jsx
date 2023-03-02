import React, { Fragment, useEffect, useState, useRef } from 'react'
import Spinner from "../../../shared/component/Spinner";
import useAxiosPrivate from '../../../shared/hook/useAxiosPrivate'
import useAuth from "../../../shared/hook/useAuth";
import { format } from 'date-fns';

const Course = () => {
 
  const axiosPrivate = useAxiosPrivate();
  const { userInfo } = useAuth();

  const [ErrMsg, setErrMsg] = useState('');
  const [IsLoading, setIsLoading] = useState(false);
  
  const [userCourse, setUserCourse] = useState('');
  const errRef = useRef();
 

 

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
              
              isMounted && setUserCourse(response.data.enrollments);
            } catch (err) {
              setErrMsg("Failed to course data, check api: " + err);
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
  },[])

  return (
    <Fragment>
    
      <section className="pt-3">
        <p ref={errRef} className={ErrMsg ? "errmsg" : "offscreen"} aria-live="assertive">{ErrMsg}</p>
      </section>
      <section>
        {IsLoading ? <Spinner /> : ''}
      </section>
   
      {
        userCourse?.length > 0 ?
            <div className="row g-3">
              <div className="col-auto">
                {/* <label for="role" class="form-label">Roles:  </label> */}

                <div className="row">
                  <div className="col">
                    <table className="table  table-hover table-striped text-left" style={{ fontSize: "0.9rem" }}>
                      <thead className="bg-danger text-white">
                        <tr>
                          <td><small>Code </small> </td>
                          <td>Course</td>
                          <td>Year</td>
                          <td>Date Completed</td>
                          <td>Status</td>

                        </tr>
                      </thead>
                      <tbody>
                        {
                          userCourse?.length > 0 &&
                          userCourse?.map(uc => {
                            return (
                              <tr key={uc?.id}>

                                <td  >{uc?.courseEnrolled?.code}</td>
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
    

    </Fragment>
  )
}

export default Course