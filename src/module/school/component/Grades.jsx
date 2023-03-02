import React, {Fragment, useEffect, useState, useRef} from 'react'
import { useLocation, Link , useNavigate} from 'react-router-dom';
import useAxiosPrivate from '../../../shared/hook/useAxiosPrivate'
import Spinner from "../../../shared/component/Spinner";
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';

let Grades = (props) => {

const { state } = useLocation();
const axiosPrivate = useAxiosPrivate();
const [ErrMsg, setErrMsg] = useState('');
const [IsLoading, setIsLoading] = useState(false);

const [sleepTime] = useState(100);
const errRef = useRef();
const[Grades, SetGrades] =  useState('');
const navigate = useNavigate();

//const Grades3 =[{id:1, name: "Ron"},{id:2, name: "Bill"},{id:3, name: "Peter"}];
const [GradesDisplay, SetGradesDisplay] = useState('');

useEffect(()=>{

let isMounted = true;
const controller = new AbortController();

      (async () => {
          console.log("UseEffect is called to  load score data ....")
        try {
          setIsLoading(true);
          await littleSleep(sleepTime);
          const response = await axiosPrivate.get(`/score/getscoresbyenrollmentid/${state?.id}`, {signal: controller.signal});
          const GradesArray = [];     
                        if (response.status ==200) {                           
                            
                            isMounted && SetGrades(response.data);
                            for(let i = 0 ; i < response.data.length ; i++){                             
                                  var gradesObj = {
                                    GradeID :	response?.data[i]?.id,
                                    EnrollmentID	: response?.data[i]?.enrollmentID,
                                    AssessmentID	: response?.data[i]?.assessmentID,
                                    AssCode : response?.data[i]?.assessmentDto?.code,
                                    AssName : response?.data[i]?.assessmentDto?.name,
                                    AssWeight : response?.data[i]?.weight,
                                    AssGrade : response?.data[i]?.grade,
                                    AssDate : response?.data[i]?.assessmentDate,
                                    AssessedBy: response?.data[i]?.assessedBy,
                                    SubjectCode :  response?.data[i]?.assessmentDto?.subject?.code,
                                    Subject :  response?.data[i]?.assessmentDto?.subject?.name,
                                    TermId :   response?.data[i]?.assessmentDto?.term?.id,
                                    Term :   response?.data[i]?.assessmentDto?.term?.schTerm,
                                    CreatedBy: 	response?.data[i]?.createdBy,
                                  }

                              GradesArray.push(gradesObj);
                             }
                             
                             //GradesArray?.group(({Term}) => Term);
                             GradesArray.sort((a, b) => (a.Term - b.Term || a.AssWeight - b.AssWeight));
                              //|| a.AssWeight > b.AssWeight ? 1 : -1 //a.AssName.localeCompare(b.AssName)
                            
                             SetGradesDisplay(GradesArray);
                             //GradesDisplay.sort((a, b) => a.Term - b.Term);
                            //inventory.group(({ type }) => type);
                            
                        } else {
                            throw Error('Failed search record. Contact systems admin !');
                        }

                        console.log("Data is : " + JSON.stringify(GradesDisplay));
                        

        } catch (err) {
          console.log(err);
          if (!err?.response) {
            setErrMsg('No Server Response');
          } else if (err.response?.status === 409) {
            setErrMsg('Object may exist with data provided !');
          } else if (err.response?.status === 400) {
            setErrMsg('Invalid data provided');
          }else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
          }
          else {
            setErrMsg('Failed to get score data, contact systems admin !'+ err);
          }
        } finally {
          setIsLoading(false);
        }

      })();

      return () => {
        isMounted = false;
        controller.abort();
      }

},[])

const numAscending = [...Grades].sort((a, b) => a.grade?.assessmentDto?.term?.schTerm - b.grade?.assessmentDto?.term?.schTerm);


/*const sortedData = [...Grades].sort((a,b) =>{
   return a.grade.assessmentDto.term.schTerm > b.grade.assessmentDto.term.schTerm ? 1 : -1  
 })*/
  

  
