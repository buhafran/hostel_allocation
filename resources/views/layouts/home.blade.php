<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>Anyaloko Transport</title>

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

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
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
                    <nav class="navbar navbar-marketing navbar-expand-lg bg-transparent navbar-dark fixed-top">
                        <div class="container">
                            <a class="navbar-brand text-white" href="{{route('index')}}">    <img src="{{asset('img/anyaloko_logo.png')}}"><br>Anyaloko Transport</a><button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i data-feather="menu"></i></button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav ml-auto mr-lg-5">
                                    <li class="nav-item"><a class="nav-link" href="#">Home </a></li>
                                    <li class="nav-item"><a class="nav-link" href="#services">Services </a></li>
                                    <li class="nav-item"><a class="nav-link" href="#">Contacts </a></li>
                                    <li class="nav-item dropdown dropdown-xl no-caret">
                                        <a class="nav-link dropdown-toggle" id="navbarDropdownDemos" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Routes<i class="fas fa-chevron-right dropdown-arrow"></i></a>
                                        <div class="dropdown-menu dropdown-menu-right animated--fade-in-up mr-lg-n15" aria-labelledby="navbarDropdownDemos">
                                            <div class="row no-gutters">
                                                <div class="col-lg-5 p-lg-3 bg-img-cover overlay overlay-primary overlay-70 d-none d-lg-block" style='background-image: url("//source.unsplash.com/mqO0Rf-PUMs/500x350")'>
                                                    <div class="d-flex h-100 w-100 align-items-center justify-content-center">
                                                        <div class="text-white text-center z-1">
                                                            <div class="mb-3">View Our frequent routes</div>
                                                            <a class="btn btn-white btn-sm text-primary rounded-pill" href="#">Search</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-7 p-lg-5">
                                                    <div class="row">
                                                        <div class="col-lg-12">
                                                            <h5 class="dropdown-header text-primary">Our frequent Routes</h5>
                                                               <h6 class="dropdown-header ">Kano-Lagos (NGN 12,000)
                                                                
                                                               </h6>
                                                               <h6 class="dropdown-header ">Lagos-Kano (NGN 12,000)</h6>
                                                               <h6 class="dropdown-header ">Kano-Makurdi (NGN 5,500)</h6>
                                                               <h6 class="dropdown-header ">Makurdi-Kano (NGN 5,500)</h6>
                                                               <h6 class="dropdown-header ">Kano-Abuja (NGN 5,000)</h6>
                                                               <h6 class="dropdown-header ">Abuja-Kano (NGN 5,000)</h6>
                                                          
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="nav-item"><a class="nav-link" href="#">About Us </a></li>

                                </ul>
                                <a class="btn-teal btn rounded-pill px-4 ml-lg-4" href="#">Book Ticket<i class="fas fa-arrow-right ml-1"></i></a>
                            </div>
                        </div>
                    </nav>


                    @yield('content')
               
                </main>
            </div>
            <div id="layoutDefault_footer">
                <footer class="footer pt-10 pb-5 mt-auto bg-light footer-light">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-3">
                                <div class="footer-brand">Anyaloko Nigeria Limited</div>
                                <div class="mb-3">Our Social Media handles</div>
                                <div class="icon-list-social mb-5">
                                    <a class="icon-list-social-link" href="javascript:void(0);"><i class="fab fa-instagram"></i></a><a class="icon-list-social-link" href="javascript:void(0);"><i class="fab fa-facebook"></i></a><a class="icon-list-social-link" href="javascript:void(0);"><i class="fab fa-github"></i></a><a class="icon-list-social-link" href="javascript:void(0);"><i class="fab fa-twitter"></i></a>

                                </div>
                                <img src="{{asset('img/anyaloko_logo.png')}}">
                            </div>
                            <div class="col-lg-9">
                                <div class="row">
                                    <div class="col-lg-3 col-md-6 mb-5 mb-lg-0">
                                        <div class="text-uppercase-expanded text-xs mb-4">Services</div>
                                        <ul class="list-unstyled mb-0">
                                            <li class="mb-2"><a href="javascript:void(0);">Passengers</a></li>
                                            <li class="mb-2"><a href="javascript:void(0);">Percel</a></li>
                                            <li class="mb-2"><a href="javascript:void(0);">Courier</a></li>
                                            <li class="mb-2"><a href="javascript:void(0);">Dispatch</a></li>
                                            <li class="mb-2"><a href="javascript:void(0);">Haulage</a></li>
                                            <li class="mb-2"><a href="javascript:void(0);">Cargo</a></li>
                                            <li class="mb-2"><a href="javascript:void(0);">Fraight Marine</a></li>
                                            <li class="mb-2"><a href="javascript:void(0);">Logistics Services</a></li>
                                            
                                        </ul>
                                    </div>
                                   
                                    <div class="col-lg-9 col-md-6">
                                        <div class="text-uppercase-expanded text-xs mb-2">Contact Us </div>
                                         <div class="text-uppercase-expanded footer-brand mb-2">OUR  HEAD OFFICE, KANO</div>
  Address: Unguwa Uku Motor Park by Zaria Road, Opp. FGC Kano.
<br>
Tel: 0909400018, 08063553217, 09069360647, 07035763501


 <div class="text-uppercase-expanded footer-brand mb-2">MAKURDI OFFICE</div>
Address: Fedral Mass Transit Park, Adjacent Benue Links.<br>
Tel: 08066222682


 <div class="text-uppercase-expanded footer-brand mb-2"> LAGOS OFFICE</div>
Address: 234 Course Way Otto Bus-Stop, Ido.
<br> Tel: 08184576368
                                
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="my-5" />
                        <div class="row align-items-center">
                            <div class="col-md-6 small">Copyright &#xA9; Anyaloko Nigeria Limited</div>
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

  <!-- Bootstrap core JavaScript -->
  <script src="{{asset('vendor/jquery/jquery.min.js') }}"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js" integrity="sha512-2ImtlRlf2VVmiGZsjm9bEyhjGW4dU7B6TNwh/hx/iSByxNENtj3WVE6o/9Lj4TJeVXPi4bnOIMXFIJJAeufa0A==" crossorigin="anonymous"></script>
  <script src="{{ asset('vendor/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
  <script src="{{ asset('js/main1.min.js') }}"></script>
    <script src="//unpkg.com/aos@next/dist/aos.js"></script>

     <script>
            AOS.init({
                disable: 'mobile',
                duration: 600,
                once: true
            });
        </script>
<script type="text/javascript">
      function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

  $(document).ready(function(){

    $("#newBookingbtn").addClass("animate__flip");
        $('#booking_modal').on('show.bs.modal', function (event) {
      
     $('.select_input').select2();


})
  })
  </script>
  @yield('script')
</body>

</html>
