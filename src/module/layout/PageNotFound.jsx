import React,{Fragment} from "react";
import { Link } from "react-router-dom";

let PageNotFound = () =>{
 return(
    <Fragment>
        <div>
            <p>Welcome , PageNotFound component </p>
        </div>
        <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <div className="flexGrow">
                <Link to="/">Visit Our Homepage</Link>
            </div>
        </article>
    </Fragment>
 )
}

export default PageNotFound;