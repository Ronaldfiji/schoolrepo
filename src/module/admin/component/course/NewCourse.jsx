import React, { Fragment, useState, useEffect } from 'react'
import NewCourseForm from './NewCourseForm'

const NewCourse = (props) => {
  const[course, setCourse]= useState({
    id:"",
    name:"",
    code:"" , 
    description:"" ,
    schoolYearId:"" , 
    createdBy:"" ,
  });

const { id, ...otherProps } = course;

  const handleSubmit = e => {
    e.preventDefault()
    if (course?.id !== "" && course?.id !== undefined)      
      props.UpdateCourse(course)
   else     
      props.SaveNewCourse(otherProps);    
    
}

const handleChange = e => {
    const type = e.target.type;
    const name = e.target.name;

    const value = type === "checkbox"
        ? e.target.checked
        : e.target.value

    setCourse(prevData => ({
        ...prevData,
        [name]: value
    }))
}

useEffect(()=>{ 
 
  setCourse( (course)=>({
    id: props?.CourseToEdit?.id,
    code: props?.CourseToEdit?.code,
    name: props?.CourseToEdit?.name,
    description: props?.CourseToEdit?.description,
    schoolYearId: props?.CourseToEdit?.schoolYear?.id,
    createdBy:props?.CourseToEdit?.createdBy,
  }))
  console.log("UseEffect hook fired , course data rset" );

},[props?.CourseToEdit])


useEffect(() => {  
  
  console.log("props.refreshState hook fired");
  setCourse((course)=>({
    id:"", name:"", description:"", code:"", schoolYearId:"", createdBy:"",
   }))


  // ( async()=>{   
  //   setCourse((course)=>({
  //    id:"", name:"", description:"", code:"", schoolYearId:"", createdBy:"",
  //   }))    
  //})();

}, [props.refreshState])



const canSave = [...Object.values(otherProps)].every(Boolean)
//const canSave = Object.values(course).every(Boolean)


  return (
    <Fragment>
      <p>New Course</p>    
      <NewCourseForm  handleSubmit={handleSubmit} handleChange={handleChange} course={course} canSave={canSave} SchoolYear={props.schoolYear}/>
    </Fragment>
   

  )
}

export default NewCourse