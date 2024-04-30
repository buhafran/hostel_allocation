<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
class Student extends Authenticatable
{
use HasApiTokens,Notifiable,SoftDeletes;
  protected $fillable=["name","phone","state","gender","category","address",'registration_number'];
  protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];
        protected $hidden = [
        'password', 'remember_token',
    ];
}
