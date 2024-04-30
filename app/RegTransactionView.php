<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RegTransactionView extends Model
{
	 protected $table = 'reg_transactions_view';
  	public function type()
  	{
  		return $this->hasOne('App\RegRate','id','service_id');
 	}
 	  public function student()
    {
    	return $this->hasOne('App\RegStudent', 'id','student_id');
    }
}
