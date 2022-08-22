<?php namespace VaahCms\Modules\VueThree\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use VaahCms\Modules\VueThree\Models\Article;


class ArticlesController extends Controller
{


    //----------------------------------------------------------
    public function __construct()
    {

    }

    //----------------------------------------------------------

    public function getAssets(Request $request)
    {

        $data = [];

        $data['permission'] = [];
        $data['rows'] = config('vaahcms.per_page');

        $data['fillable']['except'] = [
            'uuid',
            'created_by',
            'updated_by',
            'deleted_by',
        ];

        $model = new Article();
        $fillable = $model->getFillable();
        $data['fillable']['columns'] = array_diff(
            $fillable, $data['fillable']['except']
        );

        foreach ($fillable as $column)
        {
            $data['empty_item'][$column] = null;
        }

        $data['actions'] = [];

        $response['success'] = true;
        $response['data'] = $data;

        return $response;
    }

    //----------------------------------------------------------
    public function getList(Request $request)
    {
        return Article::getList($request);
    }
    //----------------------------------------------------------
    public function updateList(Request $request)
    {
        return Article::updateList($request);
    }
    //----------------------------------------------------------
    public function deleteList(Request $request)
    {
        return Article::deleteList($request);
    }
    //----------------------------------------------------------
    public function createItem(Request $request)
    {
        return Article::createItem($request);
    }
    //----------------------------------------------------------
    public function getItem(Request $request, $id)
    {
        return Article::getItem($id);
    }
    //----------------------------------------------------------
    public function updateItem(Request $request,$id)
    {
        return Article::updateItem($request,$id);
    }
    //----------------------------------------------------------
    public function deleteItem(Request $request,$id)
    {
        return Article::deleteItem($request,$id);
    }
    //----------------------------------------------------------
    //----------------------------------------------------------


}
