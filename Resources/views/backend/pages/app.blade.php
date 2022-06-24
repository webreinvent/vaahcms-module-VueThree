@extends("vaahcms::backend.vaahone.layouts.backend")

@section('vaahcms_extend_backend_css')

@endsection


@section('vaahcms_extend_backend_js')

    @if(env('MODULE_VUETHREE_ENV') == 'develop')
        <script type="module" src="http://localhost:9087/Vue/main.ts" defer></script>
    @else
        <script type="module" src="{{vh_module_assets_url("VueThree", "build/index.js")}}"></script>
    @endif

@endsection

@section('content')

    <div id="appVueThree">

    </div>

@endsection
