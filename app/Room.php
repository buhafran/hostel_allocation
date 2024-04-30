<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    //

    public function building()
    {
    	return $this->hasOne('App\Building');
    }
     public function beds()
    {
    	return $this->hasOne('App\BedSpace');
    }

}
