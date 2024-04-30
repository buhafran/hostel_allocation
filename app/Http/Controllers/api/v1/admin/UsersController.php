<?php

namespace App\Http\Controllers\api\v1\admin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::paginate(500);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data=$request->json()->all();
           $validator = Validator::make($data, [
           'email' => 'required|email|unique:users',
           'name' => 'required|string|max:50',
           'role' => 'required|string|max:50',
           'password' => 'required|min:6'
       ]);
         if ($validator->fails()) {
            return response()->json(['status'=>false,'message'=>"Check Your Inputs and try again", 'errors'=>$validator->errors()]);
         }
           Log::create($request->user()->id,1,'Users');
        
         return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'role' => $data['role'],
           // 'created_by' => $request->user()->id,
            'password' => Hash::make($data['password']),
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $r, $id)
    {
               Log::create($r->user()->id,5,'Users:' . $id);
        return User::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

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
            $user->save();
            return response()->json(['status'=>true,'message'=>"Password Changed "]);
         }

    }
    public function update(Request $request, $id)
    {
        $data=$request->json()->all();
        $user= User::find($id);
        if($user!=null)
        {
            Log::create($request->user()->id,2,'Users:' . $id);
            if(isset($data['name']))
            {
                $user->name=$data['name'];
            }
             if(isset($data['email']) AND $data['email']!=$user->email)
            {
               $validator = Validator::make($data, [
                'email' => 'required|email|unique:users',
              ]);
                 if ($validator->fails()) {
                    return response()->json(['status'=>false,'message'=>"Check Your Inputs and try again", 'errors'=>$validator->errors()]);
                 }

                $user->email=$data['email'];
            }
            if(isset($data['new_password']))
            {
                $user->password= Hash::make($data['new_password']);
            }

            if(isset($data['role']))
            {
                $user->role=$data['role'];
            }
            if(isset($data['date_of_birth']))
            {
                $user->date_of_birth=$data['date_of_birth'];
            }
                if(isset($data['date_of_employment']))
            {
                $user->date_of_employment= $data['date_of_employment'];
            }
                if(isset($data['phone_number']))
            {
                $user->phone_number= $data['phone_number'];
            }
                if(isset($data['state']))
            {
                $user->state=$data['state'];
            }
                if(isset($data['permanent_address']))
            {
                $user->permanent_address= $data['permanent_address'];
            }
                if(isset($data['residential_address']))
            {
                $user->residential_address= $data['residential_address'];
            }

           // $user->updated_by=$request->user()->id;
            $user->save();
            return $user;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $r,$id)
    {
        $user= User::find($id);
        if($user!=null)
        {
                           Log::create($r->user()->id,3,'Users:' . $id);
            $user->delete();
        return response()->json(['status'=>true,'message'=>"User Deleted Successfully"]);
        }

    }




        function changepasswordAdmin($id, Request $request)
    {
        if($request->user()->role=="Administrator")
        {

           $data=$request->json()->all();
           $validator = Validator::make($data, [
           'new_password' => 'required|min:6'
       ]);
            if ($validator->fails()) {
            return response()->json(['status'=>false,'message'=>"Check Your Inputs and try again", 'errors'=>$validator->errors()]);
         }
         $user=User::find($id);
         if($user!=null)
         {
        Log::create($request->user()->id,2,'Users:ResetUserPassword:' . $id);
            $user->password=Hash::make($data['new_password']);
       //     $user->save();
            return response()->json(['status'=>true,'message'=>"Password Changed "]);
         }

        }
        return response()->json(['status'=>false,'message'=>"UnAuthorized "]);
    }
}
