<?php

namespace App\Http\Controllers;
use Unirest\Request\Body;
use App\Invoice;
use App\VehicleQueue;
use App\Http\Controllers\Controller;
use Unirest\Request as URequest;
class Rave extends Controller{

 protected $verifyCount = 0;
 protected $Invoice= new Invoice;
 protected $Queue = new VehicleQueue;

public  function verifyTransaction($transaction_ref)
{

$this->verifyCount ++;
	$data = array('txref' => $transaction_ref,
	  'SECKEY' => 'FLWSECK_TEST-165ad54de5c9ee01fb0db8e546885a60-X'  //secret key from pay button generated on rave dashboard
	);
	  $inv=Invoice::where('reference', $transaction_ref)->first();

	if($inv!=null AND $inv->payment_status!=1)
	{

		 // make request to endpoint using unirest.
		  $headers = array('Content-Type' => 'application/json');
		  $body = Body::json($data);
		  $url = "https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/v2/verify"; //please make sure to change this to production url when you go live

		// Make `POST` request and handle response with unirest

		  $response = URequest::post($url, $headers, $body);
		  //check the status is success
		  if ( ($response->body->data->chargecode === "00" || $response->body->data->chargecode==="0")) {
		      //confirm that the amount is the amount you wanted to charge


		      if ($response->body->data->amount >= $inv->amount_due) {
		 // dd($response);
		      	$this->Invoice=$inv;

		          $inv->payment_status=1;
		          $inv->amount_paid= $response->body->data->amount ;
		          $inv->payment_method="ONLINE";
		          $inv->save();
		          $this->sendBookingSMS($inv);
		          return true;
		      }
		  	
		  }
		  elseif($this->verifyCount<4)
		  {
		  	return $this->verifyTransaction($transaction_ref);
		  }
		}
		elseif($inv->payment_status==1)
		{
			return true;
		}
	}	

public function sendBookingSMS( Invoice $inv)
{

  $que=VehicleQueue::find($inv->queue_id);
  $this->Queue=$que;
  $message="Booking Success. \nRef: " . $inv->reference ;
  $message.= "\nSrc:". $que->source->name;
  $message.="\nDest:" .$que->destination->name;
  $message.="\nTime:".$que->departure_time->format('d/m/Y h:ma');
  NotificationController::sendSMS($inv->customer->phone_number, $message);
}


 

}