<?php

namespace App\Http\Controllers\Api\V1\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\CustomerAddress;
use App\Order;
use App\Product;
use App\OrderItem;

use Illuminate\Support\Str;


class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $uid= $request->user()->id;
        $data=Order::with('items')->where('CustomerId', $uid)->get();
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
       //  $data=$request->json()->all();
       //     $validator = Validator::make($data, [
           
       //     'password' => 'required|min:6'
       // ]);
       //  if ($validator->fails()) {
       //     return response()->json(['status'=>false,'message'=>"Check Your Inputs and try again", 'errors'=>$validator->errors()]);
       //   }

        $data= $request->json()->all();
        //return $data['address'];
        $random = Str::random(10);
        $customer_id=$request->user()->id;
        $data['address']['customer_id']=$customer_id;
        $data['address']['active']=true;
        $add= CustomerAddress::firstOrCreate($data['address']);
        $order=new Order;
        $order->DeliveryId = $add->id;
        $order->CustomerId = $customer_id;
        $order->save();
        $total=0;
        $total_discount=0;
        foreach ($data['products'] as  $p) {
            $prod= Product::find($p['id']);
            if($prod!=null)
            {
                $discount=(($prod->UnitPrice /100) * $prod->Discount);
                $amount= ($prod->UnitPrice * $p['quantity']) -$discount;
                $it=['OrderId'=>$order->id,'ProductId'=>$prod->id,'Quantity'=>$p['quantity'], 'UnitLandedPrice'=>$prod->LandingPrice, 'UnitPrice'=>$prod->UnitPrice,'CustomerId'=>$order->CustomerId,'Amount'=>$amount,'Discount'=>$discount,'name'=>$prod->ShortName];
                $oi=OrderItem::create($it);
                    $total+=$amount;
        $total_discount+=$discount;
        
            }
        }
        $order->Discount=$total_discount;
        $order->AmountDue=$total;
        $order->OrderReference= $random. $order->CustomerId;
        $order->save();
        return response()->json(['status'=>true,'message'=>'Created Successfully']);
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
        $data=Order::with(['items'])->where('id',$id)->where('CustomerId',$uid)->first();
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
    //Cancel order
    public function update(Request $request, $id)
    {
        $uid= $request->user()->id;
        $data=$request->json()->all();
        if(isset($data['state']) AND $data['state']=='canceled')
        {

            $order=Order::where([['CustomerId','=',$uid],['id','=',$id]])->first();
            if($order!=null )
            {
                if($order->is_treated!=1)
                {

                 $order->state=$data['state'];
                 $order->save();
                return response()->json(['status'=>true,'data'=>$order, 'message'=>"Updated"]);
                }

            }
        }
        return response()->json(['status'=>false,'message'=>'Not Found/ Err']);
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
