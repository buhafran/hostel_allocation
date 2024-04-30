<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class Customer extends Authenticatable
{
        use HasApiTokens,Notifiable,SoftDeletes;
        protected $fillable = [
        'FirstName', 'LastName','MiddleName'
    ];
    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];
        protected $hidden = [
        'password', 'remember_token',
    ];
}                                                                   