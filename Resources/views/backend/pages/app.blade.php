@extends("vaahcms::backend.vaahone.layouts.backend")

@section('vaahcms_extend_backend_css')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/element-plus/2.2.9/index.min.css" integrity="sha512-0Q0RMb9iiDwl5bCBsQXKs9SxRbsGtPoNyFJdjeRQ+Io2OVEw/MDTG8KeDrGu8q1e0mK3phISQ3yk5h3VWaBoHA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
@endsection


@section('vaahcms_extend_backend_js')

    @if(env('MODULE_VUETHREE_ENV') == 'develop')
        <script type="module" src="http://localhost:9087/Vue/main.js" defer></script>
    @else
        <script type="module" src="{{vh_module_assets_url("VueThree", "build/index.js")}}"></script>
    @endif

@endsection

@section('content')

    <div class="element-plus">
        <div id="appVueThree">


        </div>

        <div id="element-plus-notifications">

        </div>

    </div>

@endsection
