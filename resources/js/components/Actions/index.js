import axios from 'axios';
import Cookies from 'js-cookie'
//const url="/api/v1/Admin/";
const url="/api/v1/student/";
export const APP_DEMO= false;
export const base_url= APP_DEMO ? "http://127.0.0.1:8000" : "https://hostel.algadong.com.ng/";




export const uploadProductImage=(imageFile,product_id, callback)=>{
	var nurl=url+ "product_pictures";
	let data = new FormData();
	data.append('file', imageFile);
	data.append('product_id', product_id);
	return postFile(nurl, data, callback)
}

export const uploadCategoryImage=(category_id,imageFile, callback)=>{
	var nurl=url+ "category_picture";
	let data = new FormData();
	data.append('file', imageFile);
	data.append('category_id', category_id);
	return postFile(nurl, data, callback)
}
export const getRegistrationServices=(callback)=>{
 return getRequest(url+"registration/services",callback);
}
export const startNewRegistration=(data,callback)=>{
	var nurl=url+ "registration/spill";
 	return postRequest(nurl,data ,callback);
}
export const registrationStatusByRefOrRegno=(id,callback)=>{
	var nurl=url+ "registration/spill/getstatus?trans_ref=" + id;
 	return getRequest(nurl ,callback);
}
export const changeMyPassword=(data,callback)=>{
	var nurl=url+ "auth/user/changepassword";
 	return putRequest(nurl,data ,callback);
}
export const registerUser=(data, callback)=>{
	return postRequest(url+ "auth/register",data,callback);
}

export const getDataByPage=(murl,callback)=>{
 return getRequest(murl,callback);
}

export const getMyActivity=(callback)=>{
 return getRequest(url+"user/myactivity",callback);
}
export const getAllActivity=(callback)=>{
 return getRequest(url+"user/activities",callback);
}
export const getActivity=(id,callback)=>{
 return getRequest(url+"user/activities/" + id ,callback);
}

export const getMyReservation=(id,callback)=>{
 return getRequest(url+"get_reservation" + id ,callback);
}
export const getLoginUser=(callback)=>{
	var nurl=url+ "auth/user";
 	return getRequest(nurl ,callback);
}
export const updateLoginUser=(data,callback)=>{
	var nurl=url+ "auth/user";
 	return putRequest(nurl ,data, callback);
}
export const makeRoomReservation=(data,callback)=>{
	var nurl=url+ "reserve_room";
 	return postRequest(nurl ,data, callback);
}



export const getFleets=(callback)=>{
 return getRequest(url+"fleets",callback);
}

export const getPictures=(id,callback)=>{
	var nurl=url+ "files/" + id;
 	return getRequest(nurl ,callback);
}

export const makePictureDefault=(data,callback)=>{
	var nurl=url+ "product_pictures" ;
 	return putRequest(nurl, data,callback);
}
// export const updatePicture=(id,data,callback)=>{
// 	var nurl=url+ "files/" + id;
//  	return putRequest(nurl ,data, callback);
// }
// export const createPicture=(data,callback)=>{
// 	var nurl=url+ "files"
//  	return postRequest(nurl,data ,callback);
// }
export const deletePicture=(id,callback)=>{
	var nurl=url+ "product_pictures/" + id;
 	return deleteRequest(nurl ,callback);
}


export const getRefunds=(callback)=>{
	var nurl=url+ "payment/refund";
 	return getRequest(nurl ,callback);
}
export const getRefund=(id,callback)=>{
	var nurl=url+ "payment/refund/" + id;
 	return getRequest(nurl ,callback);
}
// export const updateRefund=(id,data,callback)=>{
// 	var nurl=url+ "payment/refund/" + id;
//  	return putRequest(nurl ,data, callback);
// }
export const createRefund=(data,callback)=>{
	var nurl=url+ "payment/refund"
 	return postRequest(nurl,data ,callback);
}
export const deleteRefund=(id,callback)=>{
	var nurl=url+ "payment/refund/" + id;
 	return deleteRequest(nurl ,callback);
}




