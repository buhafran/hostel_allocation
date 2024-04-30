<?php

namespace App\Console\Commands;



use App\Reservation;
use App\BedSpace;
use App\ActiveYear;
use App\Transaction;
use App\Http\Controllers\api\v1\student\ReservationController;
use Carbon\Carbon;
use Illuminate\Console\Command;

class DeleteUnpaidReservations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'delete:reservations';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete all Unpaud Reservations';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
       $rcontrol = new ReservationController;

//exit(Carbon::now()->addHour(-2));

        $year=ActiveYear::where('is_active',1)->first();
        $res= Reservation::where([['created_at','<' ,Carbon::now()->addHour(-1)],['year','=', $year->year]])->get(); //only those not in allocations

        foreach ($res as  $r) {

            $order=Transaction::where([['student_id','=',$r->student_id],['year','=', $year->year]])->first();
            if($order!=null)
            {

            if($order->payment_status!=1)
            {
                if($rcontrol->verifyTransaction($order->trans_ref))
                {
                    continue;
                }
                else
                {
                    $bs=BedSpace::find( $r->bed_id);
                    $bs->is_reserved=0;
                    $bs->student_id= null;
                    $bs->save();

                    $order->delete();
                    $r->delete();
                }

            }
            }
            }
    }
}
