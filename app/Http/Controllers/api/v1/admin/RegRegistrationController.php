<?php
namespace App\Http\Controllers\api\v1\admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\RegTransactionView;
use Carbon\Carbon;

class RegRegistrationController extends Controller
{

	public function index(Request $r)
	{
		$trans= new RegTransactionView;
		if($r->has('start_date'))
		{
			$trans=$trans->where('payment_date',">=", $r->input('start_date'));
		}
		if($r->has('end_date'))
		{
			$to=Carbon::parse($r->input('end_date'))->endOfDay()->toDateTimeString();
			$trans=$trans->where('payment_date',"<=", $to);
		}

		$trans=$trans->paginate(5000);
	
		return response()->json(['registration'=>$trans]);
	}
}