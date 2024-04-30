<?php


namespace App\Http\Controllers\api\v1\student;

use Illuminate\Http\Request;
use App\Customer;
use App\Student;
use App\Http\Resources\CustomerCollection;
use App\Http\Resources\CustomerResource;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\SmsToken;
class UserStudentController extends Controller
{


public function update(Request $request)
{
    $data= $request->json()->all();
      $user= $request->user();
      $up=false;
  
    if(isset($data['gender']) and ($data['gender']=='M' OR $data['gender']=="F"))
    {
      $user->gender= $data['gender'];
      $user->save();
      $up=true;
    }
    if(isset($data['category']) AND $data['category']!="")
    {
      $user->category= $data['category'];
      $user->save();
      $up=true;
    }
    if($up)
    {

       return response()->json([
                'status'=>true,
                'message' => 'Updated Succesfully',
            ], 200);
    }
       return response()->json([
                'status'=>false,
                'message' => 'No Update',
            ], 200);


}

public function resetPassword(Request $request)
{
    $data= $request->json()->all();
    $validator= Validator::make($data,[
        'Phone'=>'required|string|exists:customers',
        'password' =>'required|min:6'
    ]);
    if($validator->fails())
    {
            return response()->json([
                'status'=>false,
                'message' => 'Error',
                'errors' => $validator->errors()
            ], 200);
    }
    $user= Customer::where('Phone', $data['Phone'])->first();
    if($user!=null)
    {

        $this->sendToken($user);
               return response()->json([
                'status'=>true,
                'message' => 'Success'

            ], 200);
    }

            return response()->json([
                'status'=>false,
                'message' => 'Error occured',
            ], 200);

    }

     public function login(Request $request)
    {

        $data=$request->json()->all();

    $validator= Validator::make($data,[
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);

         //dd("");
        $credentials = ['email'=>$data['email'], 'password'=>$data['password']];
        $user= Student::where('email', $data['email'])->first();



        if($user!=null)
        {

            if (Hash::check($data['password'],$user->password)) {
                    $tokenResult = $user->createToken('Personal Access Token');
                    $token = $tokenResult->token;
                    if ($request->remember_me)
                    {
                        $token->expires_at = Carbon::now()->addDays(1);
                    }
                    else{

                        $token->expires_at = Carbon::now()->addDays(1);
                    }
                    $token->save();
                    return response()->json([
                        'access_token' => $tokenResult->accessToken,
                        'token_type' => 'Bearer',
                        'expires_at' => Carbon::parse(
                            $tokenResult->token->expires_at
                        )->toDateTimeString()
                    ]);
            }
         
        } 

    return response()->json([
                'status'=>false,
                'message' => 'Unauthorized'
            ], 401);
    }
  
    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
    // return $request->user();
        $request->user()->token()->revoke();
        return response()->json(['status'=>true,
            'message' => 'Successfully logged out'
        ],202);
    }
  
    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        
        return response()->json($request->user());
    }
    public function updateProfile(Request $request){
        $data= $request->json()->all();
        if(isset($data['name']))
        {
            $user = $request->user();
            $user->FirstName= $data['name'];
            $use->save();
               return response()->json([
                'status'=>true,
                'data'=>$user,
                'message' => 'Update Successful'
            ],200);
        }
    }

public function resendToken(Request $request)
{
    $user= $request->user();
    return $this->sendToken($user);
}
    public function sendToken($user){
         $item= SmsToken::where([['user_id','=',$user->id], ['expires_at','<=',Carbon::now()]])->first();
         if($item!=null)
         {
             return response()->json([
                'status'=>false,
                'message' => 'Wait for few min and retry'
            ],200);
         }
         $total= SmsToken::where('user_id','=',$user->id)->where('created_at',Carbon::today())->count();
         if($total>3)
         {
                return response()->json([
                'status'=>false,
                'message' => 'Too many attempts, contact support'
            ],200);
         }


         $token= rand(100000,999999);

         $smst= new SmsToken;
         $smst->token= $token;
         $smst->user_id= $user->id;
         $smst->expires_at= Carbon::now()->addMinutes(2);
         $smst->save();
         $message= "Your FAABZ Verification Code is ".$token ." . Do not Share";
         $phone =$user->Phone;
      $res= $this->sendSMS($phone,  $message);

                return response()->json([
                'status'=>true,
                'message' => 'SMS Sent to ' . $phone
            ],200);

    }

    public function verifySMSToken(Request $request)
    {
        //return Carbon::now();
        $data= $request->json()->all();
        if(isset($data['token']))
        {

    
            $item= SmsToken::where([['token','=',$data['token']],['user_id','=',$request->user()->id]])->first();

            if($item!=null)
            {
      

                if($item->expires_at>=Carbon::now())
                {

                        return response()->json([
                        'status'=>true,
                        'message' => 'Token Valid'
                    ],200);
                }
            }
        }

            return response()->json([
            'status'=>false,
            'message' => 'Invalid Token'
        ],200);
    } 

        function changepassword(Request $request)
    {
           $data=$request->json()->all();
           $validator = Validator::make($data, [
           'old_password' => 'required',
           'new_password' => 'required|confirmed|min:6'
       ]);
           if(isset($data['old_password']))
           {

            $errors=$validator->errors();
            if ( !Hash::check($data['old_password'], $request->user()->password) ) {
                $merror=[];
                $merror['old_password']=array('Your current password is incorrect.');

                  return response()->json(['status'=>false,'message'=>"Check Your Inputs and try again", 'errors'=>$merror]);
            }
           }

        if ($validator->fails()) {
            return response()->json(['status'=>false,'message'=>"Check Your Inputs and try again", 'errors'=>$errors]);
         }
        //Log::create($request->user()->id,2,'Users:ChangePassword:' . $id);
         $user=$request->user();
         if($user!=null)
         {
            $user->password=Hash::make($data['new_password']);
          //  $user->save();
            return response()->json(['status'=>true,'message'=>"Password Changed "]);
         }

    }

    public function sendSMS($phone, $message)
    {
         $message = urlencode($message);
          $senderid = urlencode('ANYALOKO');
          $to = $phone;
          $token = 'OHoQIJqYnqMzTOFMdQ8cZnmuuZdFz16RhmqnklTTT6eFdm5SI6SA1zpNONaYrxuluA8qOwLzCjMKZuRURGJismSMWTWPkG1T0NwY';
          $routing = 3;
          $type = 0;
          $baseurl = 'https://smartsmssolutions.com/api/json.php?';
          $sendsms = $baseurl.'message='.$message.'&to='.$to.'&sender='.$senderid.'&type='.$type.'&routing='.$routing.'&token='.$token;

      return file_get_contents($sendsms);

    }


     public function httpPost($url, $data)
    {
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); 
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        $response = curl_exec($curl);
        curl_close($curl);
        return $response;
    }



}
