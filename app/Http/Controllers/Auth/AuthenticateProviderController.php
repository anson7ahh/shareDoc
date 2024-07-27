<?php

namespace App\Http\Controllers\Auth;

use Exception;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class AuthenticateProviderController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }
    public function callback($provider)
    {
        try {
            $providerUser = Socialite::driver($provider)->user();

            $findEmail = User::where('email', $providerUser->email)
                ->first();
            if (empty($findEmail)) {
                $password = Str::random(12);
                $newUser = User::create([
                    'provider_id' => $providerUser->getId(),
                    'password' => Hash::make($password),
                    'provider' => $provider,
                    'name' => $providerUser->getName(),
                    'email' => $providerUser->getEmail(),
                    'provider_token' => $providerUser->token,
                ]);
                $newUser->sendEmailVerificationNotification();
                Auth::login($newUser);
                return redirect('/');
            } else {
                if ($findEmail->provider !== $provider) {
                    return response()->json(['error' => 'Email address already in use'], 404);
                } else {
                    Auth::login($findEmail);
                    return redirect('/');
                }
            }
        } catch (Exception $e) {
            return redirect('/login');
        }
    }
}
