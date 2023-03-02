import React, { Fragment, useState } from "react";
import format from "date-fns/format";

let UserDetails = (props) => {

    let { SelectedUser } = props;

    let profilePic = ''
    // {

    //     try {
    //         if (selectedEmployee.pictureUrl !== "" && String( selectedEmployee.pictureUrl) !== "undefined") {

    //             profilePic = require(`${'../../../assets/'}${selectedEmployee.pictureUrl}`);                

    //         }
    //     } catch (error) {
    //         console.log("Error mapping img path:" + error);
    //     }
    // }

  

    return (
        <Fragment>

            {
                Object.keys(SelectedUser).length > 0 &&
                <div className="card shadow-lg sticky-top  p-1  align-items-stretch ">        
                    {
                        SelectedUser?.userPictures[0]?.path != null ?                           
                                <img src={`https://localhost/${SelectedUser.userPictures[0].path}`} alt="Responsive image"
                                    className="img-thumbnail  img-fluid img-responsive" style={{maxHeight:'250px'}}/>                       
                            : ""
                    }

                    <div className="card-body">
                        <ul className="list-group" >
                            <li className="list-group-item">
                                {SelectedUser.firstName} {SelectedUser.lastName}
                            </li>
                            <li className="list-group-item">
                                {SelectedUser.email}
                            </li>
                            <li className="list-group-item">
                                {SelectedUser.phone}
                            </li>
                            <li className="list-group-item">
                                {SelectedUser.gender}
                            </li>
                            <li className="list-group-item">
                                {
                                    SelectedUser?.dob ?
                                        format((new Date(SelectedUser?.dob)), "dd-MM-yyyy")
                                        : ""
                                }
                            </li>
                            <li className="list-group-item">
                                {SelectedUser.addressLine1} ,{" "}, {SelectedUser.addressLine2}
                            </li>
                            <li className="list-group-item">
                                {SelectedUser.city}
                            </li>
                            <li className="list-group-item">
                                {SelectedUser.country}
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default UserDetails;