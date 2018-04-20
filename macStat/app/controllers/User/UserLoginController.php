<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Auth;
use App\User;

class UserLoginController extends Controller
{
    
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function showRegisterForm(){
        return view('users.user-register');
    }

    public function register(Request $request){
        $this->validateRegister($request);
        $request['password'] = bcrypt($request->password);
        User::create($request->all());
        return redirect('/user/login');
    }    

    public function showLoginForm(){
        return view('users.user-login');
    }

    public function login(Request $request){
        $this->validateLogin($request);
         if(Auth::attempt(['username'=>$request->username, 'password'=>$request->password])){
            return redirect('user/dashboard');
         }
         return redirect('user/login')->withErrors(['Login Failed']);
    }

    public function logout(){
        Auth::guard('web')->logout();
        return redirect('/user/dashboard');  /*To prevent the use of back button, 
                                         redirect it to your dashboard page when it is 
                                         logged out*/
    }





    public function validateRegister($request){
        return $this->validate($request, [
            'username' => 'required|max:255',
            'email' => 'required|max:255',
            'password' => 'required|confirmed|max:255',
        ]);
    }
    public function validateLogin($request){
        return $this->validate($request, [
            'username' => 'required|max:255',
            'password' => 'required|max:255',
        ]);
    }
}
