<?php

namespace App\Http\Controllers\api\v1\student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Allocation;

class AllocationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getStudentAllocation(Request $request)
    {
        $uid= $request->user()->id;
        $data=Allocation::with(['transaction'])->get();
        return response()->json(['status'=>true,'data'=>$data]);
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
        $data= $request->json()->all();
        $address= CustomerAddress::create($data);
        return response()->json(['status'=>true,'message'=>'Created Successfully','data'=>$data]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,$id)
    {
        $uid= $request->user()->id;
        $data=CustomerAddress::where('id',$id)->where('customer_id',$uid)->first();
        return response()->json(['status'=>true,'data'=>$data]);
        
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
    public function update(Request $request)
    {
        $id= $request->user()->id;
        $data=$request->json()->all();
        $add=CustomerAddress::find($id);
        $add->update($data);
        return response()->json(['status'=>true,'data'=>$add]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $uid= $request->user()->id;
        $add=CustomerAddress::find($id)->where('customer_id', $uid)->first();
        if($add!=null)
        {
                $add->delete();
                return response()->json(['status'=>true,'message'=>"Deleted Succesfully"]);
        }
    }
}
