<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content />
        <meta name="author" content />
        <meta name="keywords" content="FAABZ Logistics, FAABZ Nigeria, Online Store, Home Delivery, Food Delivery" />
        <title>FAABZ Logistics</title>
          <!-- Bootstrap core CSS -->
  <link href="{{ asset('vendor/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet">

  <!-- Custom fonts for this template -->
    <link rel="stylesheet" href="//unpkg.com/aos@next/dist/aos.css" />
  <link href="{{ asset('vendor/fontawesome-free/css/all.min.css" rel="stylesheet') }}">
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css" integrity="sha512-nMNlpuaDPrqlEls3IX/Q56H36qvBASwb3ipuo3MxeWbsQB1881ox0cRv7UPTgBlriqoynt35KjEwgGUeUXIPnw==" crossorigin="anonymous" />
  <link href="{{ asset('vendor/simple-line-icons/css/simple-line-icons.css') }}" rel="stylesheet" type="text/css">
  <link href="//fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css">
  <link
    rel="stylesheet"
    href="//cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css"
  />
     <script data-search-pseudo-elements defer src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/js/all.min.js" crossorigin="anonymous"></script>
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <script src="//cdnjs.cloudflare.com/ajax/libs/feather-icons/4.24.1/feather.min.js" crossorigin="anonymous"></script>
  <!-- Custom styles for this template -->
  <link href="{{ asset('css/landing-page1.min.css')}}" rel="stylesheet">
<style type="text/css">
  
.topnav {
  overflow: hidden;
  background-color: #117a8b;
}

.topnav a {
  float: right;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #4CAF50;
  color: white;
}

