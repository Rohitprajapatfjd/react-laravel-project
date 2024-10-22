<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SigninRequest;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Validator;

class AuthController extends Controller
{
    public function login(LoginRequest $request){
        $credient = $request->validated();
        if(Auth::attempt($credient)){
            return response()->json([
                'token'=> Auth::user()->createToken('main')->plainTextToken,
                'token-type'=> 'Bearer',
                'user'=>   Auth::user(),
                'message' => 'Login SuccessFully'
            ],200);
        }else{
          return response([
            'message'=>"Provided Email and Password is inCorrect"
          ],403);
        }
    }

    public function signIn(SigninRequest $request){
         $validator  = $request->validated();

            $user = User::create([
            'name'=> $request->name,
            'email'=> $request->email,
            'password'=> $request->password,
            ]);
            
            return response()->json([
                'user'=> $user,
                'message'=>'Sign In successFully',                
            ],200);
            
    }

    public function logout(Request $request){
        $user = $request->user();
        $user->tokens()->delete();

        return response('', 204);
    }
}
