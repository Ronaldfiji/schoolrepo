import React, { Fragment,useState } from "react";
import UserList from "./Userlist";
import UserDetails from "./UserDetails";
import {ToastContainer } from 'react-toastify';

let Users = () => {

    let [user, setUser] = useState({});

    let ReceiveSelectedUser = async (user) => {       
        setUser(user);
    }
    return (
        <Fragment>          
            <section>              
                    <div className="row mt-2">
                        <div className="col-md-9">
                            <UserList SendSelectedUser={ReceiveSelectedUser}/>
                        </div>
                        <div className="col-md-3">
                            <UserDetails SelectedUser = {user}/> 
                        </div>
                    </div>             
            </section>
            <ToastContainer position={"top-right"} pouseOnHover={true} draggable={true} theme="colored"
        icon={<i className="fa fa-info-circle fa-sm text-danger" aria-hidden="true"></i>} />

        </Fragment>
    )
}

export default Users;