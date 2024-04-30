<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>{{ config('app.name', '') }}</title>

  <!-- Custom fonts for this template-->
  <link href="{{ asset('vendor/fontawesome-free/css/all.min.css') }}" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

  <!-- Custom styles for this template-->
   <link href="{{ asset('vendor/datatables/dataTables.bootstrap4.min.css') }}" rel="stylesheet">
   <link href="//cdn.datatables.net/buttons/1.6.2/css/buttons.bootstrap4.min.css" rel="stylesheet">
   <link href="https://cdnjs.cloudflare.com/ajax/libs/tempusdominus-bootstrap-4/5.0.1/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet">

  <link href="{{ asset('css/main.min.css') }}" rel="stylesheet">
  <link href="{{ asset('css/app.css?v=1.2') }}" rel="stylesheet">
  <style>
  .loader:empty {
  position: absolute;
  top: calc(50% - 4em);
  left: calc(50% - 4em);
  width: 6em;
  height: 6em;
  border: 1.1em solid rgba(0, 0, 0, 0.2);
  border-left: 1.1em solid #000000;
  border-radius: 50%;
  animation: load8 1.1s infinite linear;
}

@keyframes load8 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
  </style>

</head>

<body id="page-top">

<div id="app" class="loader"></div>

   <form id="logout-form" action="#" method="POST" style="display: none;">
   @csrf
   </form>
  <!-- Bootstrap core JavaScript-->

 <script src="{{ asset('js/app.js?v=1.2') }}"></script>
  <script src="{{ asset('vendor/bootstrap/js/bootstrap.bundle.min.js') }}"></script>

  <!-- Core plugin JavaScript-->
  <script src="{{ asset('vendor/jquery-easing/jquery.easing.min.js') }} "></script>
  <script src="{{ asset('vendor/datatables/jquery.dataTables.min.js') }} "></script>
  <script src="{{ asset('vendor/datatables/dataTables.bootstrap4.min.js') }} "></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tempusdominus-bootstrap-4/5.0.1/js/tempusdominus-bootstrap-4.min.js"></script>

  <script src="//cdn.datatables.net/buttons/1.6.2/js/dataTables.buttons.min.js"></script>
  <script src="//cdn.datatables.net/buttons/1.6.2/js/buttons.bootstrap4.min.js"></script>
  <script src="//cdn.datatables.net/buttons/1.6.2/js/buttons.print.min.js "></script>
  <script src="https://cdn.datatables.net/buttons/1.6.2/js/buttons.html5.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
  <!-- <script src="https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js"></script> -->
  <script src="https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js"></script>
    
  <!-- Custom scripts for all pages-->
  <script src="{{ asset('js/main.min.js') }}"></script>
  <script type="text/javascript">
    $(document).ready( function () {
   // $('.dataTable').DataTable();
     $('#datetimepicker1').datetimepicker({
    format: 'DD/MM/YYYY HH:mm'
  });
} );
  </script>
</body>

</html>
