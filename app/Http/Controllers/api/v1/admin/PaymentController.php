<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Payment;
use App\PaymentView;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
class PaymentController extends Controller
{
      /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $r)
    {
        Log::create($r->user()->id,6,'Payments');
        $b=PaymentView::paginate(1000);
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
        Log::create($r->user()->id,1,'Payments:'. $id);
        $data= $request->json()->all();
        $data['payment_reference']= Str::random(12);
        $b=Payment::create($data);
        return response()->json(['data'=>$b]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $r,$id)
    {
        Log::create($r->user()->id,5,'Payments:'. $id);
        $b=PaymentView::find($id);
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
        Log::create($r->user()->id,2,'Payments:'. $id);
        $basket= $request->json()->all();
        $b=Payment::find($id);
        if($b!=null)
        {
           // $res=$b->update($basket);
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
    public function destroy(Request $r,$id)
    {
        $b=Payment::find($id);
        if($b!=null)
        {
           Log::create($r->user()->id,3,'Payments:'. $id);

            $b->delete();
            return response()->json(['data'=>$b,'status'=>true,'message'=>"Deleted Successfully"]);
        }
          return response()->json(['status'=>false,'message'=>"Not Found"]);
    }
}
