<?php

namespace App\Http\Controllers\Api\V1\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Staff;
class StaffController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        
        if($request->has('is_driver'))
        {
            $b=Staff::where('isDriver', $request->input('is_driver'))->paginate(1000);
            return response()->json(['data'=>$b]);
        }
        $b=Staff::paginate(1000);
        return response()->json(['data'=>$b]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Basket $basket)
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data= $request->json()->all();
        $b=Staff::create($data);
        return response()->json(['data'=>$b]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $b=Staff::find($id);
        if($b!=null)
        {
            return response()->json(['data'=>$b,'status'=>true,'message'>'Fetched Successfully']);
        }
        return   response()->json(['status'=>false,'message'=>'Not Found']);
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $basket= $request->json()->all();
        $b=Staff::find($id);
        if($b!=null)
        {
            $res=$b->update($basket);
            return response()->json(['data'=>$b, 'status'=>true,'message'=>'Updated Successfully']);
        }
        return response()->json(['status'=>false,'message'=>"Not Found"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $b=Staff::find($id);
        if($b!=null)
        {

            $b->delete();
            return response()->json(['data'=>$b,'status'=>true,'message'=>"Deleted Successfully"]);
        }
          return response()->json(['status'=>false,'message'=>"Not Found"]);
    }
}