export const getAcceptedOrders=(callback)=>{
	var nurl=url+ "orders?is_treated=1";
 	return getRequest(nurl ,callback);
}
export const getOrders=(callback)=>{
	var nurl=url+ "orders";
 	return getRequest(nurl ,callback);
}
export const getOrder=(id,callback)=>{
	var nurl=url+ "orders/" + id;
 	return getRequest(nurl ,callback);
}
export const updateOrder=(id,data,callback)=>{
	var nurl=url+ "orders/" + id;
 	return putRequest(nurl ,data, callback);
}
// export const createPicture=(data,callback)=>{
// 	var nurl=url+ "order"
//  	return postRequest(nurl,data ,callback);
// }
export const deleteOrder=(id,callback)=>{
	var nurl=url+ "orders/" + id;
 	return deleteRequest(nurl ,callback);
}

// export const getOrderItems=(callback)=>{
// 	var nurl=url+ "orders";
//  	return getRequest(nurl ,callback);
// }
export const getOrderItem=(id,callback)=>{
	var nurl=url+ "order/item/" + id;
 	return getRequest(nurl ,callback);
}
export const updateOrderItem=(id,data,callback)=>{
	var nurl=url+ "order/item/" + id;
 	return putRequest(nurl ,data, callback);
}
// export const createOrderItem=(data,callback)=>{
// 	var nurl=url+ "order"
//  	return postRequest(nurl,data ,callback);
// }
export const deleteOrderItem=(id,callback)=>{
	var nurl=url+ "order/item" + id;
 	return deleteRequest(nurl ,callback);
}


export const getDeliveries=(callback)=>{
	var nurl=url+ "deliveries";
 	return getRequest(nurl ,callback);
}
export const getDelivery=(id,callback)=>{
	var nurl=url+ "deliveries/" + id;
 	return getRequest(nurl ,callback);
}
export const updateDelivery=(id,data,callback)=>{
	var nurl=url+ "deliveries/" + id;
 	return putRequest(nurl ,data, callback);
}
// export const createDelivery=(data,callback)=>{
// 	var nurl=url+ "deliveries"
//  	return postRequest(nurl,data ,callback);
// }
export const deleteDelivery=(id,callback)=>{
	var nurl=url+ "deliveries/" + id;
 	return deleteRequest(nurl ,callback);
}





export const getFleet=(id,callback)=>{
	var nurl=url+ "fleets/" + id;
 	return getRequest(nurl ,callback);
}
export const updateFleet=(id,data,callback)=>{
	var nurl=url+ "fleets/" + id;
 	return putRequest(nurl ,data, callback);
}
export const createFleet=(data,callback)=>{
	var nurl=url+ "fleets"
 	return postRequest(nurl,data ,callback);
}
export const deleteFleet=(id,callback)=>{
	var nurl=url+ "fleets/" + id;
 	return deleteRequest(nurl ,callback);
}

export const getBrands=(callback)=>{
 return getRequest(url+"brands",callback);
}
export const getBrand=(id,callback)=>{
	var nurl=url+ "brands/" + id;
 	return getRequest(nurl ,callback);
}
export const updateBrand=(id,data,callback)=>{
	var nurl=url+ "brands/" + id;
 	return putRequest(nurl ,data, callback);
}
export const createBrand=(data,callback)=>{
	var nurl=url+ "brands"
 	return postRequest(nurl,data ,callback);
}
export const deleteBrand=(id,callback)=>{
	var nurl=url+ "brands/" + id;
 	return deleteRequest(nurl ,callback);
}

export const getCategories=(callback)=>{
 return getRequest(url+"categories",callback);
}
export const getCategory=(id,callback)=>{
	var nurl=url+ "categories/" + id;
 	return getRequest(nurl ,callback);
}
export const updateCategory=(id,data,callback)=>{
	var nurl=url+ "categories/" + id;
 	return putRequest(nurl ,data, callback);
}
export const createCategory=(data,callback)=>{
	var nurl=url+ "categories"
 	return postRequest(nurl,data ,callback);
}
export const deleteCategory=(id,callback)=>{
	var nurl=url+ "categories/" + id;
 	return deleteRequest(nurl ,callback);
}

