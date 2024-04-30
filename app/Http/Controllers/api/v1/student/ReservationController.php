<?php

namespace App\Http\Controllers\api\v1\student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\BedSpace;
use App\Reservation;
use App\ActiveYear;
use App\Transaction;
use App\Building;
use App\Room;
use App\Allocation;
use App\Payment;
//use GuzzleHttp\Client;
use Unirest\Request\Body;
use Unirest\Request as URequest;
class ReservationController extends Controller
{
  
public function getReservations(Request $request)
{
       
   		$year=ActiveYear::where('is_active',1)->first();
        $user= $request->user();
        $reservation= Reservation::with(['bedspace'])->where([['student_id',"=",$user->id],['is_canceled','=', 0]])->first();
      
         $allocation= Allocation::where([['student_id',"=",$user->id],['year','=', $year->year]])->first();
         	$available=BedSpace::join('buildings','buildings.id','=','bed_spaces.building_id')->where([['is_reserved','=',0],['buildings.category','LIKE', $user->category],['gender', 'LIKE', $user->gender]])->count();
         	$transaction= Transaction::where([['student_id',"=",$user->id],['year','=',$year->year]])->first();

         	
  $building=null;
  $rave_pay=null;


         	if($transaction!=null and $reservation!=null)
         	{

         		if($transaction->payment_status!=1)
         		{
         			if($this->verifyTransaction($transaction->trans_ref))
         			{
         				  	$transaction= Transaction::where([['student_id',"=",$user->id],['year','=',$year->year]])->first();
         			}
         		}
         		$meta=array('metaname'=>'userID', 'metavalue'=>$user->id);
         		$subaccounts=array(['id'=>getenv('RAVE_JIGAWA_WALLET'), 'transaction_split_ratio'=>'1']);
         		  $building=BedSpace::where('bed_spaces.id',$reservation->bed_id)->join('buildings','buildings.id','=','bed_spaces.building_id')->join('rooms','rooms.id','=','bed_spaces.room_id')->select(['room_number','name','category','gender'])->first();
       
         	$rave_pay=["PBFPubKey"=>getenv('RAVE_PUBLIC_KEY'),
         	 'customer_email'=> $user->email, 
         	  "custom_title" => 'JIGAWA STATE COLLEGE OF EDUCATION',
         	     "custom_logo" => getenv('RAVE_LOGO'),
         	 'amount'=>$transaction->amount_due-$transaction->amount_paid, 'customer_phone'=>$user->phone, 'currency'=>"NGN", 'txref'=> $transaction->trans_ref,'subaccounts'=>$subaccounts, 'meta'=>$meta];
//return $rave_pay;
         	}

        
        if($user!=null)
        {
        	return response()->json(['status'=>true,'data'=>['reservation'=>$reservation,'available'=>$available,'user'=>$request->user(),'allocation'=>$allocation, 'building'=>$building, 'transaction'=>$transaction,'rave'=>$rave_pay]]);
        }
        return response()->json(['status'=>false,'message'=>"No Record Found"]);
}

public function stats(Request $request)
{
       $user= $request->user();

	$available=BedSpace::join('buildings','buildings.id','=','bed_spaces.building_id')->where([['is_reserved','=',0],['buildings.category','LIKE', $user->category],['gender', 'LIKE', $user->gender]])->count();

        return response()->json(['status'=>true,'data'=>['remaining'=>$available]]);

}
public function reserve_room(Request $request)
{
       $user= $request->user();

    $year=ActiveYear::where('is_active',1)->first();
        $bed=BedSpace::join('buildings','buildings.id','=','bed_spaces.building_id')->where([['is_reserved','=',0],['buildings.category','LIKE', $user->category],['gender', 'LIKE', $user->gender]])->get(['bed_spaces.id','category','building_id','gender','name','room_price'])->first();

        if($bed!=null)
        {
		
       // return $bed;
	        $bed->is_reserved=1;
	        $reservation= Reservation::firstOrNew(['student_id'=>$user->id,'bed_id'=>$bed->id, 'year'=>$year->year,'is_canceled'=>0]);
	        $reservation->save();
	        $bed->save();

	        $trans= new Transaction;
	        $trans->amount_due=$bed->room_price;
	        $trans->amount_due=$bed->room_price;
	        $trans->student_id=$user->id;
	        $trans->year=$year->year;
	        $trans->trans_ref="CEP".$user->id.rand(0,999999999);
	        $trans->save();

 $bed= BedSpace::join('buildings','buildings.id','=','bed_spaces.building_id')->where('bed_spaces.id','=',$bed->id)->first();
	        return response()->json(['status'=>true,'data'=>['transaction'=>$trans,'bed'=>$bed]]);
        }
       
	        return response()->json(['status'=>false,'message'=>"No bed available"]);





}

public function assign_bed($transaction_id)
{

       $user= $request->user();
       $r= Reservation::with(['bedspace','student'])->where('student_id',$user->id)->where('year',$year->year)->first();
       if($r!=null)
       {
       		$al= new Allocation;
       		$al->student_id= $r->student_id;
       		$al->bed_id= $r->bed_id;
       		$al->year= $r->year;
       		$al->transaction_id= $transaction_id;
       		$al->save();
        	return response()->json(['status'=>true,'data'=>$r]);
       }
        return response()->json(['status'=>false]);
	// $b=Building::where('id','>',14)->where('id','<',20)->get();
	// foreach ($b as $k) {
	
	// 	for($i=0; $i<$k->room_count; $i++)
	// 	{
	// 		$room= new Room;
	// 		$room->room_number= "ROOM " ;
	// 		$room->building_id= $k->id;
	// 		$room->save();
	// 		for($j=0; $j<$k->bed_per_room; $j++)
	// 		{
	// 			$bed= new BedSpace;
	// 			$bed->building_id= $k->id;
	// 			$bed->room_id= $room->id;
	// 			$bed->is_reserved=0;
	// 			$bed->Save();
	// 		}
	// 	}
	// }
}


public function confirmPayment()
{

}

 protected $verifyCount = 0;

public  function verifyTransaction($transaction_ref)
{

$this->verifyCount ++;
	$data = array('txref' => $transaction_ref,
	  'SECKEY' => getenv("RAVE_PRIVATE_KEY")  //secret key from pay button generated on rave dashboard
	);
	  $inv=Transaction::where('trans_ref', $transaction_ref)->first();


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

		  		$pay= new Payment;
		  		$pay->transaction_id= $inv->id;
		  		$pay->trans_ref= $inv->trans_ref;
		  		$pay->pay_amount=$response->body->data->amount ;
		  		$pay->save();
		      if ($response->body->data->amount >= $inv->amount_due) {
		 // dd($response);

		      
		          $inv->payment_status=1;
		          $inv->amount_paid= $response->body->data->amount ;
		          //$inv->payment_method="ONLINE";
		          $inv->save();
		          $reservation=Reservation::where([['student_id','=' , $inv->student_id], ['year','=', $inv->year]])->first();
		          $allocation= Allocation::firstOrNew(['student_id'=>$inv->student_id, 'year'=>$inv->year, 'bed_id'=> $reservation->bed_id]);
		          $allocation->transaction_id= $inv->id;
		          $allocation->save();
		          $bed= BedSpace::find($allocation->bed_id);
		          $bed->student_id= $inv->student_id;
		          $bed->save();
		          //$this->sendBookingSMS($inv);
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