.topnav .icon {
  display: none;
}
.navbar-marketing{
    padding-bottom: 0;
    padding-top: 0;
}
.card-flag-red{
    background-color: red;
    color: #fff;
}
@media screen and (min-width: 600px) {
#second-nav{
    height: 60px;
}

}
@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
  #second-nav{
    padding-bottom: 5px;
  }
  #search-button{
    display: none;
  }
  #brand-large-screen{
    display: none;
}
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
    </head>
    <body>
        <div id="layoutDefault">
            <div id="layoutDefault_content">
                <main>
                        <h1 class="sr-only" >Welcome to FAABZ Logistics </h1>
                        <p class="sr-only">Fastest and better delivery! We value your time</p>
                    <nav class="navbar navbar-marketing navbar-expand-lg bg-white navbar-light">
                        <div class="container">
                            <a class="navbar-brand text-dark" href="index.html">
                                <a href="offer.html" id="brand-large-screen">   <img src="site/faabzlogo.png" class="img-head hidden-xs-down" alt="" height="80px"/>  </a>
                        </a>    

                         <label class="sr-only" for="inputSearch">Search for products </label><input class="form-control form-control-solid rounded-pill" id="inputSearch" type="text" placeholder="Search for products"  />
                          {{-- <button class="btn btn-red btn-block btn-marketing rounded-pill" id="search-button"type="submit" >Search</button> --}}
                          
                    
                    </div>
                    </nav>

                        <nav class="navbar navbar-marketing navbar-expand-lg bg-white navbar-light" id ="second-nav">
                         <div class="container" >
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i data-feather="menu"></i></button>

                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav ml-auto mr-lg-5">
                                    <li class="nav-item"><a class="nav-link" href="index.html">Home </a></li>
                                    <li class="nav-item dropdown dropdown-xl no-caret">
                                        <a class="nav-link dropdown-toggle" id="navbarDropdownDemos" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Kitchen<i class="fas fa-chevron-right dropdown-arrow"></i></a>
                                        <div class="dropdown-menu dropdown-menu-right animated--fade-in-up mr-lg-n15" aria-labelledby="navbarDropdownDemos">
                                            <div class="row no-gutters">
                                                <div class="col-lg-3 p-lg-3 bg-img-cover overlay overlay-primary overlay-70 d-none d-lg-block" style='background-image: url("https://source.unsplash.com/mqO0Rf-PUMs/500x350")'>
                                                    <div class="d-flex h-100 w-100 align-items-center justify-content-center">
                                                        <div class="text-white text-center z-1">
                                                           
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-9 p-lg-5">
                                                    <div class="row">
                                                        <div class="col-lg-4">
                                                            <h6 class="dropdown-header text-primary">Applications</h6>
                                                            <a class="dropdown-item" href="landing-app-mobile.html">Mobile App</a><a class="dropdown-item" href="landing-app-desktop.html">Desktop App</a>
                                                            <div class="dropdown-divider border-0"></div>
                                                          
                                                        </div>
                                                        <div class="col-lg-4">
                                                            <h6 class="dropdown-header text-primary">Personal</h6>
                                                            <a class="dropdown-item" href="landing-resume.html">Resume</a><a class="dropdown-item" href="landing-portfolio.html">Portfolio</a>
                                                            <div class="dropdown-divider border-0"></div>
                                                            
                                                        </div>
                                                        <div class="col-lg-4">
                                                            <h6 class="dropdown-header text-primary">Personal</h6>
                                                            <a class="dropdown-item" href="landing-resume.html">Resume</a><a class="dropdown-item" href="landing-portfolio.html">Portfolio</a>
                                                            <div class="dropdown-divider border-0"></div>
                                                           
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                
                                    <li class="nav-item dropdown no-caret">
                                        <a class="nav-link dropdown-toggle" id="navbarDropdownDocs" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Documentation<i class="fas fa-chevron-right dropdown-arrow"></i></a>
                                        <div class="dropdown-menu dropdown-menu-right animated--fade-in-up" aria-labelledby="navbarDropdownDocs">
                                          
                                            <div class="dropdown-divider m-0"></div>
                                            <a class="dropdown-item py-3" href="https://docs.startbootstrap.com/sb-ui-kit-pro/components" target="_blank"
                                                ><div class="icon-stack bg-primary-soft text-primary mr-4"><i class="fas fa-code"></i></div>
                                                <div>
                                                    <div class="small text-gray-500">Components</div>
                                                    Code snippets and reference
                                                </div></a
                                            >
                                            <div class="dropdown-divider m-0"></div>
                                            <a class="dropdown-item py-3" href="https://docs.startbootstrap.com/sb-ui-kit-pro/changelog" target="_blank"
                                                ><div class="icon-stack bg-primary-soft text-primary mr-4"><i class="fas fa-file"></i></div>
                                                <div>
                                                    <div class="small text-gray-500">Changelog</div>
                                                    Updates and changes
                                                </div></a
                                            >
                                        </div>
                                    </li>
                                </ul>
                             {{--    <a class="btn-primary btn rounded-pill px-4 ml-lg-4" href="https://shop.startbootstrap.com/sb-ui-kit-pro">Buy Now<i class="fas fa-arrow-right ml-1"></i></a> --}}
                                 <a class="btn   ml-lg-4" href="https://shop.startbootstrap.com/sb-ui-kit-pro"><i class="fas fa-user ml-1"></i> Login</a>
                            </div>
                               ..
                                       <a class=" btn ml-lg-4" href="https://shop.startbootstrap.com/sb-ui-kit-pro"><i class="fas fa-shopping-cart ml-1"></i> Cart</a>
                        </div>
                    </nav>

                              <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                          <ol class="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                          </ol>
                          <div class="carousel-inner">
                            <div class="carousel-item active">
                              <img class="d-block w-100" src="site/images/ba1.jpg" alt="First slide">
                            </div>
                            <div class="carousel-item">
                              <img class="d-block w-100" src="site/images/ba2.jpg" alt="Second slide">
                            </div>
                            <div class="carousel-item">
                              <img class="d-block w-100" src="site/images/ba1.jpg" alt="Third slide">
                            </div>
                          </div>
                          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                          </a>
                          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                          </a>
                        </div>
              
                    <section class="bg-white py-10">
                        <div class="container">
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <h2 class="mb-0">Featured Listings</h2>
                                <a class="btn btn-sm btn-primary d-inline-flex align-items-center" href="#!">See more<i class="ml-1" data-feather="arrow-right"></i></a>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 mb-5 mb-lg-0">
                                    <a class="card lift h-100" href="#!"
                                        ><div class="card-flag card-flag-red card-flag-top-right">Listed 1 month</div>
                                        <img class="card-img-top" src="https://source.unsplash.com/2d4lAQAlbDA/800x500" alt="..."/>
                                        <div class="card-body">
                                            <div class="small text-gray-800 font-weight-400">Home brewd blahsh sjajha ajhjajah ajh(1kg)</div>
                                            <h3 class="text-primary mb-0">NGN 5,999</h3>
                                            <div class="small text-gray-500">Picsard, GA</div>
                                        </div>
                                        <div class="card-footer bg-transparent border-top d-flex align-items-center justify-content-between">
                                            <center> <button class="btn btn-info">ADD TO CART</button></center>
                                         </div>
                                    </a>
                                </div>
                                <div class="col-lg-3 mb-5 mb-lg-0">
                                    <a class="card lift h-100" href="#!"
                                        ><div class="card-flag card-flag-red card-flag-top-right">Listed 6 days</div>
                                        <img class="card-img-top" src="https://source.unsplash.com/MP0bgaS_d1c/800x500" alt="..."/>
                                        <div class="card-body">
                                            <div class="small text-gray-800 font-weight-500">3 bd | 2 ba | 1,350 sqft</div>
                                            <h3 class="text-primary mb-0">NGN 3,000</h3>
                                            <div class="small text-gray-500">Sartalik, GA</div>
                                        </div>
                                        <div class="card-footer bg-transparent border-top d-flex align-items-center justify-content-between">
                                            <div class="small text-gray-500">View listing</div>
                                            <div class="small text-gray-500"><i data-feather="arrow-right"></i></div></div
                                    ></a>
                                </div>
                             
                            </div>
                        </div>
                    </section>
                    <hr class="my-0" />
                    <section class="bg-white py-10">
                        <div class="container">
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <h2 class="mb-0">Newest Listings</h2>
                                <a class="btn btn-sm btn-primary d-inline-flex align-items-center" href="#!">See more<i class="ml-1" data-feather="arrow-right"></i></a>
                            </div>
                            <div class="row">
                                <div class="col-lg-4 mb-5 mb-lg-0">
                                    <a class="card lift h-100" href="#!"
                                        ><div class="card-flag card-flag-dark card-flag-top-right">Listed 3 days</div>
                                        <img class="card-img-top" src="https://source.unsplash.com/561igiTyvSk/800x500" alt="..."/>
                                        <div class="card-body">
                                            <h3 class="text-primary mb-0">$556,999</h3>
                                            <div class="small text-gray-800 font-weight-500">5 bd | 3 ba | 2,420 sqft</div>
                                            <div class="small text-gray-500">Sartalik, GA</div>
                                        </div>
                                        <div class="card-footer bg-transparent border-top d-flex align-items-center justify-content-between">
                                            <div class="small text-gray-500">View listing</div>
                                            <div class="small text-gray-500"><i data-feather="arrow-right"></i></div></div
                                    ></a>
                                </div>
                                <div class="col-lg-4 mb-5 mb-lg-0">
                                    <a class="card lift h-100" href="#!"
                                        ><div class="card-flag card-flag-dark card-flag-top-right">Listed 5 days</div>
                                        <img class="card-img-top" src="https://source.unsplash.com/IYfp2Ixe9nM/800x500" alt="..."/>
                                        <div class="card-body">
                                            <h3 class="text-primary mb-0">$384,000</h3>
                                            <div class="small text-gray-800 font-weight-500">4 bd | 2 ba | 1,750 sqft</div>
                                            <div class="small text-gray-500">Picsard, GA</div>
                                        </div>
                                        <div class="card-footer bg-transparent border-top d-flex align-items-center justify-content-between">
                                            <div class="small text-gray-500">View listing</div>
                                            <div class="small text-gray-500"><i data-feather="arrow-right"></i></div></div
                                    ></a>
                                </div>
                                <div class="col-lg-4">
                                    <a class="card lift h-100" href="#!"
                                        ><div class="card-flag card-flag-dark card-flag-top-right">Listed 1 week</div>
                                        <img class="card-img-top" src="https://source.unsplash.com/XbwHrt87mQ0/800x500" alt="..."/>
                                        <div class="card-body">
                                            <h3 class="text-primary mb-0">$349,999</h3>
                                            <div class="small text-gray-800 font-weight-500">3 bd | 2 ba | 1,231 sqft</div>
                                            <div class="small text-gray-500">Sartalik, GA</div>
                                        </div>
                                        <div class="card-footer bg-transparent border-top d-flex align-items-center justify-content-between">
                                            <div class="small text-gray-500">View listing</div>
                                            <div class="small text-gray-500"><i data-feather="arrow-right"></i></div></div
                                    ></a>
                                </div>
                            </div>
                        </div>
                        <div class="svg-border-rounded text-light">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.54 17.34" preserveAspectRatio="none" fill="currentColor"><path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0" /></svg>
                        </div>
                    </section>

                    <hr class="my-0" />
                </main>
            </div>
            <div id="layoutDefault_footer">
                <footer class="footer pt-10 pb-5 mt-auto bg-white footer-light">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-3">
                                <img src="site/faabzlogo.png" class="img-head hidden-xs-down" alt="" height="100px"/>  </a>
                                <div class="footer-brand">FAABZ Nigeria</div>
                                <div class="mb-3"></div>
                                <div class="mb-3">Build better websites</div>
                                <div class="icon-list-social mb-5">
                                    <a class="icon-list-social-link" href="javascript:void(0);"><i class="fab fa-instagram"></i></a><a class="icon-list-social-link" href="javascript:void(0);"><i class="fab fa-facebook"></i></a><a class="icon-list-social-link" href="javascript:void(0);"><i class="fab fa-github"></i></a><a class="icon-list-social-link" href="javascript:void(0);"><i class="fab fa-twitter"></i></a>
                                </div>
                            </div>
                            <div class="col-lg-9">
                                <div class="row">
                                    <div class="col-lg-3 col-md-6 mb-5 mb-lg-0">
                                        <div class="text-uppercase-expanded text-xs mb-4">Sections</div>
                                        <ul class="list-unstyled mb-0">
                                            <li class="mb-2"><a href="javascript:void(0);">Kitchen</a></li>
                                            <li class="mb-2"><a href="javascript:void(0);">Pages</a></li>
                                            <li class="mb-2"><a href="javascript:void(0);">Sections</a></li>
                                            <li class="mb-2"><a href="javascript:void(0);">Documentation</a></li>
                                            <li><a href="javascript:void(0);">Changelog</a></li>
                                        </ul>
                                    </div>
                                    <div class="col-lg-3 col-md-6 mb-5 mb-lg-0">
                                        <div class="text-uppercase-expanded text-xs mb-4">Technical</div>
                                        <ul class="list-unstyled mb-0">
                                            <li class="mb-2"><a href="javascript:void(0);">Documentation</a></li>
                                            <li class="mb-2"><a href="javascript:void(0);">Changelog</a></li>
                                            <li class="mb-2"><a href="javascript:void(0);">Theme Customizer</a></li>
                                            <li><a href="javascript:void(0);">UI Kit</a></li>
                                        </ul>
                                    </div>
                                    <div class="col-lg-3 col-md-6 mb-5 mb-md-0">
                                        <div class="text-uppercase-expanded text-xs mb-4">Includes</div>
                                        <ul class="list-unstyled mb-0">
                                            <li class="mb-2"><a href="javascript:void(0);">Utilities</a></li>
                                            <li class="mb-2"><a href="javascript:void(0);">Components</a></li>
                                            <li class="mb-2"><a href="javascript:void(0);">Layouts</a></li>
                                            <li class="mb-2"><a href="javascript:void(0);">Code Samples</a></li>
                                            <li class="mb-2"><a href="javascript:void(0);">Products</a></li>
                                            <li class="mb-2"><a href="javascript:void(0);">Affiliates</a></li>
                                            <li><a href="javascript:void(0);">Updates</a></li>
                                        </ul>
                                    </div>
                                    <div class="col-lg-3 col-md-6">
                                        <div class="text-uppercase-expanded text-xs mb-4">Legal</div>
                                        <ul class="list-unstyled mb-0">
                                            <li class="mb-2"><a href="javascript:void(0);">Privacy Policy</a></li>
                                            <li class="mb-2"><a href="javascript:void(0);">Terms and Conditions</a></li>
                                            <li><a href="javascript:void(0);">License</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="my-5" />
                        <div class="row align-items-center">
                            <div class="col-md-6 small">Copyright &#xA9; faabznigeria.com</div>
                            <div class="col-md-6 text-md-right small">
                                <a href="javascript:void(0);">Privacy Policy</a>
                                &#xB7;
                                <a href="javascript:void(0);">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
      <script src="{{asset('vendor/jquery/jquery.min.js') }}"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js" integrity="sha512-2ImtlRlf2VVmiGZsjm9bEyhjGW4dU7B6TNwh/hx/iSByxNENtj3WVE6o/9Lj4TJeVXPi4bnOIMXFIJJAeufa0A==" crossorigin="anonymous"></script>
  <script src="{{ asset('vendor/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
  <script src="{{ asset('js/main1.min.js') }}"></script>
    <script src="//unpkg.com/aos@next/dist/aos.js"></script>
      
    </body>
</html>
