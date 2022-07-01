@extends("vaahcms::backend.vaahone.layouts.backend")

@section('vaahcms_extend_backend_css')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" integrity="sha512-wnea99uKIC3TJF7v4eKk4Y+lMz2Mklv18+r4na2Gn1abDRPPOeef95xTzdwGD9e6zXJBteMIhZ1+68QC5byJZw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
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
