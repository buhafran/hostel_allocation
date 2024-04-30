import axios from 'axios';
import Cookies from 'js-cookie'
//const url="/api/v1/Admin/";
const url="/api/v1/admin/";
const APP_DEMO= false;
import {base_url} from './';





export const getAllocations=(filter,callback)=>{
		const qs = Object.keys(filter)
    .map(key => `${key}=${filter[key]}`)
    .join('&');
	var nurl=url+ "allocations?" + qs;
 	return getRequest(nurl ,callback);
}
export const getRegTransactions=(filter,callback)=>{


	const qs = Object.keys(filter)
    .map(key => `${key}=${filter[key]}`)
    .join('&');

	var nurl=url+ "transactions?" + qs ;
 	return getRequest(nurl ,callback);
}
export const getBuildingSummary=(callback)=>{
	var nurl=url+ "bulding_summary";
 	return getRequest(nurl ,callback);
}

export const getReq=async (url, callback)=>{
	//console.log(localStorage.access_token )
	await axios.get(url,callback).then(response=>{
		callback(response.data);
		if(APP_DEMO)
		{
			console.log(response); 

		}
  }).catch(err =>{
    console.log(err);
  });
}

export const getLoginUser=(callback)=>{
	var nurl=url+ "auth/user";
 	return getRequest(nurl ,callback);
}

export const changeMyPasswordAdmin=(data,callback)=>{
	var nurl=url+ "changepassword";
 	return putRequest(nurl,data ,callback);
}





const postFile=async (url, data, callback)=>{

	await axios.post(url,data,
		{headers: {
			Accept: 'application/json',
	  	 Authorization: 'Bearer ' + decodeURI(Cookies.get('aaccess_token') ),
	  	 "Content-Type": "multipart/form-data"
	 }
	}).then(response=>{
		callback(response.data);
		if(APP_DEMO)
		{

		console.log(response.data); 
		}
  }).catch(err =>{

    console.log(err);
  });
}






const postRequest=async (url, data, callback)=>{
	await axios.post(url,data,
		{headers: {
			Accept: 'application/json',
	  	 Authorization: 'Bearer ' + decodeURI(Cookies.get('aaccess_token') )
	 }
	}).then(response=>{
		callback(response.data);
		if(APP_DEMO)
		{
		console.log(response.data); 

		}
  }).catch(err =>{
    console.log(err);
  });
}
export const  getRequest=async (url, callback)=>{
	//console.log(localStorage.access_token )
	await axios.get(url,
	{headers: {
	   Accept: 'application/json',
	   Authorization: 'Bearer ' + decodeURI(Cookies.get('aaccess_token') )
	 }
	}).then(response=>{
		callback(response.data);
		if(APP_DEMO)
		{

		console.log(response); 
		}
  }).catch(err =>{
    console.log(err);
  });
}

export const putRequest=async (url, data,callback)=>{
	await axios.put(url,data,{headers: {
		Accept: 'application/json',
	   Authorization: 'Bearer ' + decodeURI(Cookies.get('aaccess_token') )
	 }
	}).then(response=>{
		callback(response.data);
		if(APP_DEMO)
		{
		console.log(response); 
			
		}
  }).catch(err =>{
    console.log(err);
  });
}
export const deleteRequest=async (url,callback)=>{
	await axios.delete(url,{headers: {
		Accept: 'application/json',
	   Authorization: 'Bearer ' + decodeURI(Cookies.get('aaccess_token') )
	 }
	}).then(response=>{
		callback(response.data);
		//console.log(response); 
  }).catch(err =>{
    console.log(err);
  });
}