export const getProductModels=(callback)=>{
 return getRequest(url+"product_models",callback);
}
export const getProductModel=(id,callback)=>{
	var nurl=url+ "product_models/" + id;
 	return getRequest(nurl ,callback);
}
export const updateProductModel=(id,data,callback)=>{
	var nurl=url+ "product_models/" + id;
 	return putRequest(nurl ,data, callback);
}
export const createProductModel=(data,callback)=>{
	var nurl=url+ "product_models"
 	return postRequest(nurl,data ,callback);
}
export const deleteProductModel=(id,callback)=>{
	var nurl=url+ "product_models/" + id;
 	return deleteRequest(nurl ,callback);
}

 
export const getProducts=(callback)=>{
 return getRequest(url+"products",callback);
}
export const getProduct=(id,callback)=>{
	var nurl=url+ "products/" + id;
 	return getRequest(nurl ,callback);
}
export const updateProduct=(id,data,callback)=>{
	var nurl=url+ "products/" + id;
 	return putRequest(nurl ,data, callback);
}
export const createProduct=(data,callback)=>{
	var nurl=url+ "products"
 	return postRequest(nurl,data ,callback);
}
export const deleteProduct=(id,callback)=>{
	var nurl=url+ "products/" + id;
 	return deleteRequest(nurl ,callback);
}



export const getVendors=(callback)=>{
 return getRequest(url+"vendors",callback);
}
export const getVendor=(id,callback)=>{
	var nurl=url+ "vendors/" + id;
 	return getRequest(nurl ,callback);
}
export const updateVendor=(id,data,callback)=>{
	var nurl=url+ "vendors/" + id;
 	return putRequest(nurl ,data, callback);
}
export const createVendor=(data,callback)=>{
	var nurl=url+ "vendors"
 	return postRequest(nurl,data ,callback);
}
export const deleteVendor=(id,callback)=>{
	var nurl=url+ "vendors/" + id;
 	return deleteRequest(nurl ,callback);
}


export const getCustomers=(callback)=>{
 return getRequest(url+"customers",callback);
}
export const getCustomer=(id,callback)=>{
	var nurl=url+ "customers/" + id;
 	return getRequest(nurl ,callback);
}
export const updateCustomer=(id,data,callback)=>{
	var nurl=url+ "customers/" + id;
 	return putRequest(nurl ,data, callback);
}
export const createCustomer=(data,callback)=>{
	var nurl=url+ "customers"
 	return postRequest(nurl,data ,callback);
}
export const deleteCustomer=(id,callback)=>{
	var nurl=url+ "customers/" + id;
 	return deleteRequest(nurl ,callback);
}

export const getPayments=(callback)=>{
 return getRequest(url+"payments",callback);
}
export const getPayment=(id,callback)=>{
	var nurl=url+ "payments/" + id;
 	return getRequest(nurl ,callback);
}
// export const updatePayment=(id,data,callback)=>{
// 	var nurl=url+ "payments/" + id;
//  	return putRequest(nurl ,data, callback);
// }
export const createPayment=(data,callback)=>{
	var nurl=url+ "payments"
 	return postRequest(nurl,data ,callback);
}
export const deletePayment=(id,callback)=>{
	var nurl=url+ "payments/" + id;
 	return deleteRequest(nurl ,callback);
}
export const getDashboardSummary=(callback)=>{
	var nurl=url+'stats/dashboard_summary';
	return getRequest(nurl,callback);
}









//OLD

export const getDrivers=(callback)=>{
 return getRequest(url+"staff?is_driver=1"	,callback);
}

