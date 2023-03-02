import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <div className="text-danger m-3">
            <h3>Unauthorized</h3>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <button onClick={goBack} className='btn btn-danger btn-sm w-25'>Go Back</button>
            </div>
            </div>
        </section>
    )
}

export default Unauthorized
