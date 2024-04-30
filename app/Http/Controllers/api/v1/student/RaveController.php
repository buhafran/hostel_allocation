<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Webhook;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;

use Illuminate\Support\Facades\Config;
//use the Rave Facade
use Rave;
class RaveController extends Controller
{


protected $basUrl;


public function __construct()
{
  //$this->basUrl="https://api.ravepay.co/";
  $this->basUrl="https://ravesandboxapi.flutterwave.com/";
}
public function log($activity_id,$meta=null)
{
   $log= new RaveLog();
   $log->account_id=Auth::user()->id;
   $log->meta=$meta;
   $log->activity_id=$activity_id;
   $log->save();

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



  public function getOrder($account_id=null)
  {

      if(is_null($account_id))
      {
        $account_id=Auth::user()->id;
      }
   // dd(Config::get('rave.publicKey'));
      $service=Service::find(1);//TODO make sure it can get reg and other services
      $session=$this->getSession();

     $order=Payment_order::where([['account_id','=',$account_id ],
      ['service_id','=', $service->id],
      ['year_details_id', $session->id]]);
     if($toRet=$order->first())
     {
      return  $toRet;
     }
     else
     {
      $toRet= new Payment_order;
      $toRet->order_id= substr($session->year,2) . Auth::user()->id . rand(99,1000);
      $toRet->service_id=$service->id;
      $toRet->year_details_id= $session->id;
      $toRet->account_id=$account_id;
      $toRet->payment_reference=$this->uniqidReal() . Auth::user()->id;
      $toRet->save();
      return $this->getOrder();

     }
  }
  public function getSession()
  {
    return $year=Yearly_information::where('status','=','Active')->first();
  }
public function getTransaction($txref)
{

   $params=array(
            "SECKEY" => getenv('RAVE_SECRET_KEY'),
            "txref" => $txref,
            "include_payment_entity" => "1"
        );

      $method='post';
 return $this->sendRequest($method, $this->basUrl. "flwv3-pug/getpaidx/api/xrequery",['form_params'=> $params])->getBody()->getContents();
}
public function initializeTransaction()
{
 $myOrder=$this->getOrder();
  $txref = $myOrder->payment_reference; // ensure you generate unique references per transaction.
$PBFPubKey = getenv('RAVE_PUBLIC_KEY');
     $params = array(
            "amount" => $myOrder->service->amount,
            "customer_email" => Auth::user()->email,
            "customer_firstname" => Auth::user()->first_name,
            "customer_lastname" => Auth::user()->surname,
            "customer_phone" => Auth::user()->phone,
            "custom_title" => 'IVE Institute',
            "country" => 'NG',
            "currency" => 'NGN',
            "txref" =>  $txref,
            "custom_logo" => getenv('RAVE_LOGO'),
            "custom_description" => $myOrder->service->name,
            "redirect_url" => route('payment_preview'),
            "PBFPubKey" => $PBFPubKey,
            "subaccounts"=>[
              [
                "id"=> getenv('RAVE_SPLIT_ID1'),
             //   "transaction_split_ratio"=>"1",
              ],
            //   [
                // "id"=> getenv('RAVE_SPLIT_ID2'),
              //   "transaction_split_ratio"=>"5",
              // ]
            ]
        );
     $method='post';
 return $this->sendRequest($method, $this->basUrl . "flwv3-pug/getpaidx/api/v2/hosted/pay",['form_params'=> $params])->getBody()->getContents();
}



public function makepayment()
{
   $make=[];
      $order=$this->getOrder();
      if($order->payment_status!=1)
      { 
        if($order->payment_reference=="")
        {
            $order->payment_reference=$this->uniqidReal() . Auth::user()->id;
          



           
          
            $make= json_decode($this->initializeTransaction());
        }
        else
        {
            $trans=json_decode($this->getTransaction($order->payment_reference));
            if(isset($trans->data->chargecode))
            {
                $chargeResponsecode = $trans->data->chargecode;
            $chargeAmount = $trans->data->amount;
            $chargeCurrency = $trans->data->currency;
            
            $amount = $order->service->amount;
            $currency = "NGN";
            if (($chargeResponsecode == "00" || $chargeResponsecode == "0") ) 
            {

              if($chargeCurrency == $currency)
              {
                if($chargeAmount == $amount)
                 {

              // transaction was successful...
              // please check other things like whether you already gave value for this ref
              // if the email matches the customer who owns the product etc
              //Give Value and return to Success page

                  $this->paymentActivation(Auth::user()->id);
                  return view('payment_preview_rave',['order'=>$order]);

                  //send receipt 
                 // return redirect('/success');
                }
                else
                {
                    // the amount paid is not equal to the specified amount

                }
              }
              else
              {
                //return error: the currency is not of 
              }
            
            } 
            }
         

            
        }
            sleep(2);
              $make= json_decode($this->initializeTransaction());
      }
      

    return view('payment_preview_rave',['order'=>$order,'json'=>$make]);
} 

private function paymentActivation($account_id)
{     

      $order=$this->getOrder($account_id);
      $order->payment_status=1;
      $chklist=O2018AppChecklist::find($account_id);
      $chklist->payment=1;
      $chklist->save();
      $order->save();
      $acc=Account::find($account_id);
      $acc->payment_status=1;
      $acc->save();

}



  public function initialization_form()
  {
   
    //return the form view here
return $this->initialize();
    // return view('payment_preview_rave',['order'=>$order,]);

  }
  public function initialize() {

    return $this->makepayment();



   
    $myOrder=$this->getOrder();
            $options = array(
            "amount" => $myOrder->service->amount,
            "email" => Auth::user()->email,
            "firstname" => Auth::user()->first_name,
            "lastname" => Auth::user()->surname,
            "phonenumber" => Auth::user()->phonenumber,
            "country" => 'NG',
            "currency" => 'NGN',
            "description" => $myOrder->service->name,
            "phonenumber" => Auth::user()->phone,
            "redirect_url" => route('pay'),
            "subaccounts"=>[
              [
                "id"=> "RS_D3F41E0BE2A363565D37F91B3E342583",
             //   "transaction_split_ratio"=>"1",
              ],
              // [
              //   "id"=> "RS_386520DCA68246A891F1798323A9B902",
              //   "transaction_split_ratio"=>"5",
              // ]
            ]
        );
             
  //dd(json_encode(  $options));
    if($myOrder->payment_status!=1)
    {
//dd($myOrder->service->amount);

        if(!empty($myOrder->payment_reference))
         {
            $data = Rave::verifyTransaction($myOrder->payment_reference);
            //TODO check if success
            //if the trans is a success update db and send receipt
          if($data)
          {


//           dd($data);
           $chargeResponsecode = $data->data->chargecode;
            $chargeAmount = $data->data->amount;
            $chargeCurrency = $data->data->currency;
            
            $amount = $myOrder->service->amount;
            $currency = "NGN";
            if (($chargeResponsecode == "00" || $chargeResponsecode == "0") ) 
            {

              if($chargeCurrency == $currency)
              {
                if($chargeAmount == $amount)///TODO avoid checking for expenses
                {

              // transaction was successful...
              // please check other things like whether you already gave value for this ref
              // if the email matches the customer who owns the product etc
              //Give Value and return to Success page

                $myOrder->payment_status=1;
                $chklist=O2018AppChecklist::find(Auth::user()->id);
                $chklist->payment=1;
                $chklist->save();
                $myOrder->save();
                $acc=Account::find(Auth::user()->id);
                $acc->payment_status=1;
                $acc->save();

                  //send receipt 
                 // return redirect('/success');
                }
                else
                {
                    // the amount paid is not equal to the specified amount

                }
              }
              else
              {
                //return error: the currency is not of 
              }
            
            } 

            else 
            {
                
            //display incoice with status
               // return redirect('/failed');
            }

}
else
{
  //it could'nt get the transaction
}
            //$options['txref']=$myOrder->payment_reference;//rave does not allow duplicate trans id even if not paid
         }
         else
         {
          //send to payment //ignor so it fall to  Rave::initialize( below
         }
    }
    else
    {
      //display receipt
    }

    $json=Rave::initialize(route('pay'),$options,$showform=false); // this route for callback


    $object=json_decode($json);

        $myOrder->payment_reference=$object->txref;
        $myOrder->save();
  
  
 



       return view('payment_preview_rave',['order'=>$myOrder,'json'=>$json]);
  }


  public function receipt()
  {
      $order= $order=$this->getOrder();
      $account=Account::find(Auth::user()->id);

      return view('pdf.receipt',['order'=>$order, 'account'=>$account]);
  }

  public function sendRequest($method, $url, $params=[])
    {

        $client = new Client( [
            'base_uri' => $url,
            'protocols' => ['https'],
            'headers' => [
                  "content-type: application/json",
                  "cache-control: no-cache"
                ]
        ]);
        try{
            if (strtolower($method) == 'get'){
                $result = $client->request('GET', $url);
            }elseif (strtolower($method) == 'post'){
                $result = $client->request('POST', $url, $params);
            }elseif (strtolower($method) == 'put'){
                $result = $client->request('PUT', $url, $params);
            }elseif (strtolower($method) == 'delete'){
                $result = $client->request('DELETE', $url);
            }

            return $result;
        }
        catch( Exception $e){
            throw $e;
        }
    }

public function webhook()
{
//$this->testLog('initialized');
// Retrieve the request's body
$body = @file_get_contents("php://input");

// retrieve the signature sent in the reques header's.
$signature = (isset($_SERVER['HTTP_VERIF_HASH']) ? $_SERVER['HTTP_VERIF_HASH'] : '');
$hook= new Webhook();
$hook->body=$body;
$hook->signature=$signature ;
$hook->save();
/* It is a good idea to log all events received. Add code *
 * here to log the signature and body to db or file       */

if (!$signature) {
    // only a post with rave signature header gets our attention
    $this->testLog('No signature');
    exit();
}


// Store the same signature on your server as an env variable and check against what was sent in the headers
$local_signature = getenv('RAVE_SIGNATURE');

// confirm the event's signature
if( $signature !== $local_signature ){
  // silently forget this ever happened
  $this->testLog('Not correct signature');
  exit();
}

http_response_code(200); // PHP 5.4 or greater
// parse event (which is json string) as object
// Give value to your customer but don't give any output
// Remember that this is a call from rave's servers and 
// Your customer is not seeing the response here at all
$response = json_decode($body);
//$this->testLog('json object generated' .$response->status);
//$this->testLog(var_dump($response));
if ($response->status == 'successful') {
    # code...
//$this->testLog('Status:successful');
    
  $ref=$response->txRef;
  $message="";
  $phone="";
  $order=Payment_order::where('payment_reference','=',$ref)->first();
$this->testLog("Reference available=". @$ref);
$json=$this->getTransaction($order->payment_reference);
  $trans=json_decode($json);
//$this->testLog("generated TransStatus" . @$json);
if(is_array($trans->data))
{

$this->testLog("is array");
	foreach($trans->data as $d)
	{
		if($d->chargecode=='00' OR $d->chargecode=='0')
		{
			$data=$d;
			break;
		}
	
	}

}
else
{
$data=$trans->data;
}
//$this->testLog(@$data->chargecode);
            if(isset($data->chargecode))
            {
            
//$this->testLog("chargecode exist");
            $chargeResponsecode = $data->chargecode;
            $chargeAmount = $data->amount;
            $chargeCurrency = $data->currency;
            
            $amount = $order->service->amount;
            $currency = "NGN";
            if (($chargeResponsecode == "00" || $chargeResponsecode == "0") ) 
            {
//$this->testLog("00 or 0 found");

              $account=Account::find($order->account_id);
               $phone=$account->phone;
              if($chargeCurrency == $currency)
              {
//$this->testLog("currency is the same");
                if($chargeAmount == $amount)
                 {

$this->testLog("amount the same");
              // transaction was successful...
              // please check other things like whether you already gave value for this ref
              // if the email matches the customer who owns the product etc
              //Give Value and return to Success page

                  $this->paymentActivation($order->account_id);  
                  $first_name=$account->first_name;

                  $message="Dear $first_name, your payment with Ref:$ref was successful. You can now continue your online application. https://goo.gl/RZWwtW";  
                  
             //     return view('payment_preview_rave',['order'=>$order]);

                  //send receipt 
                 // return redirect('/success');
                }
                else
                {
                    // the amount paid is not equal to the specified amount
                  $message="Dear $first_name, your account has not been activated. You need to contact the school Management. YourRef:$ref Err:302"; 
 
                }
              }
              else
              {
                  $message="Dear $first_name, your account has not been activated. You need to contact the school Management. YourRef:$ref Err:401"; 
                //return error: the currency is not of 
              }
            

//$this->testLog("$message $phone");
              if($message!="" AND $phone!="")
              {
              
//$this->testLog("Sent SMS");
                   $sms= new SMSController();
                   $sms->send($phone,$message);
              }
            } 


            }










  //send email and sms
}
exit();


}



public function testLog($string)
{
  $hook= new Webhook();
$hook->body=$string;
$hook->save();
}
}