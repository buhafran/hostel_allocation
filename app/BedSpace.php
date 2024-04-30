<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BedSpace extends Model
{
    //

    public function room()
    {
    	return $this->hasOne('App\Room');
    }
}
