<script setup>
import Sidebar from '../components/Sidebar.vue';
import {onMounted} from "vue";

import { useMainStore } from '../stores/main'
import {reactive} from "vue";

const main = useMainStore();

const data = reactive({
    is_loading: null,
    main_assets: null,
})

onMounted(async () => {
    await main.getAssets();
});


</script>


<template>

    <div class="container-fluid">
        <div class="columns">

            <div class="column is-2">
                <Sidebar/>
            </div>

            <div class="column">

                {{data}}
                {{main.assets}}

                <RouterView />
            </div>


        </div>



    </div>


</template>
