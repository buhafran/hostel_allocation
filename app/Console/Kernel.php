<?php

namespace App\Console;




use App\Reservations;
use App\ActiveYear;
use App\Transaction;
use App\Http\Controllers\api\v1\student\ReservationController;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();

        //   $schedule->call(function () {
        //        $rcontrol = new ReservationController;

        // $year=ActiveYear::where('is_active',1)->first();
        // $res= Reservations::where([['created_at','>' ,Carbon::now()->addHour(-2)],['year','=', $year->year]])->get(); //only those not in allocations

        // foreach ($res as  $r) {

        //     $order=Transaction::where([['student_id','=',$r->student_id],['year','=', $year->year]])->first();
        //     if($order->payment_status!=1)
        //     {
        //         if($rcontrol->verifyTransaction($order->trans_ref))
        //         {
        //             continue;
        //         }
        //         else
        //         {
        //             $order->delete();
        //             $re->delete();
        //         }

        //     }
        // }
            

      ///  })->everyTwoHours();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }


    protected function torun(){
        // $rcontrol = new ReservationController;

        // $year=ActiveYear::where('is_active',1)->first();
        // $res= Reservations::where([['created_at','>' ,Carbon::now()->addHour(-2)],['year','=', $year->year]])->get(); //only those not in allocations

        // foreach ($res as  $r) {

        //     $order=Transaction::where([['student_id','=',$r->student_id],['year','=', $year->year]])->first();
        //     if($order->payment_status!=1)
        //     {
        //         if($rcontrol->verifyTransaction($order->trans_ref))
        //         {
        //             continue;
        //         }
        //         else
        //         {
        //             $order->delete();
        //             $re->delete();
        //         }

        //     }
        // }



    }
}
