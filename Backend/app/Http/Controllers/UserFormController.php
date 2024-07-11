<?php

namespace App\Http\Controllers;

use App\Models\UserForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserFormController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullName' => 'required|min:3|regex:/^[a-zA-Z\s]+$/',
            'company' => 'required|regex:/^[a-zA-Z\s]+$/',
            'email' => 'required|email|unique:usersform,email',
            'phoneNumber' => 'required|digits:10',
            'hear' => 'required',
        ], [
            'email.email' => 'Invalid Email',
            'email.unique' => 'Email already exit!!'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $user = UserForm::create($request->all());

        return response()->json(['message' => 'User information stored successfully', 'user' => $user], 201);
    }
    public function sample()
    {
        return 'Yes Work';
    }
}
