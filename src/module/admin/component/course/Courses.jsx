import React, { Fragment, useEffect, useRef, useState} from 'react'
import useCourseService from '../../service/useCourseService'
import useSchYearService from '../../service/useSchYearService'
import { useQuery, useMutation, useQueryClient, QueryResult  } from 'react-query';
import { format } from 'date-fns';
import Spinner from '../../../../shared/component/Spinner';
import NewCourse from './NewCourse';
import {ToastContainer,  toast } from 'react-toastify';


const Courses = () => {
    const {getCourseList, addCourse, editCourse, deleteCourses} = useCourseService();
    const {getSchoolYearList} = useSchYearService();
    const queryClient = useQueryClient()
   //const [sleepTime] = useState(3500);    
    const errRef = useRef();
    const successRef = useRef();
    const [refreshState, setrefreshState] = useState(0);
    const [deleteCourseList, setDeleteCourseList] = useState([]);   
    const [courseToEdit, setCourseToEdit ] = useState({});

    const {
        isLoading,
        isError,
        error, 
        data, 
    } = useQuery('courses', async()=> getCourseList(100).then((res) => res.data.items), {
        select: data => data.sort((a, b) => b.id - a.id), retry: false})
   
    const {
            isLoading: isLoadingSchYear,
            isError: isErrorSchYear,
            error: errorSchYear, 
            data: dataSchoolYear, 
            refetchInterval,
        } = useQuery('schoolYear', async()=> getSchoolYearList(100).then((res) => res.data.items), {
             retry: false, refetchInterval:false ,refetchOnWindowFocus:false})

/*  How to send addtional parameter to useQuery hook : } = useQuery(['SchoolYear', 1], async () =>*/

    const addCourseMutation = useMutation(addCourse, {
        onSuccess: () => {
            // Invalidates cache and refetch 
            queryClient.invalidateQueries("courses")
            toast.success('Course created successfully', { position: toast.POSITION.TOP_CENTER, autoClose: 3000, });            
            setrefreshState(prev => prev + 1);
            errRef?.current?.focus();            
        }        
    })

    const deleteCourseMutation = useMutation(deleteCourses, {
        onSuccess: () => {
            // Invalidates cache and refetch 
            queryClient.invalidateQueries("courses")
            toast.success('Courses deleted successfully', { position: toast.POSITION.TOP_CENTER, autoClose: 3000, }); 
            setDeleteCourseList(''); 
        }
    })
  
    const updateCourseMutation = useMutation(editCourse, {
        onSuccess: () => {
            // Invalidates cache and refetch 
            queryClient.invalidateQueries("courses")
            toast.success('Course updated successfully', { position: toast.POSITION.TOP_CENTER, autoClose: 3000, });            
            setrefreshState(prev => prev + 1);
            errRef?.current?.focus();            
        }        
    })


 let CreateCourse = (course)=>{    
    addCourseMutation.mutate(course)
 } 

 let UpdateCourse = (course) =>{
    updateCourseMutation.mutate(course)
 }

 const SendCourseDetails = async(courseid)=>{
        setCourseToEdit(courseid);
 }

 // Add/Remove checked item from list
const handleChange =  (event, course) => {
     var updatedList = [...deleteCourseList];
     if (event.target.checked) {
        updatedList = [...deleteCourseList, course];
     } else {
       updatedList.splice(deleteCourseList.indexOf(course), 1);
     }
      setDeleteCourseList(updatedList);         
  };



const DeleteCourse = async() =>{   
    (addCourseMutation?.isError || addCourseMutation?.isSuccess)   && addCourseMutation.reset();
    deleteCourseMutation.mutate(deleteCourseList)    
}

let content
    if (isLoading) {
        content = <Spinner/>
    } else if (isError) {        
        content =  <p ref={errRef} className={isError ? "errmsg" : "offscreen"} aria-live="assertive">{error.message}</p>
    } else {


        content = data?.map((course) => {
            return (
                <tr key = {course.id}>
                    <td>{course?.id}</td>
                    <td>                                
                   <i className="mouse-over text-sm text-primary"
                            style={{fontStyle:"normal", color:"firebrick"}}
                    onClick={ async() => SendCourseDetails(course)}>{course?.code}</i> 
                    </td>
                    <td>{course?.name}</td>
                    <td>{course?.description}</td>
                    <td>{course?.schoolYear?.year}</td>
                    <td>{course?.createdDate ?format((new Date(course?.createdDate)), "dd-MM-yyyy"): ""}</td>                  
                    <td>{course?.createdBy}</td>
                    <td>
                    <input type="checkbox" onChange={(e)=> handleChange(e, course)}/>     
                    </td>
                </tr>

            )
        })
    }

  return (
    <Fragment>      
          <div>
              {addCourseMutation.isLoading || deleteCourseMutation.isLoading ? (
                   <Spinner/>
              ) : (
                  <>
                      {addCourseMutation.isError ?
                       ( 
                        addCourseMutation?.error?.request?.status === 400 ?
                        <p ref={errRef} className={addCourseMutation.isError ? "errmsg" : "offscreen"} 
                          aria-live="assertive">Invalid data provided, check item data and retry</p>
                          :
                       <p ref={errRef} className={addCourseMutation.isError ? "errmsg" : "offscreen"} 
                          aria-live="assertive">{addCourseMutation?.error?.message}</p>) 
                          : null}
                      {addCourseMutation.isSuccess ? <p ref={successRef} className={addCourseMutation.isSuccess ? "success-msg" : "offscreen"} 
                      aria-live="assertive">Item saved successfully ! </p> : null}
                  </>
              )}
          </div>

        <NewCourse SaveNewCourse ={CreateCourse} UpdateCourse={UpdateCourse}
        refreshState = {refreshState} schoolYear = {dataSchoolYear}
        CourseToEdit={courseToEdit}/>
        <hr />  
        
         {
           
           isLoading || isError ?
                content
           :                       
            data.length > 0 && data !== undefined ?

                      <div className="row">
                          <div className="col">
                              <div className="table-responsive">
                                  <table className="table    table-hover table-striped text-left">
                                      <thead className="bg-danger text-white">
                                          <tr>
                                              <td>ID</td>
                                              <td>Code</td>
                                              <td>Name</td>
                                              <td>Description</td>
                                              <td>Year</td>
                                              <td>Created date</td>
                                              <td>Created by</td>
                                              <td>
                                                <i className="fa fa-trash fa-xs text-light mouse-over" 
                                                aria-hidden="true" onClick={ async() => await DeleteCourse()}></i> 
                                              </td>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {content}
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                      </div>
            : <p>No course to display !</p>
          } 

          <section>
              <ToastContainer position={"top-right"} pouseOnHover={true} draggable={true} theme="colored" />
          </section>

    </Fragment>
  )
}

export default Courses