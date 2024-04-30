@extends('layouts.auth')

@section('content')
    <!-- Outer Row -->
    <div class="row justify-content-center">

      <div class="col-xl-10 col-lg-12 col-md-9">
    <br>
            <br>
            <br>

           
        <div class="card o-hidden border-0 shadow-lg my-5 mb-5">

          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Welcome!</h1>

                                    <span class="text-danger" role="alert" id="loginError">
                                @error('email')
                                        <strong>{{ $message }}</strong>
                                @enderror
                                <br>
                                    </span>
                  </div>
                  <form  name="loginForm" class="user" method="POST" action="{{ route('login') }}">
                        @csrf
                    <div class="form-group">
                      <input type="email"
                       id="email" class="form-control form-control-user @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus aria-describedby="emailHelp" placeholder="Enter Email Address...">
                          @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                    </div>
                    <div class="form-group">
                      <input type="password" name="password" class="form-control form-control-user @error('password') is-invalid @enderror" id="exampleInputPassword" placeholder="Password" autocomplete="current-password">
                    </div>
                    <div class="form-group">
                      <div class="custom-control custom-checkbox small">
                        <input type="checkbox" class="custom-control-input" id="customCheck">
                        <label class="custom-control-label" for="customCheck" {{ old('remember') ? 'checked' : '' }}>Remember Me</label>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-user btn-block disable_login" >
                      Login
                    </button>

                    <p class="text-success" id="loginSuccess"></p>
                    <hr>
               
                  </form>
                  <hr>
                  <div class="text-center">
                         @if (Route::has('password.request'))
                                    <a class=" small  btn-link" href="{{ route('password.request') }}">
                                        {{ __('Forgot Your Password?') }}
                                    </a>
                                @endif
                  
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

@endsection
@section('script')
<script type="text/javascript">

$(document).ready(function(){

    localStorage.clear();
    $('form[name=loginForm]').submit(function(e){
        e.preventDefault();
            $('#loginSuccess').html("");
            $('#loginError').html("")
        $('.disable_login').attr('disabled',false);
        axios.post('{{route('api.login')}}', $(this).serialize()).then(function(response){
            console.log(response);
            if(response.status==200)
            {
                localStorage.access_token=response.data.access_token;
                $('#loginSuccess').html("Login Succesful ... redirecting")

                //window.location.replace('{{route('dashboard')}}');
            }
        }).catch(function(error){
            if(error.response)
            {  
                if(error.response.status===401)
                {
                    $('#loginError').html("Invalid Login credentials")
                }
                else
                {
                    $('#loginError').html("An Error Occured")
                     // console.log(error)
                }
            }
        })
    })
})
    
</script>
@endsection
