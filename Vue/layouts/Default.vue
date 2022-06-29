<script setup>
import {onMounted, reactive} from "vue";

import Aside from '../components/Aside.vue';

import { useRootStore } from '../stores/root'
const rootStore = useRootStore();


onMounted(async () => {
    await rootStore.getAssets();
});


</script>


<template>
    <el-container>
        <Aside/>

        <el-container>

            <el-main style="padding-top: 0px;">
                <RouterView />
            </el-main>

        </el-container>



    </el-container>




</template>
