<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\VehicleQueue; 
use App\Invoice;
use App\Customer;
use App\Temp;
class UserBookingController extends Controller
{
    public function index(Request $r)
    {
        if($r->has('destination') AND $r->input('destination')!="")
        {
            $source=VehicleQueue::where('booking_complete','!=',1)->get();
            $destinations=VehicleQueue::where('source_id', $r->input('source'))->where('booking_complete','!=',1)->get();
            $bookings=VehicleQueue::where('source_id', $r->input('source'))->where('destination_id', $r->input('destination'))->where('booking_complete','!=',1)->get();
            return view('booking',['bookings'=>$bookings, 'destinations'=>$destinations,'sources'=>$source]);
        }
        elseif($r->has('source'))
        {
            $source=VehicleQueue::where('booking_complete','!=',1)->get();
            $destinations=VehicleQueue::where('source_id', $r->input('source'))->where('booking_complete','!=',1)->get();
            return view('booking',['destinations'=>$destinations,'sources'=>$source]);
        }
        $source=VehicleQueue::where('booking_complete','!=',1)->get();
        return view('booking',['sources'=>$source]);
    }

    public function book($id, $token,Request $r)
    {
        $book=VehicleQueue::find($id);
        if($book->booking_complete==1)
        {

        }
        $temp= Temp::firstOrCreate(['token'=>$token,'ticket_id'=>$id]);
         $customer=null;
        if($temp->customer_id!="")
        {
            $customer=Customer::find($temp->customer_id);
        }
        return view('booking_form', ['b'=>$book,'token'=>$token, 'customer'=>$customer]);

    }


    public function customer_booking($destination_id, Request $request)
    {
        $data= $request->json()->all();
       //dd($data);
        $eml='payments@anyaloko.com';
        $book=VehicleQueue::find($destination_id);
        $customer= Customer::firstOrCreate(['phone_number'=>$data['phone_number'],'customer_name'=>$data['full_name']]);
        $customer->customer_name=$data['full_name'];
        $customer->phone_number=$data['phone_number'];
        $eml=isset($data['email'])? $data['email']: $eml;
        $customer->email=$eml;
        $customer->contact_name=$data['contact_name'];
        $customer->contact_phone=$data['contact_phone'];
        $customer->save();
        $temp= Temp::where(['token'=>$data['token']])->first();
        if($temp!=null AND $temp->customer_id=="")
        {
            $temp->customer_id=$customer->id;
            $temp->save();
        }
        $invoice= Invoice::firstOrCreate(['queue_id'=> $book->id,'customer_id'=>$customer->id]);
        if($invoice->payment_status==1)
        {
            $errOb['status']='error';
            $errOb['message']='Ticket already purchased';
            $errOb['redirect_url']=route('print_ticket',['reference'=>$invoice->reference]);

            return $errOb;
        }
        $invoice->amount_due=$book->price;
        $invoice->reference=$this->generateReference($invoice->id);
        $invoice->save();
        $paymentObj=[];

        $paymentObj['PBFPubKey']='FLWPUBK_TEST-23df7eae3d6e26b57091a440572e053f-X';
        $paymentObj['customer_email']=$eml;
        $paymentObj['amount']=$invoice->amount_due;
        $paymentObj['customer_phone']=$data['phone_number'];
        $paymentObj['currency']='NGN';
        $paymentObj['txref']=$invoice->reference;
        $paymentObj['custom_title']="Anyaloko Transport";
        $paymentObj['custom_description']="Car Booking Payment";
        $paymentObj['redirect_url']=route('print_ticket',['reference'=>$invoice->reference]);
        $paymentObj['meta']=['metaname'=>'invoice_id','metavalue'=> $invoice->id];
      //  dd($paymentObj);
        return $paymentObj ;

    }

    public function print_ticket($reference)
    {
            $inv=Invoice::where('reference', $reference)->first();

                if($inv ==null)
                {
                    return view('errors.404');
                }
                    //ver
                if($inv->payment_status==1)
                {

                    return view('ticket',['c'=>$inv->customer,'q'=>$inv->queue,'invoice'=>$inv]);
                }
                else
                {

                    $rave= New Rave;
                       
                    if( $rave->verifyTransaction($reference)){

                        return view('ticket',['c'=>$inv->customer,'q'=>$inv->queue,'invoice'=>$inv]);
                    }
                    else
                    {
                        return back();
                    }
                }
       }

public function reprint_ticket( Request $request)
{
    if($request->has('reference_number'))
    {
        return redirect(route('print_ticket',['reference'=>$request->input('reference_number')]));
    }
}
    private function generateReference($iid="")
    {
        $chars=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
        $ref="ALK-";
        for($i=0; $i<6; $i++)
        {
           
             $u=rand(0,25);
            $ref.=$chars[$u];

        }
        $le= strlen($iid);

        $ref.="-T0" . $iid;


        $check= Invoice::where('reference',$ref)->first();
        if($check==null)
        {
            return $ref;
        }
        return $this->generateReference($iid);
    }

    function uniqidReal($lenght = 13) {
    // uniqid gives 13 chars, but you could adjust it to your needs.
    if (function_exists("random_bytes")) {
        $bytes = random_bytes(ceil($lenght / 2));
    } elseif (function_exists("openssl_random_pseudo_bytes")) {
        $bytes = openssl_random_pseudo_bytes(ceil($lenght / 2));
    } else {
        throw new Exception("no cryptographically secure random function available");
    }
    return substr(bin2hex($bytes), 0, $lenght);
}



public function createBooking(Invoice $invoice, VehicleQueue $Queue)
{
    $booking= Booking::firstOrCreate(['customer_id'=>$invoice->customer_id,'vehicle_queue_id'=>$Queue->id]);

    //$booking->customer_id= $invoice->customer_id;
    $booking->source_id=$Queue->source_id;
    $booking->destination_id=$Queue->destination_id;
    //$booking->vehicle_queue_id=$Queue->id;
    $booking->ticket_reference="";
    $booking->save();

}

}