export const getDriver=(id,callback)=>{
	var nurl=url+ "driver/" + id;
 	return getRequest(nurl ,callback);
}
export const updateDriver=(id,data,callback)=>{
	var nurl=url+ "driver/" + id;
 	return putRequest(nurl ,data, callback);
}
export const createDriver=(data,callback)=>{
	var nurl=url+ "driver"
 	return postRequest("/api/driver",data ,callback);
}
export const deleteDriver=(id,callback)=>{
	var nurl=url+ "driver/" + id;
 	return deleteRequest(nurl ,callback);
}

export const getVehicles=(callback)=>{
 return getRequest("/api/vehicle",callback);
}

export const getVehicle=(id,callback)=>{
	var nurl=url+ "vehicle/" + id;
 	return getRequest(nurl ,callback);
}
export const updateVehicle=(id,data,callback)=>{
	var nurl=url+ "vehicle/" + id;
 	return putRequest(nurl ,data, callback);
}
export const createVehicle=(data,callback)=>{
	var nurl=url+ "vehicle"
	  console.log(data);
 	return postRequest(nurl,data ,callback);
}
export const deleteVehicle=(id,callback)=>{
	var nurl=url+ "vehicle/" + id;
 	return deleteRequest(nurl ,callback);
}

export const getExpensesTypes=(callback)=>{
 return getRequest("/api/vehicle_expense_types",callback);
}

export const getLoadingPassengers=(id,callback)=>{
	var nurl= url+ 'loading/' +id + '/passengers';
	return getRequest(nurl,callback);
}

export const getLoadings=(callback)=>{
	var nurl=url+ "loading";
 	return getRequest(nurl ,callback);
}
export const getLoading=(id,callback)=>{
	var nurl=url+ "loading/" + id;
 	return getRequest(nurl ,callback);
}
export const updateLoading=(id,data,callback)=>{
	var nurl=url+ "loading/" + id;
 	return putRequest(nurl ,data, callback);
}
export const createLoading=(data,callback)=>{
	var nurl=url+ "loading"
	  console.log(data);
 	return postRequest(nurl,data ,callback);
}
export const deleteLoading=(id,callback)=>{
	var nurl=url+ "loading/" + id;
 	return deleteRequest(nurl ,callback);
}


export const getBookings=(callback)=>{
	var nurl=url+ "booking";
 	return getRequest(nurl ,callback);
}
export const getBooking=(id,callback)=>{
	var nurl=url+ "booking/" + id;
 	return getRequest(nurl ,callback);
}
export const updateBooking=(id,data,callback)=>{
	var nurl=url+ "booking/" + id;
 	return putRequest(nurl ,data, callback);
}
export const createBooking=(data,callback)=>{
	var nurl=url+ "booking"
	  console.log(data);
 	return postRequest(nurl,data ,callback);
}
export const deleteBooking=(id,callback)=>{
	var nurl=url+ "booking/" + id;
 	return deleteRequest(nurl ,callback);
}

export const getFareRates=(callback)=>{
	var nurl=url+ "fare_rates";
 	return getRequest(nurl ,callback);
}
export const getFareRate=(id,callback)=>{
	var nurl=url+ "fare_rates/" + id;
 	return getRequest(nurl ,callback);
}
export const updateFareRate=(id,data,callback)=>{
	var nurl=url+ "fare_rates/" + id;
 	return putRequest(nurl ,data, callback);
}
export const createFareRate=(data,callback)=>{
	var nurl=url+ "fare_rates"
	  console.log(data);
 	return postRequest(nurl,data ,callback);
}
export const deleteFareRate=(id,callback)=>{
	var nurl=url+ "fare_rates/" + id;
 	return deleteRequest(nurl ,callback);
}


export const getInvoices=(callback)=>{
	var nurl=url+ "invoices";
 	return getRequest(nurl ,callback);
}
export const getInvoice=(id,callback)=>{
	var nurl=url+ "invoices/" + id;
 	return getRequest(nurl ,callback);
}
// export const updateInvoice=(id,data,callback)=>{
// 	var nurl=url+ "invoices/" + id;
//  	return putRequest(nurl ,data, callback);
// }
// export const createInvoice=(data,callback)=>{
// 	var nurl=url+ "invoices"
// 	  console.log(data);
//  	return postRequest(nurl,data ,callback);
// }
export const deleteInvoice=(id,callback)=>{
	var nurl=url+ "invoices/" + id;
 	return deleteRequest(nurl ,callback);
}



