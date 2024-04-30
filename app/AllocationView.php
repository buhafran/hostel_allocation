<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
class AllocationView extends Model
{
	   use SoftDeletes;
   protected $table="allocation_view";
      public function transaction()
    {
    	return $this->hasOne('App\Transaction','id','transaction_id');
    }
    public function student()
    {
    	return $this->hasOne('App\Student', 'id','student_id');
    }
}
