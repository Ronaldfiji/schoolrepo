import React, { Fragment, useEffect, useState, useRef } from "react";
import useAxiosPrivate from "../../../../shared/hook/useAxiosPrivate";
import Spinner from "../../../../shared/component/Spinner";
import Pagination from "../../../../shared/component/Pagination";

import { Link } from 'react-router-dom'

let UserList = (props) => {

    const [sleepTime] = useState(10);
    const [users, setUsers] = useState([]);
    const [FilteredUsers, setFilteredUsers] = useState([]);   
    const [PagingData, setPagingData] = useState({});    
    const [errorMessage, setErrorMessage] = useState('');
    const [IsLoading, setIsLoading] = useState(false);
    const [pageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [apiDataRequestPageNumber, setApiDataRequestPageNumber] = useState(1);
    const [apiDataRequestPageSize, setApiDataRequestPageSize] = useState(10);

    const axiosPrivate = useAxiosPrivate();
    const errRef = useRef();


    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();
        setErrorMessage('');
        setIsLoading(true);
        let getUsers = async () => {

            try {
                await littleSleep(sleepTime);
                let response = await axiosPrivate.get(`user/getusers?pageNumber=${apiDataRequestPageNumber}&pagesize=${apiDataRequestPageSize}`, {
                    signal: controller.signal 
                });                 
                
                isMounted && 
                setUsers(response.data.items);
                setPagingData(response.data.metaData);                
            }
            catch (err) {
              
                if (!err?.response) {
                    setErrorMessage('No Server Response ' + err);
                } else if (err.response?.status === 400) {
                    setErrorMessage('Invalid request data provided to API');
                } else if (err.response?.status === 404) {
                    setErrorMessage('Invalid credentials provided or Item does not exist !');
                } else if (err.response?.status === 401) {
                    setErrorMessage('Unauthorized');
                } else {
                    setErrorMessage('Failed to fetch data.' + err);
                }
                errRef.current.focus();
            } finally {
                setIsLoading(false);
            }
        };

        getUsers();
        return () => {
            isMounted = false;
            controller.abort();
        }

    }, [apiDataRequestPageNumber])

     // Get current posts
     const indexOfLastUser = currentPage * pageSize;
     const indexOfFirstUser = indexOfLastUser - pageSize;
     const currentUsers = FilteredUsers?.length > 0 ?
             FilteredUsers?.slice(indexOfFirstUser, indexOfLastUser) : 
             users?.slice(indexOfFirstUser, indexOfLastUser);

     // Reset Filterlist state
     useEffect( ()=>{
        if(searchTerm.length <= 0){
            console.log('use effiect hook fired to reset state ;')           
            setFilteredUsers([]);
            setApiDataRequestPageNumber(1);
        }
    },[ searchTerm.length <=0])
    
    
     // Change page
     const paginate = async (pageNumber) => {
       
        const totalPages = Math.ceil(apiDataRequestPageSize / pageSize)

        if (pageNumber > totalPages) {
           
            setApiDataRequestPageNumber(apiDataRequestPageNumber + 1);
            setCurrentPage(1)            
        }
        else if (pageNumber <= 0) {
            setApiDataRequestPageNumber(apiDataRequestPageNumber <= 1 ? 1 : apiDataRequestPageNumber - 1);
            setCurrentPage(1)
        }
        else {
            setCurrentPage(pageNumber);
        }
    };

    const SearchCustomer = async (e) => {
        e.preventDefault();       
        setCurrentPage(1);
        setIsLoading(true);
        setErrorMessage('');
        const columnName = "firstname";
            try {
                if (searchTerm.length > 0) {  

                    let response = await axiosPrivate.get(`/user/getusers?searchTerm=${searchTerm}
                    &columnName=${columnName}&pageNumber=${apiDataRequestPageNumber}&pageSize=${apiDataRequestPageSize}`);                                   
                   if (response) {                   

                         if (response?.data?.items?.length > 0) { 
                            setFilteredUsers(response?.data?.items);
                            setPagingData( response?.data?.metaData);                                                      
                        }
                        else {                           
                            setFilteredUsers([]);
                            setPagingData({}); 
                            setErrorMessage('No customer found with text: ' + searchTerm); 
                        }
                    }
                    else {
                        throw Error('Failed search record. Contact systems admin !');
                    }
                }
                else{                    
                    setFilteredUsers([]);
                    setPagingData({});   
                }

            } catch (err) {
                console.log('Error occured : ' + err);
                if (!err?.response) {
                    setErrorMessage('No Server Response ' + err);
                } else if (err.response?.status === 400) {
                    setErrorMessage('Invalid request data provided to API');
                } else if (err.response?.status === 404) {
                    setErrorMessage('Invalid credentials provided or Item does not exist !');
                } else if (err.response?.status === 401) {
                    setErrorMessage('Unauthorized');
                } else if (err.response?.status === 403) {
                    setErrorMessage('Unauthorized, does not have permission to execute action');
                } else {
                    setErrorMessage('Failed to fetch data.' + err);
                }
                errRef.current.focus();
            } finally {
                setIsLoading(false);
            }

        
    }


    let DeleteUser = async (userid) => {
        setErrorMessage('');
        setIsLoading(true);
        try{
                let confirmDelete = window.confirm("Delete?");
                if(confirmDelete){
                    let response = await axiosPrivate.delete(`user/delete/${userid}`);
                    if(response){
                        ClickRecord({});
                        const newUserList = users.filter(user => user.id !== userid);
                        setUsers(newUserList);
                        setErrorMessage('User has been successfully deleted !');
                        errRef.current.focus();
                    }
                }
            } catch (err) {
                
                    if (!err?.response) {
                        setErrorMessage('No Server Response ' + err);
                    } else if (err.response?.status === 400) {
                        setErrorMessage('Invalid request data provided to API');
                    } else if (err.response?.status === 404) {
                        setErrorMessage('Invalid credentials provided or Item does not exist !');
                    } else if (err.response?.status === 401) {
                        setErrorMessage('Unauthorized');
                    } else if (err.response?.status === 403) {
                        setErrorMessage('Unauthorized, does not have permission to execute action');
                    } else {
                        setErrorMessage('Failed to fetch data.' + err);
                    }
                    errRef.current.focus();
            } finally {
                setIsLoading(false);
            }
    }

    let ClickRecord = async (user) => {
        props.SendSelectedUser(user)
    }

    let littleSleep = async (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }

    return (
        <Fragment>
            <section>
                <div className="row" >
                    <div className="col" ref={errRef} >                     
                        <p ref={errRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>
                    </div>
                </div>
            </section>
            <section>
                <form onSubmit={SearchCustomer}>
                    <div className="row d-flex  ">
                        <div className="col mb-2">
                            <input
                                id='search'
                                type='text'
                                role='searchbox'
                                placeholder='Enter first name to search !'
                                value={searchTerm}
                                onChange={(e) => (setSearchTerm(e.target.value))}
                                className="form-control form-control-sm"
                            />
                        </div>
                        <div className="col-sm-3 mb-2">
                            <input type="submit" className="btn btn-outline-danger btn-sm form-control" value="Search" />
                        </div>
                    </div>
                </form>               
            </section>   

            {
                (IsLoading) ? <Spinner /> :
                    users?.length > 0 ?
                        <section>
                            <div className="row">
                                <div className="col">
                                    <div className="table-responsive">
                                        <table className="table    table-hover table-striped text-left">
                                            <thead className="bg-danger text-white">
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td> ID</td>
                                                    <td>Name</td>
                                                    <td>Email</td>
                                                    <td>Phone</td>
                                                    <td>City</td>
                                                    <td>State</td>
                                                    <td>Country</td>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    currentUsers ?.length > 0 &&
                                                    currentUsers ?.map(user => {
                                                        return (
                                                            <tr key={user.id} onClick={() => ClickRecord(user)} >
                                                                <td>
                                                                    <i className="fa fa-trash fa-xs text-danger ps-1 mouse-over" aria-hidden="true"
                                                                         onClick={() => DeleteUser(user?.id)}></i> 
                                                                </td>
                                                                <td>
                                                                    <Link to={`/admin/user/edit/${user?.id}`} className="btn btn-primary btn-sm mb-1">
                                                                        <i className="fa fa-pen fa-sm" aria-hidden="true"></i> </Link>
                                                                </td>
                                                                <td  >{user?.id}</td>
                                                                <td>{user?.firstName} {user.lastName}</td>
                                                                <td>{user?.email}</td>
                                                                <td>{user?.phone}</td>
                                                                <td>{user?.city}</td>
                                                                <td>{user?.state}</td>
                                                                <td>
                                                                    {/* {user.country} */}
                                                                    {
                                                                        (user?.country).length <= 10
                                                                            ? user?.country
                                                                            : `${(user?.country).slice(0, 15)}...`
                                                                    }
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

                        </section>
                        :
                        !errorMessage ?
                            <p>No record returned by api  !</p>
                            : ""
            }

            <section>
                <Pagination pageSize={pageSize} currentPage={currentPage} ApiReqPageNum={apiDataRequestPageNumber}
                    totalItems={FilteredUsers?.length ? FilteredUsers?.length : users?.length}
                    //totalItems={users?.length}
                    paginate={paginate} />
            </section>
            

        </Fragment>
    );

}

export default UserList;