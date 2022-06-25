import {reactive, ref, inject, onMounted} from "vue";

export default {
    setup()
    {
         const vaah = inject('vaah');

        vaah.test();

        onMounted(async () => {
            await vaah.ajax(
                'https://gorest.co.in/public/v2/users',
                {},
                null,
                'get'
            );
        });




        /*
        |--------------------------------------------------------------------------
        | Variables
        |--------------------------------------------------------------------------
        */
        const inputs = {
            is_loading: false,
            heading: 'Dashboard',
        };
        const data = reactive(inputs);


        /*
        |--------------------------------------------------------------------------
        | On Mount
        |--------------------------------------------------------------------------
        */


        /*
        |--------------------------------------------------------------------------
        | Methods
        |--------------------------------------------------------------------------
        */



        return {data};

    }
}
