import useAxiosPrivate from '../../../shared/hook/useAxiosPrivate'

const useCourseService = ()=>{

    const axiosPrivate = useAxiosPrivate();    

    const getCourseList = async(pagesize) =>{  
            
        return await axiosPrivate.get(`/course/getcourses?pageSize=${pagesize}`)             
    }

    const addCourse = async(course) =>{

        return await axiosPrivate.post(`/course/create`, course)             
    }
    const editCourse = async(course) =>{

        return await axiosPrivate.patch(`/course/update/${course.id}`, course)             
    } 
    const deleteCourse = async(courseId) =>{
        return await axiosPrivate.delete(courseId);
    }

    const deleteCourses = async(courselist) =>{
        await littleSleep(500);
        return await axiosPrivate.post(`/course/deleteitems`, courselist);
    }

    let littleSleep = async (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }

    return{getCourseList, addCourse, editCourse, deleteCourse, deleteCourses};
}

export default useCourseService;