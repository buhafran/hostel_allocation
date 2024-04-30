<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Reservation extends Model
{
     use SoftDeletes;
	protected $fillable=["student_id","bed_id", "year","is_canceled"];

    public function student()
    {
    	return $this->hasOne("App\Student");
    }
    public function bedspace()
    {
    	return $this->hasOne("App\BedSpace",'id','bed_id');
    }

}
