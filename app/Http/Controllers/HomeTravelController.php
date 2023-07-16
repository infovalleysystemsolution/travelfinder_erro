<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class HomeTravelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('home_travel');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function searchStops()
    {
        // if (strlen($search) > 2) {

            $client = new Client();

            // encrypt the credentials
            $encrypted_authentication = base64_encode(
                env('USER_QUERO_PASSAGEM').":".env('PASSWORD_QUERO_PASSAGEM')
            );
            $response = $client->get('https://queropassagem.qpdevs.com/ws_v4/stops', [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json',
                    'Authorization' => 'Basic ' . $encrypted_authentication,
                ],
            ]);

            // OGet the response body
            $body = $response->getBody()->getContents();

            // Decode the returned JSON
            $data = json_decode($body);

            return $data;
        // }




        // $encrypted_authentication = base64_encode('teste_dev2:WhOnBcjTsGseYDE9819GloHYhgH');
        // curl -X GET \
        // -G "https://queropassagem.qpdevs.com/ws_v4/stops" \
        // -H "Content-Type: application/json" \
        // -H "Accept: application/json" \
        // -H "Authorization: Basic $encrypted_authentication";


    }



    // $encrypted_authentication = base64_encode('user:password');
    // curl -X GET \
    // -G "https://queropassagem.qpdevs.com/ws_v4/stops" \
    // -H "Content-Type: application/json" \
    // -H "Accept: application/json" \
    // -H "Authorization: Basic $encrypted_authentication";








    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}