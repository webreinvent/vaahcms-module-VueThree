<script setup>
import {onMounted, ref} from "vue";
import { useRoute } from 'vue-router';



import { useRootStore } from '../../stores/root'
const rootStore = useRootStore();

import { useArticlesStore } from '../../stores/articles'
import Actions from "./components/Actions.vue";
import Table from "./components/Table.vue";


const store = useArticlesStore();
const route = useRoute();

onMounted(async () => {
    await store.watchRoutes(route);
    await store.watchStates;
    await store.getAssets();
    await store.getList();


});



</script>
<template>



<!--    <el-row :gutter="rootStore.gutter">

        <el-col :span="store.list_view_width" >

            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <b>Articles <el-tag round v-if="store.list">{{store.list.total}}</el-tag></b>

                        <el-button class="button" @click="mainStore.to('/articles/form')" >Create</el-button>


                    </div>
                </template>

                &lt;!&ndash;actions&ndash;&gt;
                <Actions/>
                &lt;!&ndash;/actions&ndash;&gt;

                &lt;!&ndash;table&ndash;&gt;
                <Table/>
                &lt;!&ndash;/table&ndash;&gt;

            </el-card>

        </el-col>

        <router-view></router-view>

    </el-row>-->



</template>
