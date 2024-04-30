<?php

namespace App\Http\Controllers\api\v1\student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Carbon\Carbon;
use App\RegStudent;
use App\RegTransaction;
use App\RegPayment;
use App\RegRate;
use Illuminate\Support\Facades\Validator;
//use GuzzleHttp\Client;
use Unirest\Request\Body;
use Unirest\Request as URequest;
class SpillRegistration extends Controller
{
  

public function getStudentDetailsGet(Request $r)
{
	if($r->has('trans_ref'))
	{
		return $this->getStudentDetails($r->input('trans_ref')); 
	}
}
public function getStudentDetails($trans_ref)
{
      
$trans_ref= urldecode($trans_ref);
      $transaction= RegTransaction::with('type')->join('reg_students','reg_transactions.student_id','=','reg_students.id')->where('trans_ref',"=",$trans_ref)->orWhere('reg_students.reg_no','=',$trans_ref)->select("reg_transactions.*")->first();
      if($transaction==null)
      {
      	return response()->json(['status'=>false,'message'=>"No Record Found"]);
      } 
      $student= RegStudent::find($transaction->student_id);
       if($student==null)
      {
      	return response()->json(['status'=>false,'message'=>"No Record Found"]);
     }

$rave_pay=null;

	 if($transaction!=null and $student!=null)
	 {

	 		if($transaction->payment_status!=1)
	 		{
	 			if($this->verifyTransaction($transaction->trans_ref))
	 			{

	 				 $transaction= RegTransaction::with('type')->where('student_id',"=",$student->id)->first();
	 			}
	 		}
	 		$meta=array('metaname'=>'userID', 'metavalue'=>$student->id);
	 		$subaccounts=array(['id'=>getenv('RAVE_JIGAWA_WALLET'), 'transaction_split_ratio'=>'1',  'transaction_charge_type'=> "flat",
          'transaction_charge'=> $transaction->type->commission]);

			if($transaction->payment_status!=1)
			{

				 $rave_pay=["PBFPubKey"=>getenv('RAVE_PUBLIC_KEY'), 
				 'customer_email'=> $student->email, 
				 'amount'=>$transaction->amount_due-$transaction->amount_paid,
				  "custom_title" => 'JIGAWA STATE COLLEGE OF EDUCATION',
         	     "custom_logo" => getenv('RAVE_LOGO'),
				  'customer_phone'=>$student->phone, 'currency'=>"NGN", 'txref'=> $transaction->trans_ref,'subaccounts'=>$subaccounts, 'meta'=>$meta];

			}
	 	}
	 	return response()->json(['status'=>true,'message'=>"Transaction fetched",'data'=>['student'=>$student, 'transaction'=>$transaction,'rave'=>$rave_pay]]);



}

public function RegisterStudent(Request $r)
{
	

		$data=$r->json()->all();
	$data['reg_no']=urldecode($data['reg_no']);
	 $std=RegStudent::where('reg_no','LIKE',$data['reg_no'])->first();
	 //return $std;

	 $user_exist= false;
	 if($std!=null)
	 {
	 	return $this->getStudentDetails($data['reg_no']);
	 }

           $validator = Validator::make($data, [
           'reg_no' => 'unique:reg_students',
           'first_name' => 'required|string',
           'last_name' => 'required|string',
           'indegene' => 'required|int',
       ]);
         if ($validator->fails()) {
            return response()->json(['status'=>false,'message'=>"Check Your Inputs and try again", 'errors'=>$validator->errors()]);
         }



$mcat=$data['category']=="UG" ? 'is_ug' : 'is_nce';
$mind=$data['indegene']=="1" ? 'is_indegene' : 'is_non_indegene';
$service=RegRate::where([[$mcat,'=',1],[$mind,'=',1]])->first();

if($service==null)
{
	 return response()->json(['status'=>false,'message'=>"No Services found"]);
}         


     
         $student= new RegStudent;
         $student->first_name= $data['first_name'];
         $student->last_name= $data['last_name'];
         $student->middle_name= @$data['middle_name'];
         $student->email= @$data['email'];
         $student->phone= @$data['phone'];
         $student->indegene= $data['indegene'];
         $student->category= $data['category'];
         $student->reg_no= strtoupper($data['reg_no']);
         $student->save();
      	 
      	$trans= new RegTransaction;
        $trans->service_id=$service->id;
        $trans->amount_due=$service->amount;
        $trans->student_id=$student->id;
        $trans->year=2020;
        $trans->trans_ref="CEPR".$student->id.rand(0,999999);
        $trans->save();
         return $this->getStudentDetails($trans->trans_ref);
}



 protected $verifyCount = 0;

public  function verifyTransaction($transaction_ref)
{

$this->verifyCount ++;
	$data = array('txref' => $transaction_ref,
	  'SECKEY' => getenv("RAVE_PRIVATE_KEY")  //secret key from pay button generated on rave dashboard
	);
	  $inv=RegTransaction::where('trans_ref', $transaction_ref)->first();


	if($inv!=null AND $inv->payment_status!=1)
	{

		 // make request to endpoint using unirest.
		  $headers = array('Content-Type' => 'application/json');
		  $body = Body::json($data);
		  $url = getenv('RAVE_URL')."/flwv3-pug/getpaidx/api/v2/verify"; //please make sure to change this to production url when you go live

		// Make `POST` request and handle response with unirest

		  $response = URequest::post($url, $headers, $body);
		  //dd($response->body);
		  //check the status is success
		  if($response->body->status !='error'){
		  if ( ($response->body->data->chargecode === "00" || $response->body->data->chargecode==="0")) {
		      //confirm that the amount is the amount you wanted to charge

		  		$pay= new RegPayment;
		  		$pay->transaction_id= $inv->id;
		  		$pay->trans_ref= $inv->trans_ref;
		  		$pay->pay_amount=$response->body->data->amount ;
		  		$pay->save();
		      if ($response->body->data->amount >= $inv->amount_due) {
		 // dd($response);

		      
		          $inv->payment_status=1;
		          $inv->amount_paid= $response->body->data->amount ;
		          $inv->payment_date=Carbon::parse($response->body->data->created);
		          //$inv->payment_method="ONLINE";
		          $inv->save();

		          return true;
		      }
		  	
		  }
		  elseif($this->verifyCount<4)
		  {
		  	return $this->verifyTransaction($transaction_ref);
		  }
		}
		}
		elseif($inv->payment_status==1)
		{
			return true;
		}

		return false;
	}
}