let littleSleep = async (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

  return (
   <Fragment>
    <p>Course: {state?.courseEnrolled?.name}
    </p>

    <ToastContainer position={"top-right"} pouseOnHover={true} draggable={true} theme="colored"
        icon={<i className="fa fa-info-circle fa-sm text-danger" aria-hidden="true"></i>} />
      <section className="pt-1">
        <p ref={errRef} className={ErrMsg ? "errmsg" : "offscreen"} aria-live="assertive">{ErrMsg}</p>
      </section>
      <section>
        {IsLoading ? <Spinner /> : ''}
      </section>
     
      <Link to={'/user/enrollment'} className="btn btn-danger btn-sm  m-2"> back to course</Link>

     <button className="btn btn-danger btn-sm  m-2" onClick={()=>navigate(-1)}>Back to course</button>
     
      {
        Grades?.length > 0 ? 
        <section>
        <div className="row">
            <div className="col">
                <div className="table-responsive">
                    <table className="table    table-hover table-striped text-left">
                        <thead className="bg-danger text-white">
                            <tr>
                               
                                <td>Grade ID</td>
                                <td>EnrollmentID</td>
                                <td>AssessmentID</td>
                                <td>Code</td>
                                <td>Name</td>
                                <td>Weight</td>
                                <td>Grade</td>
                                <td>Date</td>
                                <td>AssessedBy</td>
                                <td>Subject code</td>
                                <td>Subject</td>
                                <td>TermId</td>
                                <td>Term</td>
                                <td>CreatedBy</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                               
                               GradesDisplay?.map(grade => {
                                    return (
                                           <tr key={grade?.GradeID} >
                                            
                                           <td>{grade?.GradeID}</td>
                                           <td>{grade?.EnrollmentID}</td>
                                           <td>{grade?.AssessmentID}</td>
                                           <td>{grade?.AssCode}</td>
                                           <td>{grade?.AssName}</td>
                                           <td>{grade?.AssWeight}</td>
                                           <td>{grade?.AssGrade}</td>
                                           <td>{grade?.AssDate}</td>
                                           <td>{grade?.AssessedBy}</td>
                                           <td>{grade?.SubjectCode}</td>
                                           <td>{grade?.Subject}</td>
                                           <td>{grade?.TermId}</td>
                                           <td>{grade?.Term}</td>
                                           <td>                                               
                                                {
                                                    (grade?.CreatedBy).length <= 5
                                                        ? grade?.CreatedBy
                                                        : `${(grade?.CreatedBy).slice(0, 7)}...`
                                                }
                                            </td>
                                            {/* <td>{grade?.enrollmentID}</td>
                                            <td>{grade?.assessmentID}</td>
                                             <td>{grade?.assessmentDto?.code}</td>
                                            <td>{grade?.assessmentDto?.name}</td>
                                            <td>{grade?.weight}</td>
                                            <td>{grade?.grade}</td>
                                            <td>{grade?.assessmentDate}</td>
                                            <td>{grade?.assessedBy}</td>
                                            <td>{grade?.assessmentDto?.subject?.code}</td>
                                            <td>{grade?.assessmentDto?.subject?.name}</td>
                                            <td>{grade?.assessmentDto?.term?.id}</td>
                                            <td>{grade?.assessmentDto?.term?.schTerm}</td>   
                                            <td>                                               
                                                {
                                                    (grade?.createdBy).length <= 5
                                                        ? grade?.createdBy
                                                        : `${(grade?.createdBy).slice(0, 10)}...`
                                                }
                                            </td> */}
                                        </tr>
                                    );
                                })


                              


                            }

                            {/* {
                              Grades4.map((gr => {
                                return (
                                  <tr>
                                    <td>{gr.GradeID}</td>
                                  </tr>
                                );
                              }))
                            } */}

                           
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
        :
        <p>No grades found !</p>

      }
     </Fragment>

  )
}

export default Grades