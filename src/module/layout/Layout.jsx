import React, { Fragment } from "react";
import { Outlet } from "react-router-dom"

let Layout = () =>{

    return(
        <Fragment>
            <div className="container page-wrap">
                <Outlet/>
            </div>
        </Fragment>
    )
}

export default Layout;