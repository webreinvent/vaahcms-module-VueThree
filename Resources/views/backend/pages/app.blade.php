@extends("vaahcms::backend.vaahone.layouts.backend")

@section('vaahcms_extend_backend_css')


    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!--primevue-->
    <link href="https://unpkg.com/primevue/resources/themes/bootstrap4-light-blue/theme.css" rel="stylesheet">
    <link href="https://unpkg.com/primevue/resources/primevue.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/primeflex@3.1.2/primeflex.css">
    <link href="https://unpkg.com/primeicons/primeicons.css" rel="stylesheet">

    <style>
        .p-panel-header{
            padding: 0.5rem 0.8rem !important;
        }

        .p-inputswitch-sm{
            height: 1.2rem !important;
        }

        .p-inputswitch-sm .p-inputswitch-slider:before{
            height: 1rem !important;
            margin-top: -0.51rem !important;
        }

        .p-button-tiny{
            padding: 0.1rem 0.7rem !important;
        }
        .p-button-tiny .pi{
            font-size: 0.95rem  !important;
        }
        .primevue table td, .primevue table th{

            vertical-align: middle !important;

        }

        .p-datatable .p-inputswitch{
            display: block !important;
        }

        .p-datatable .p-datatable-tbody > tr.p-highlight{
            background: var(--blue-50) !important;
            color: var(--text-color) !important;
        }

        .p-highlight .p-checkbox .p-checkbox-box{
            border-color: var(--blue-600) !important;
        }

    </style>
    <!--/primevue-->

@endsection


@section('vaahcms_extend_backend_js')

    @if(env('MODULE_VUETHREE_ENV') == 'develop')
        <script type="module" src="http://localhost:9087/Vue/main.js" defer></script>
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
