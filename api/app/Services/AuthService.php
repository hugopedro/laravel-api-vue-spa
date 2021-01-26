<?php

namespace App\Services;

use App\Exceptions\LoginInvalidException;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    public function login(string $email, string $password)
    {
        $login = [
            'email' => $email,
            'password' => $password,
        ];

        if (!$token = Auth::attempt($login)) { // tentando logar, se não logar erro
            throw new LoginInvalidException();
        }

        // se nao falhar retorna os dados do usuario
        return [
            'access_token' => $token,
            'token_type' => 'Bearer',
        ];
    }
}
