import React, { Fragment, useRef } from 'react'


const NewCourseForm = ({handleSubmit, handleChange, course, canSave, SchoolYear} ) => {
   
    const cnameRef = useRef();

  return (
      <Fragment>
          <section>
              <hr />            
              <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                      <div className=" col-sm-4">
                          <label htmlFor="name" className="form-label">Course name</label>
                          <input type="text"
                              ref={cnameRef}
                              required
                              autoFocus
                              autoComplete="off"
                              value={course.name}
                              onChange={handleChange}
                              className="form-control form-control-sm"
                              name="name"
                              id="name"
                              placeholder="Course name"
                              pattern="([A-Z])[\w+.]{1,}" />
                      </div>
                      <div className=" col-sm-4">
                          <label htmlFor="code" className="form-label">Code</label>
                          <input type="text"
                              required
                              value={course.code}
                              onChange={handleChange}                             
                              maxLength="9"
                              className="form-control form-control-sm" id="code" name="code" placeholder="Last name" />
                      </div>
                      <div className=" col-sm-4">
                          <label htmlFor="description" className="form-label">Description</label>
                          <input type="text"
                              required
                              value={course.description}
                              onChange={handleChange}                             
                              maxLength="100"
                              pattern="([A-Z])[\w\s.]{1,}"
                              className="form-control form-control-sm" id="description" name="description" placeholder="Description" />
                      </div>
                      <div className=" col-sm-4">
                            <label htmlFor="schoolyear" className="form-label">School Year</label>
                            <select className="form-select form-select-sm" 
                                id="schoolYearId"
                                name="schoolYearId"
                                value={course.schoolYearId}
                                onChange={handleChange}
                            >
                                <option value="">Select School Year</option>
                                {    
                                   SchoolYear !== null && SchoolYear !== undefined &&                                
                                    SchoolYear.map(sy => {
                                        return (
                                            <option key={sy.id} value={sy.id}> Year {sy.year}</option>
                                        )
                                    })
                                }
                            </select>
                        </div> 
                      <div className=" col-sm-4">
                          <label htmlFor="createdBy" className="form-label">Created By</label>
                          <input type="text"
                              required
                              value={course.createdBy}
                              onChange={handleChange}                             
                              maxLength="100"
                              pattern="([A-Z])[\w\s.]{1,}"
                              className="form-control form-control-sm" id="createdBy" name="createdBy" placeholder="John Black" />
                      </div>     
                  <div className=" col-sm-4">
                            <br/>
                             <input type="submit" className='btn btn-primary btn-sm mt-2 form-control form-control-sm' 
                             value="Add Course" disabled={!canSave} onClick={() => cnameRef.current.focus()}/>                             
                  </div>

                  </div>
              </form>
          </section>
      </Fragment>
  )
}

export default NewCourseForm