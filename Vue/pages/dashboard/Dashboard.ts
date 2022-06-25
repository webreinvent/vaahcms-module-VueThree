import {reactive, ref, inject, onMounted} from "vue";
//import useVaah from '@/vaahvue/vue-three/useVaah';

export default {
    setup()
    {
        /*const {vaah} = useVaah();


        onMounted(async () => {
            await vaah.ajax(
                'https://gorest.co.in/public/v2/users',
                {},
                null,
                'get'
            );
        });*/


        const vaah = inject('vaah');


        vaah.test();

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
