@extends("vaahcms::backend.vaahone.layouts.backend")

@section('vaahcms_extend_backend_css')

    <link href="https://unpkg.com/primevue/resources/themes/bootstrap4-light-blue/theme.css" rel="stylesheet">
    <link href="https://unpkg.com/primevue/resources/primevue.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/primeflex@3.1.2/primeflex.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="https://unpkg.com/primeicons/primeicons.css" rel="stylesheet">

    <style>
        .p-panel-header{
            padding: 5px 8px !important;
        }
    </style>

@endsection


@section('vaahcms_extend_backend_js')

    @if(env('MODULE_VUETHREE_ENV') == 'develop')
        <script type="module" src="http://localhost:9087/Vue/main.js" defer></script>
    @else
        <script type="module" src="{{vh_module_assets_url("VueThree", "build/index.js")}}"></script>
    @endif

@endsection

@section('content')

    <div class="prime">
        <div id="appVueThree">


        </div>
    </div>

@endsection
