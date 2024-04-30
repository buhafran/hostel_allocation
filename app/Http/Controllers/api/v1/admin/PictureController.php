<?php

namespace App\Http\Controllers\Api\V1\Admin;

use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Picture;
use App\Product;
use Illuminate\Support\Str;
class PictureController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $r)
    {
        Log::create($r->user()->id,6,'Pictures');
        $b=Picture::paginate(1000);
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

    public function makeProductDefaultPicture(Request $request)
    {
     
        $data= $request->json()->all();
        $data['payment_reference']=Str::random(12);
        $validator = Validator::make($data, [
           'picture_id' => 'required',    
       ]);
         if($validator->fails())
         {
           return  response()->json(['status'=>false, 'errors'=>$validator->errors(), 'message'=>"Errors "]);
         }
        Log::create($request->user()->id,2,'Pictures-MakeDefault:'. $data['picture_id']);   

         $pic= Picture::find($data['picture_id']);
         $prod= Product::find($pic->ProductId);
         $prod->picture_url= $pic->PictureUrl;
         $prod->save();

     return response()->json(['status'=>true,'message'=>"Updated Successfully"]);
    }
    public function store(Request $request)
    {
        
         $validator = Validator::make($request->all(), [
           'file' => 'required|image',
           'product_id' => 'required',
          
       ]);
         if($validator->fails())
         {
           return  response()->json(['status'=>false, 'errors'=>$validator->errors(), 'message'=>"File Not Uploaded "]);
         }

        Log::create($request->user()->id,1,'Pictures:'. $request->input('product_id'));   
        $file=$request->file('file');
        $product_id= $request->input('product_id');
        $new_name= Str::uuid() . '.' .$file->getClientOriginalExtension();
        $des= 'products/' .$product_id  ;
         $s= $file->move($des,$new_name);
        $full_name = '/' . $des. '/' .$new_name;
        $pic= new Picture;
        $pic->PictureUrl=$full_name;
        $pic->ProductId= $product_id;
        $pic->save();
        if($request->has('make_default'))
        {
            if($request->input('make_default')==1)
            {
                    $prod=Product::find($product_id);
                    if($prod!=null)
                    {
                        $prod->picture_url= $full_name;
                        $prod->save();
                    }
            }
        }
        return response()->json(['status'=>true,'message'=>"Uploaded Successfully", 'url'=>$full_name]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $r, $id)
    {
        $b=Picture::find($id);
        if($b!=null)
        {
            Log::create($r->user()->id,5,'Pictures:'. $id);
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
        $b=Picture::find($id);
        if($b!=null)
        {
            Log::create($request->user()->id,2,'Pictures:'. $id);
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
    public function destroy(Request $r,$id)
    {
        $b=Picture::find($id);
        if($b!=null)
        {
          Log::create($r->user()->id,3,'Pictures:'. $id);
            $b->delete();
            return response()->json(['data'=>$b,'status'=>true,'message'=>"Deleted Successfully"]);
        }
          return response()->json(['status'=>false,'message'=>"Not Found"]);
    }
}
