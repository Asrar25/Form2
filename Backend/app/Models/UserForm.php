<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserForm extends Model
{

    protected $table = 'usersform';
    protected $fillable = [
        'fullName',
        'company',
        'email',
        'phoneNumber',
        'message',
        'hear',
        'interestProduct',
        'newsProduct',
    ];

    protected $casts = [
        'interestProduct' => 'array', // Cast 'interestProduct' attribute to array
        'newsProduct' => 'boolean',
    ];
}
