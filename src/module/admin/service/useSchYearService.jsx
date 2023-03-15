//import useAxiosPrivate from '../../../shared/hook/useAxiosPrivate'
import axios from '../../../shared/hook/axios';

const  useSchYearService = ()=>{

    //const axiosPrivate = useAxiosPrivate();    

    const getSchoolYearList = async(pagesize) =>{  
            
        return await axios.get(`/schoolyear/getschoolyears?pageSize=${pagesize}`)             
    }

    return{getSchoolYearList};
}

export default useSchYearService;
