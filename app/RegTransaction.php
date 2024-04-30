<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RegTransaction extends Model
{

  use SoftDeletes;


  public function type()
  {
  	return $this->hasOne('App\RegRate','id','service_id');
  }
}
