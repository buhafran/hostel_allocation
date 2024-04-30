<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Allocation extends Model
{
    //
       use SoftDeletes;
	protected $fillable=["student_id","bed_id","year"];
    public function transaction()
    {
    	return $this->hasMany('App\Transaction');
    }
    public function student()
    {
    	return $this->hasOne('App\Student');
    }

      
}
