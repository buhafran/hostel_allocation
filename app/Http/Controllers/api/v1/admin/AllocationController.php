<?php

namespace App\Http\Controllers\api\v1\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\AllocationView;
use Carbon\Carbon;

class AllocationController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
       // Log::create($r->user()->id,6,'Delivery');
        $b=AllocationView::with(['transaction','student']);

        if($request->has('start_date'))
        {
            $b=$b->where('updated_at',">=", $request->input('start_date'));
        }
    if($request->has('end_date'))
        {
            $to=Carbon::parse($request->input('end_date'))->endOfDay()->toDateTimeString();
            $b=$b->where('updated_at',"<=", $to);
        }

        $b=$b->paginate(5000);
        return response()->json(['data'=>$b]);
    }
    public function bulding_summary(Request $request)
    {
       // Log::create($r->user()->id,6,'Delivery');
        $b=BuildingSummaryView::paginate(100);
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
        // $data= $request->json()->all();
        // $b=Delivery::create($data);
        // Log::create($request->user()->id,1,'Delivery:'. $b->id);
        // return response()->json(['data'=>$b]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $r,$id)
    {
        // $b=Delivery::find($id);
        // if($b!=null)
        // {
        // Log::create($r->user()->id,5,'Delivery');
        //     return response()->json(['data'=>$b,'status'=>true,'message'>'Fetched Successfully']);
        // }
        // return   response()->json(['status'=>false,'message'=>'Not Found']);
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
       
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $r, $id)
    {
      
    }











}
