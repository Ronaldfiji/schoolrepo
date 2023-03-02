import React, { Fragment } from "react";
import spinnerImg from '../../assets/generic/loading.gif'


let Spinner = () => {
    return (
        <Fragment>
            <div >
                <img src={spinnerImg} alt="" style={{ width: '100px' }}
                    className="d-block m-auto" />
                    <p className="text-info  d-flex aligns-items-center justify-content-center">Loading... ... ...</p>
            </div>
        </Fragment>
    )

}

export default Spinner;

// require('../../assets/genric/loading.gif')