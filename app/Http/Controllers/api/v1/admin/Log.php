<?php

namespace App\Http\Controllers\Api\V1\Admin;


use App\Http\Controllers\Controller;
use App\SysLogs;

class Log extends Controller
{
	public static function create($user_id, $activity_id, $msg=''){
		SysLogs::create(['activity_id'=>$activity_id, 'user_id'=>$user_id,'description'=>$msg, 'ip'=>request()->ip()]);
	}

}