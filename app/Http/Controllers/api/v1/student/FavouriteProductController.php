<?php

namespace App\Http\Controllers\Api\V1\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Favourite;

class FavouriteProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $uid= $request->user()->id;
        $data=Favourite::with('product')->where('customer_id', $uid)->get();
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
        $uid= $request->user()->id;
        $data['customer_id']=$uid;
        $address= Favourite::firstOrCreate($data);
        return response()->json(['status'=>true,'message'=>'Created Successfully','data'=>$data]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,$product_id)
    {
        $uid= $request->user()->id;
        $data=Favourite::with('product')->where([['customer_id','=', $uid],['product_id','=',$product_id]])->first();
        if($data!=null)
        {

        return response()->json(['status'=>true,'data'=>$data]);
        }
        else
        {

        return response()->json(['status'=>false]);
        }
        
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
       

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $product_id)
    {
        $uid= $request->user()->id;
        $add=Favourite::where([['customer_id','=', $uid],['product_id','=',$product_id]])->first();
        if($add!=null)
        {
                $add->delete();
                return response()->json(['status'=>true,'message'=>"Deleted Succesfully"]);
        }
                return response()->json(['status'=>false,'message'=>"Not Found"]);
    }
}
