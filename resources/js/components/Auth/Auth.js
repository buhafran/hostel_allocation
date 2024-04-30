
//import auth0 from 'auth0-js';
 import axios from 'axios'
//import history from './history';
import Cookies from 'js-cookie'

export default class Auth {
  // Please use your own credentials here
  // auth0 = new auth0.WebAuth({
  //   domain: 'divyanshu.auth0.com',
  //   clientID: 'TJyKPI6aRiRwgr6SxlT7ExW10NEHW4Vy',
  //   redirectUri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/callback' : 'https://appbaseio-apps.github.io/reactivesearch-auth0-example/callback',
  //   audience: 'https://divyanshu.auth0.com/userinfo',
  //   responseType: 'token id_token',
  //   scope: 'openid'
  // });

  // login = () => {
  //   this.auth0.authorize();
  // }

  // parses the result after authentication from URL hash
  // handleAuthentication = () => {
  //   this.auth0.parseHash((err, authResult) => {
  //     if (authResult && authResult.accessToken && authResult.idToken) {
  //       this.setSession(authResult);
  //     //  history.replace('/home');
  //     } else if (err) {
  //       //history.replace('/home');
  //       console.log(err);
  //     }
  //   });
  // }
constructor() {

  }



 async SetNewPassword(password,cpassword,token,callback){
    let creden= {password:password, password_confirm:cpassword,token:token};
    await axios.post('/api/v1/student/auth/login',creden).then((response)=>{
     // console.log(response);
      if(response.status==200)
      {
       
        callback(response.data);
      }
    }).catch(function(error){
      if(error.response)
      {
        callback(error.response);  
      }
      
        })
  }



 async Login(username,password,callback){
    let creden= {email:username, password:password};
    await axios.post('/api/v1/student/auth/login',creden).then((response)=>{
     // console.log(response);
      if(response.status==200 && response.data.access_token)
      {
        this.setSession(response.data);
        callback(200);
      }
    }).catch(function(error){
      if(error.response)
      {
        callback(error.response.status);  
      }
      
        })
  }
   async AdminLogin(username,password,callback){
    let creden= {email:username, password:password};
    await axios.post('/api/v1/admin/auth/login',creden).then((response)=>{
     // console.log(response);
      if(response.status==200 && response.data.access_token)
      {
        this.setSession(response.data,true);
        callback(200);
      }
    }).catch(function(error){
      if(error.response)
      {
        callback(error.response.status);  
      }
      
        })
  }

  // Sets user details in localStorage
  setSession(authResult,is_admin=false){
    // Set the time that the access token will expire at
    //console.log(authResult)
    var d= new Date(authResult.expires_at);
    let expiresAt = JSON.stringify(d.getTime());
    if(!is_admin)
    {
          Cookies.set('access_token', encodeURI(authResult.access_token), {
        expires:d,
      //  secure:true
      });
    //localStorage.setItem('id_token', authResult.idToken);
      Cookies.set('expires_at', expiresAt ,{
        expires:d,
       // secure:true
      });
    }
    else
    {
          Cookies.set('aaccess_token', encodeURI(authResult.access_token), {
        expires:d,
      //  secure:true
      });
    //localStorage.setItem('id_token', authResult.idToken);
      Cookies.set('aexpires_at', expiresAt ,{
        expires:d,
       // secure:true
      });
    }


  
}
  // removes user details from localStorage
async logout(callback){
    // Clear access token and ID token from local storage
    await axios.post('/api/v1/student/auth/logout',{},{headers: {
    Accept: 'application/json',
     Authorization: 'Bearer ' + decodeURI(Cookies.get('access_token'))
   }}).then((response)=>{
      console.log(response);
      if(response.status===202 || response.status==401)
      {
        Cookies.remove('access_token');
    //localStorage.removeItem('id_token');
         Cookies.remove('expires_at');
        callback(response);
      }
    }).catch(function(error){
      if(error.response)
      {
        if(error.response.status===401)
        {
                 Cookies.remove('access_token');
                 Cookies.remove('expires_at');
          callback(error.response)
        }
      }
       //console.log(error.response)
      
        })


    // navigate to the home route
  //  history.replace('/home');
  }



async admin_logout(callback){
    // Clear access token and ID token from local storage
    await axios.post('/api/v1/admin/auth/logout',{},{headers: {
    Accept: 'application/json',
     Authorization: 'Bearer ' + decodeURI(Cookies.get('aaccess_token'))
   }}).then((response)=>{
      console.log(response);
      if(response.status===202 || response.status==401)
      {
        Cookies.remove('aaccess_token');
    //localStorage.removeItem('id_token');
         Cookies.remove('aexpires_at');
        callback(response);
      }
    }).catch(function(error){
      if(error.response)
      {
        if(error.response.status===401)
        {
                 Cookies.remove('aaccess_token');
                 Cookies.remove('aexpires_at');
          callback(error.response)
        }
      }
       //console.log(error.response)
      
        })


    // navigate to the home route
  //  history.replace('/home');
  }


  // checks if the user is authenticated
  isAuthenticated(){
    // Check whether the current time is past the
    // access token's expiry time
    //return true;
    let exp=(Cookies.get('expires_at'))

    // console.log(typeof(exp))
    // console.log(exp=="undefined")
    if(exp=='undefined' || exp==null || exp==undefined)
    {
      return false;
    }else
    {

        let expiresAt = JSON.parse(decodeURI(exp));
        return new Date().getTime() < expiresAt;
    }
  }  
  isAdminAuthenticated(){
    // Check whether the current time is past the
    // access token's expiry time
    //return true;
  
    let exp=(Cookies.get('aexpires_at'))
  
    if(exp=='undefined' || exp==null || exp==undefined)
    {
      return false;
    }else
    {

        let expiresAt = JSON.parse(decodeURI(exp));
        return new Date().getTime() < expiresAt;
    }
  }
}