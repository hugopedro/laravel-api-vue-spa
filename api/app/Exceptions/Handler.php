<?php

namespace App\Exceptions;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @param mixed $request
     */

    //Detalhe que o laravel 8 gera uma função register por padrão, mas não é essa que será usada

    public function render($request, Throwable $exception)
    {
        if ($exception instanceof ModelNotFoundException) {
            $modelName = class_basename($exception->getModel());

            $apiErrorCode = $modelName.'NotFoundException';
            $message = $modelName.' Not found.';

            return response()->json([
                'error' => $apiErrorCode,
                'message' => $message,
            ], 404);
        }

        return parent::render($request, $exception);
    }
}
