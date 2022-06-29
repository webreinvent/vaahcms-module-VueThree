<script setup>
import {onMounted, ref} from "vue";
import { useRoute } from 'vue-router';

import { ElNotification } from 'element-plus'

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



    <el-row :gutter="rootStore.gutter">

        <el-col :span="store.list_view_width" >

            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <b>Articles <el-tag round v-if="store.list">{{store.list.total}}</el-tag></b>

                        <el-button class="button" @click="mainStore.to('/articles/form')" >Create</el-button>


                    </div>
                </template>

                <!--actions-->
                <Actions/>
                <!--/actions-->

                <!--table-->
                <Table/>
                <!--/table-->

            </el-card>

        </el-col>

        <router-view></router-view>

    </el-row>


<!--    <div class="columns" v-if="store.assets">




        &lt;!&ndash;left&ndash;&gt;
        <div class="column" :class="{'is-6': store.view !== 'large'}">

            &lt;!&ndash;card&ndash;&gt;
            <div class="card" >

                &lt;!&ndash;header&ndash;&gt;
                <header class="card-header">

                    <div class="card-header-title">
                        Articles
                        <span v-if="store.list"
                              class="tag has-margin-left-5">
                            {{store.list.total}}
                        </span>
                    </div>


                    <div class="card-header-buttons">
                        <div class="field has-addons is-pulled-right">
                            <p   class="control">
                                <o-button tag="router-link"
                                          :to="{name: 'articles.form'}"
                                          icon-left="plus">
                                    Create
                                </o-button>
                            </p>

                            <p class="control">
                                <o-button @click="store.reload()"
                                          :loading="true"
                                          icon-left="redo-alt">
                                </o-button>
                            </p>
                        </div>
                    </div>

                </header>
                &lt;!&ndash;/header&ndash;&gt;

                &lt;!&ndash;content&ndash;&gt;
                <div class="card-content">

                    <div class="block" >
                        &lt;!&ndash;actions&ndash;&gt;
                        <Actions/>
                        &lt;!&ndash;/actions&ndash;&gt;

                        &lt;!&ndash;list&ndash;&gt;
                        <div class="container">
                            <Table/>
                        </div>
                        &lt;!&ndash;/list&ndash;&gt;

                    </div>
                </div>
                &lt;!&ndash;/content&ndash;&gt;



            </div>
            &lt;!&ndash;/card&ndash;&gt;





        </div>
        &lt;!&ndash;/left&ndash;&gt;


        <router-view></router-view>

    </div>-->

</template>
