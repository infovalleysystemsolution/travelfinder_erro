<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomeTravelController;

Route::get('/', [HomeTravelController::class, 'index'])->name('home');
Route::get('/searchstops', [HomeTravelController::class, 'searchStops'])->name('searchstops');


// Route::get('/', function () {
//     return 'Hello World';
// });

/*
X GET \
    -G "https://queropassagem.qpdevs.com/ws_v4/stops" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Basic {base64(YourUserName:YourPassword)}"
*/
// Route::get('/buscar', function (Request $request) {
//     $termo = $request->input('termo');

//     $response = Http::get('https://queropassagem.qpdevs.com/ws_v4/stops', [
//         'termo' => $termo
//     ]);
//     $dados = $response->json();

//     return response()->json($dados);
// });

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Http;

// Route::get('/buscar', function (Request $request) {
//     $termo = $request->input('termo');

//     $response = Http::withHeaders([
//         'Content-Type' => 'application/json',
//         'Accept' => 'application/json',
//         'Authorization' => 'Basic ' . base64_encode('seu_usuario:senha') // Substitua com suas credenciais
//     ])->get('https://queropassagem.qpdevs.com/ws_v4/stops', [
//         'termo' => $termo
//     ]);

//     $dados = $response->json();

//     return response()->json($dados);
// });