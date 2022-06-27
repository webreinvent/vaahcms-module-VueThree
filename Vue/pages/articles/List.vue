<script setup>
import {onMounted} from "vue";
import { useRoute } from 'vue-router';

import { useMainStore } from '../../stores/main'
import { useArticlesStore } from '../../stores/articles'

import Table from './components/Table.vue';
import Actions from './components/Actions.vue';

const mainStore = useMainStore();
const store = useArticlesStore();
const route = useRoute();

onMounted(async () => {
    await store.updateQueryFromUrl(route);
    await store.getAssets();
    await store.getList();
    store.watchRoutes(route);
    store.watchStates;
});


</script>
<template>

    <div class="columns" v-if="store.assets">




        <!--left-->
        <div class="column" :class="{'is-6': store.view !== 'large'}">

            <!--card-->
            <div class="card" >

                <!--header-->
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
                <!--/header-->

                <!--content-->
                <div class="card-content">

                    <div class="block" >
                        <!--actions-->
                        <Actions/>
                        <!--/actions-->

                        <!--list-->
                        <div class="container">
                            <Table/>
                        </div>
                        <!--/list-->

                    </div>
                </div>
                <!--/content-->



            </div>
            <!--/card-->





        </div>
        <!--/left-->


        <router-view></router-view>

    </div>

</template>
