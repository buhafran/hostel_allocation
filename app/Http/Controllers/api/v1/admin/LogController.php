<?php

namespace App\Http\Controllers\Api\V1\Admin;


use App\Http\Controllers\Controller;
use App\SysLogs;
use Illuminate\Http\Request;

class LogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $r)
    {
        Log::create($r->user()->id,6,'Logs');
        $data= SysLogs::with('activity')->
paginate(1000);
        return response()->json(['status'=>true, 'data'=>$data]);
    }
  public function myactivity(Request $r)
    {
        $data= SysLogs::with(['activity','user'=>(function($query){
                            $query->select('id','name');
                            })
    ])->where('user_id', $r->user()->id)->paginate(1000);
        return response()->json(['status'=>true, 'data'=>$data]);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $r,$id)
    {
        if($r->user()->role!='Administrator')
        {
            return response()->json(['status'=>false, 'message'=>"Un Authorized"]);
        }
        Log::create($r->user()->id,6,'Logs:' . $id);
        $data= SysLogs::with('activity')->where('user_id', $id)->paginate(1000);
        return response()->json(['status'=>true, 'data'=>$data]);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
