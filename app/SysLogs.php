<?php

namespace App;
use Carbon\Carbon;

use Illuminate\Database\Eloquent\Model;

class SysLogs extends Model
{
    public $timestamps=false;
    protected $fillable=['activity_id','user_id','description','ip'];
    protected $dates=['created_at'];

    public function activity()
    {
    	return $this->hasOne('App\SysActivity','id','activity_id');
    }
    public function user()
    {
    	return $this->hasOne('App\User','id','user_id');
    }
     public function getCreatedAtAttribute($value)
    {
        return  ['raw'=>$value,'since'=>Carbon::parse($value)->diffForHumans()];
    }
}
