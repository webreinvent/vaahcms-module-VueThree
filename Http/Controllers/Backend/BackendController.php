<?php namespace VaahCms\Modules\VueThree\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class BackendController extends Controller
{


    public function __construct()
    {

    }

    public function index()
    {



        // Use following blade file to use vue app
        return view('vuethree::backend.pages.app');
    }

    public function getAssets(Request $request)
    {
        $data=[];

        $data['module'] = [
            'name' => config('vuethree.name'),
            'version' => config('vuethree.version')
        ];

        $data['timezone'] = env("APP_TIMEZONE");
        $data['server_date_time'] = \Carbon::now();

        $response['success'] = true;
        $response['data'] = $data;

        return response()->json($response);

    }

}
