<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Staff extends Model
{
     use SoftDeletes;
        protected $fillable = [
        'FirstName', 'LastName', 'Email','PhoneNumber','ResidentialAddress','State','DateOfEmploymnent','isDriver','CreatedBy'];

}