export const getVehicleExpenses=(callback)=>{
	var nurl=url+ "vehicle_expense";
 	return getRequest(nurl ,callback);
}
export const getVehicleExpense=(id,callback)=>{
	var nurl=url+ "vehicle_expense/" + id;
 	return getRequest(nurl ,callback);
}
export const updateVehicleExpense=(id,data,callback)=>{
	var nurl=url+ "vehicle_expense/" + id;
 	return putRequest(nurl ,data, callback);
}
export const createVehicleExpense=(data,callback)=>{
	var nurl=url+ "vehicle_expense"
	  console.log(data);
 	return postRequest(nurl,data ,callback);
}
export const deleteVehicleExpense=(id,callback)=>{
	var nurl=url+ "vehicle_expense/" + id;
 	return deleteRequest(nurl ,callback);
}







export const getUsers=(callback)=>{
	var nurl=url+ "users";
 	return getRequest(nurl ,callback);
}
export const getUser=(id,callback)=>{
	var nurl=url+ "users/" + id;
 	return getRequest(nurl ,callback);
}
export const updateUser=(id,data,callback)=>{
	var nurl=url+ "users/" + id;
 	return putRequest(nurl ,data, callback);
}
export const createUser=(data,callback)=>{
	var nurl=url+ "users"
	  console.log(data);
 	return postRequest(nurl,data ,callback);
}
export const deleteUser=(id,callback)=>{
	var nurl=url+ "users/" + id;
 	return deleteRequest(nurl ,callback);
}
export const changeUserPassword=(id,data,callback)=>{
	var nurl=url+ "users/" + id + "/changepassword";
 	return putRequest(nurl,data ,callback);
}




export const getParks=(callback)=>{
	var nurl=url+ "parks";
 	return getRequest(nurl ,callback);
}
export const getPark=(id,callback)=>{
	var nurl=url+ "parks/" + id;
 	return getRequest(nurl ,callback);
}
export const updatePark=(id,data,callback)=>{
	var nurl=url+ "parks/" + id;
 	return putRequest(nurl ,data, callback);
}
export const createPark=(data,callback)=>{
	var nurl=url+ "parks"
	  console.log(data);
 	return postRequest(nurl,data ,callback);
}
export const deletePark=(id,callback)=>{
	var nurl=url+ "parks/" + id;
 	return deleteRequest(nurl ,callback);
}




















export const getHomeProductMenu=(callback)=>{

	var nurl=url + 'public/menu';
	return getReq(nurl,callback);

}

export const getHomeProducts=(callback)=>{

	var nurl=url + 'public/products';
	return getReq(nurl,callback);

}
export const getHomeProductsByCategory=(surl, callback)=>{

	var nurl=url + 'public/product_by_category/' + surl;
	return getReq(nurl,callback);

}
export const getHomeProductsSearch=(q, callback)=>{

	var nurl=url + 'public/search_product?q=' + q;
	return getReq(nurl,callback);

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







const postFile=async (url, data, callback)=>{

	await axios.post(url,data,
		{headers: {
			Accept: 'application/json',
	  	 Authorization: 'Bearer ' + decodeURI(Cookies.get('access_token') ),
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
	  	 Authorization: 'Bearer ' + decodeURI(Cookies.get('access_token') )
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
	   Authorization: 'Bearer ' + decodeURI(Cookies.get('access_token') )
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
	   Authorization: 'Bearer ' + decodeURI(Cookies.get('access_token') )
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
	   Authorization: 'Bearer ' + decodeURI(Cookies.get('access_token') )
	 }
	}).then(response=>{
		callback(response.data);
		//console.log(response); 
  }).catch(err =>{
    console.log(err);
  });
}
