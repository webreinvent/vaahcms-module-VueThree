import {reactive, ref} from "vue";

export default {
    setup()
    {
        /*
        |--------------------------------------------------------------------------
        | General Variables
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
        | List
        |--------------------------------------------------------------------------
        */


        /*
        |--------------------------------------------------------------------------
        | Item
        |--------------------------------------------------------------------------
        */


        /*
        |--------------------------------------------------------------------------
        | Form
        |--------------------------------------------------------------------------
        */


        return {data};

    }
}
