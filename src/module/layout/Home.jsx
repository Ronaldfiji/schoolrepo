import React, { Fragment } from "react";

let Home = () => {  
    
 
  
    return (
        <Fragment>           
           
            <main className="page-wrap">
                <div id="myCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000" data-bs-pause="false">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
                    
                    </div>
                    <div className="carousel-inner">

                        <div className="carousel-item active">
                            {/* <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777" /></svg>
                            */}
                           
                            <img  src={require('../../assets/siteimg/home/carousel/Img6.jpeg')} alt='img not found'></img>
                            <div className="container">
                                <div className="carousel-caption text-end">
                                    <h1>Experience Fiji</h1>
                                    <p>Tropical island paradise awaits you. Located in South Pacific ocean.</p>
                                    <p><a className="btn btn-lg btn-danger" href="#">Find more</a></p>
                                </div>
                            </div>
                        </div>

                        <div className="carousel-item">
                            {/* <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#9f2b68" /></svg>
                             */}                     
                                               
                            <img  src={require('../../assets/siteimg/home/carousel/Img4.jpeg')} alt='img not found'></img>
                            <div className="container">
                                <div className="carousel-caption">
                                    <h1>Another example headline.</h1>
                                    <p>Some representative placeholder content for the second slide of the carousel.</p>
                                    <p><a className="btn btn-lg btn-primary" href="#">Learn more</a></p>
                                </div>
                            </div>
                        </div>


                        <div className="carousel-item">
                            {/* <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777" /></svg>
                             */}
                            <img  src={require('../../assets/siteimg/home/carousel/Img1.jpeg')} alt='img not found'></img>
                            <div className="container">
                                <div className="carousel-caption text-end">
                                    <h1>One more for good measure.</h1>
                                    <p>Some representative placeholder content for the third slide of this carousel.</p>
                                    <p><a className="btn btn-lg btn-primary" href="#">Browse gallery</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                           <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#dc143c" /></svg>
                              <div className="container">                               
                                <div className="carousel-caption">
                                    <h1>My cruel tortured life.</h1>
                                    <p>Some representative placeholder content for the second slide of the carousel.</p>
                                    <p><a className="btn btn-lg btn-primary" href="#">Learn more</a></p>
                                </div>
                            </div>
                        </div>

                    </div>


                    <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>


               
                <div className="container marketing">
                    
                    <div className="album py-2 bg-light">
                        <div className="containerXX">
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                <div className="col">
                                    <div className="card shadow-sm">
                                        {/* <svg className="bd-placeholder-img card-img-top" width="100%" height="225" 
                                        xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail"
                                         preserveAspectRatio="xMidYMid slice" focusable="false">
                                            <title>Placeholder</title>
                                         <rect width="100%" height="100%" fill="#55595c"  >
                                         <img src={require('../../assets/siteimg/home/center/BaseImg.png')} alt="centerImages" />
                                         </rect>
                                         <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
                                         </svg> */}
                                         <img src={require('../../assets/siteimg/home/center/BaseImg.png')} alt="centerImages" 
                                         className="bd-placeholder-img card-img-top" width="100%" height="225"
                                         />

                                        <div className="card-body">
                                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-sm btn-outline-secondary">More Info</button>
                                                    <button type="button" className="btn btn-sm btn-outline-secondary">!</button>
                                                </div>
                                                <small className="text-muted">9 mins</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card shadow-sm">
                                        <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

                                        <div className="card-body">
                                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                                </div>
                                                <small className="text-muted">9 mins</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card shadow-sm">
                                        {/* <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> */}

                                       
                                        
                                         <div className="card-body">
                                         <iframe width="100%" height="337" src="https://www.youtube.com/embed/JRaakIL-N_s" title="Fiji Vacation Travel Guide | Expedia" 
                                        frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                        allowFullScreen={true}
                                        className="bd-placeholder-img card-img-top" ></iframe>

                                            {/* <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                                </div>
                                                <small className="text-muted">9 mins</small>
                                            </div> */}
                                        </div> 
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>













                    <hr className="featurette-divider" />

                    <div className="row featurette">
                        <div className="col-md-7">
                            <h2 className="featurette-heading">Golden sandy beaches of Fiji. <span className="text-muted">It’ll blow your mind.</span></h2>
                            <p className="lead">Some great placeholder content for the first featurette here. 
                            Imagine some exciting prose here.
                            Some great placeholder content for the first featurette here. 
                            Imagine some exciting prose here.
                            Some great placeholder content for the first featurette here. 
                            Imagine some exciting prose here.                            
                            Some great placeholder content for the first featurette here. 
                            Imagine some exciting prose here.                            
                            Some great placeholder content for the first featurette here. 
                            Imagine some exciting prose here.                            
                            Some great placeholder content for the first featurette here. 
                            Imagine some exciting prose here.                            
                            Some great placeholder content for the first featurette here. 
                            Imagine some exciting prose here.
                            Some great placeholder content for the first featurette here. 
                            Imagine some exciting prose here.
                            

                            </p>
                        </div>
                        <div className="col-md-5">
                             {/* <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                             width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" 
                             aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" 
                             focusable="false"><title>
                               Test 
                             </title>
                             <rect width="100%" height="100%" fill="#eee" />
                             <text x="50%" y="50%" fill="#aaa" dy=".3em"></text>                             
                             </svg>  */}
                             <div className="card shadow-sm ">
                             <video 
                                controls
                                loop
                                autoPlay={false}
                                muted={false}
                                preload="metadata"
                                poster={require('../../assets/siteimg/home/Clips/farm.jpg')}
                                src={require('../../assets/siteimg/home/Clips/Nursery.mp4')}
                               >                                    
                                </video>
                             </div> 
                        </div>
                    </div>

                    <hr className="featurette-divider" />

                    <div className="row featurette">
                        <div className="col-md-7 order-md-2">
                            <h2 className="featurette-heading">Oh yeah, it’s that good. <span className="text-muted">See for yourself.</span></h2>
                            <p className="lead">Another featurette? Of course. More placeholder content here to give you an idea of how this layout would work with some actual real-world content in place.</p>
                        </div>
                        <div className="col-md-5 order-md-1">
                            {/* <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee" /><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg> */}
                            <div className="card shadow-sm ">
                             <video 
                                controls
                                loop
                                autoPlay={false}
                                muted={false}
                                preload="metadata"
                                poster={require('../../assets/siteimg/home/Clips/phoneball.jpg')}
                                src={require('../../assets/siteimg/home/Clips/phoneball.mp4')}
                               >                                    
                                </video>
                             </div> 
                        </div>
                    </div>

                    <hr className="featurette-divider" />

                    <div className="row featurette">
                        <div className="col-md-7">
                            <h2 className="featurette-heading">And lastly, this one. <span className="text-muted">Checkmate.</span></h2>
                            <p className="lead">And yes, this is the last block of representative placeholder content.
                             Again, not really intended to be actually read, simply here to give you a better view of 
                             what this would look like with some actual content. Your content.</p>
                             <p>Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands.
                             Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands.
                             Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands.
                             Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands.
                             Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands.
                             Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands.
                             Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands.
                             Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands.
                             Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands.
                             Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands.
                             Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands.
                             Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands.
                             Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands.
                             Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands.
                             Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands.
                             Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands. Test, by Ronald. Fiji Islands.
                             ************* End Of home page ***************************
                             </p>
                        </div>
                        <div className="col-md-5">
                            <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee" /><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg>

                        </div>
                    </div>

                    <hr className="featurette-divider" />
                </div>
            </main>
        </Fragment>
    )
};

export default Home


// <button className="btn btn-primary m-5" onClick={()=> (getAllUsers())}> Call karo</button>
// <input type="submit" onClick={getAllUsers} value="Get User data" className="btn btn-primary btn-sm m-5"/>             
// <button  className="btn btn-primary m-5" onClick={secondCall}> Call Now </button>    
