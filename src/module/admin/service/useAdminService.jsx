import React, { Fragment, useEffect, useState, useRef } from "react";
//import useAxiosPrivate from "../../../../shared/hook/useAxiosPrivate";
import axios from "../../../shared/hook/axios";


const useAdminService = () =>{


// let getUsers = async (pagesize, pageNumber, signal)=>{

//     const axiosPrivate = useAxiosPrivate();

//     try{
//         var response = await axiosPrivate.get(`user/getusers?pagesize=${pagesize}&pageNumber=${pageNumber}`, signal);
//             return response;
//     }catch(err){
//         console.log(err);
//     }
//     return getUsers;
// }

const getAllUserRoles = async() =>{
    try{
        return await axios.get(`role/getroles?pagesize=${100}`)
        
    }catch(err){
        console.log(err);
    }   
}

const testFunction = async ()=>{        
    return "data";
}

return {getAllUserRoles, testFunction};

}
export default useAdminService;