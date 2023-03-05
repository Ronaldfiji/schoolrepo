import React, { Fragment, useEffect, useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom';
import useAuth from '../../shared/hook/useAuth'
import useLogout from '../../shared/hook/useLogout'
import Spinner from "../../shared/component/Spinner";
import { ToastContainer, toast } from 'react-toastify';
import '../../index.css'
import './Header.css'

let Header = () => {

  let logout = useLogout();
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const [errMsg, setErrMsg] = useState('');
  const [IsLoading, setIsLoading] = useState(false);

  const signOff = async () => {
    try {
      setIsLoading(true);
      const res = await logout()
     
      if(res.status==204){            
        toast.success('Logged off successfully', { position: toast.POSITION.TOP_CENTER, autoClose: 3000, });
        navigate('/user/login', { replace: true });
      }
      else{        
        toast.error('LogOff failed: ' + errMsg, { position: toast.POSITION.TOP_CENTER, autoClose: 3000, });
      }
    }
    catch (err) {
          if (!err?.response) {
            setErrMsg('No Server Response' + err);
          } else if (err.response?.status === 400) {
            setErrMsg('Invalid payload !');
          } else if (err.response?.status === 404) {
            setErrMsg('User not found , 404 !');
          } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
          } else {
            setErrMsg('Logoff Failed : '+ err);
          }
          toast.error('LogOff failed: ' + errMsg, { position: toast.POSITION.TOP_CENTER, autoClose: 3000, });
    }
    finally {
      setIsLoading(false);
    }
  }


return (
    <Fragment>     
      <nav className="navbar navbar-expand-md navbar-dark fixed-top ps-1" >
        <div className="container-fluid">

        <Link to = '/' className="navbar-brand active" >
        <i className="fa fa-building-columns header-icon-color" />
          </Link>         
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" 
          aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
                <Link to='/' className="nav-link active" > Home</Link>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link" href="#">Contact Us</a>                   */}
                <Link to='/user/profile' className="nav-link" >Profile</Link>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link" href="#">Contact Us</a>                   */}
                <Link to='/user/signup' className="nav-link" > Registration</Link>
              </li>

              {/* <li className="nav-item">              
                <Link to='/employee' className="nav-link" > Employees</Link>
              </li>
              <li className="nav-item">
                <Link to='/contacts/home' className="nav-link" >Contacts Manager</Link>
              </li> */}

              <li className="nav-item">
                <a className="nav-link disabled" href="#" aria-disabled="true">Disabled</a>
              </li>
              
            <li className="nav-item dropdownV2 ">
              <a className="nav-link dropLink" href="#"  id="navbarDropdownMenuLink2" aria-expanded="false">
                Enrollment   <i className="fa fa-caret-down fa-xs"></i>
              </a>    
               <div className="dropdown-content">
               
               <Link to='/user/enrollment' className="nav-link" >Enroll</Link>
                <a className="dropdown-item1" href="#">Withdraw</a>
                <a className="dropdown-item1" href="#">Results</a>
              </div> 
            </li>

            <li className="nav-item dropdownV2">                
                <a className="nav-link dropLink" href="#"  id="navbarDropdownMenuLink" aria-expanded="false">
                Admin  <i className="fa fa-caret-down fa-xs"></i>
               </a> 
               <div className="dropdown-content">               
               <Link to='/admin/users' className="nav-link" >User Manager</Link>
                <a className="nav-link" href="#">Stage 1</a>
                <a className="dropdown-item" href="#">Stage 2</a>
                <a className="dropdown-item" href="#">Stage 3</a>
              </div> 
              </li>


            <li className="nav-item">
                <Link to='/aboutus' className="nav-link" >About Us</Link>
              </li>
            
            </ul>          

            <form className="d-flex">
              <input className="form-control form-control-sm me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-danger btn-sm me-2 text-light " type="submit">Search</button>
            </form>
            <div className="d-flex  btn-group nav-link-authenticate ">
              {/* <button type="button" className=" btn btn-light btn-sm text-dark me-1 ">Login</button> */}
              {
                  Object.keys(userInfo).length > 0 ?                   
                  <span className=' btn-group w-100 align-items-center justify-content-between'>                   
                  <Link to="/user/profile" className="link text-white  me-1 text-decoration-none me-2">Welcome,  {userInfo.given_name}</Link>
                  <i className="fa fa-sign-out fa-sm  text-white  m-2 mouse-over me-5" onClick={signOff} ></i>                   
                  </span>
                  : <Link to="user/login" className="btn btn-light btn-sm  me-1 text-danger">Login</Link>    
              }           
              
               {/* <Link to="auth/register" className="btn btn-primary btn-sm  me-1 " onClick={logoutUser}>Logout</Link>  */}
            
            </div>


          </div>
        </div>
      </nav>

    <section>
      {( IsLoading) ? <Spinner /> : ''}
      <ToastContainer position={"top-right"} pouseOnHover={true} draggable={true} theme="colored"
        icon={<i className="fa fa-info-circle fa-sm text-danger" aria-hidden="true"></i>} />
    </section>
    
    </Fragment>
  );
};

export default Header;