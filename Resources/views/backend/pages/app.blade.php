@if(version_compare(config('vaahcms.version'), '2.0.0', '<' )))
@extends("vaahcms::backend.vaahone.layouts.backend")
@else
@extends("vaahcms::backend.vaahtwo.layouts.backend")
@endif

@section('vaahcms_extend_backend_css')

@endsection


@section('vaahcms_extend_backend_js')

    @if(env('MODULE_VUETHREE_ENV') == 'develop')
        <script type="module" src="http://localhost:9087/Vue/main.js"></script>
    @else
        <script type="module" src="{{vh_module_assets_url("VueThree", "build/index.js")}}"></script>
    @endif

@endsection

@section('content')

    <div class="primevue">
        <div id="appVueThree">


        </div>
    </div>

@endsection
