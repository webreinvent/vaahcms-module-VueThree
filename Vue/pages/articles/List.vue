<script setup>
import {onMounted, reactive, ref} from "vue";
import {useRoute} from 'vue-router';


import {useRootStore} from '../../stores/root'

const rootStore = useRootStore();

import {useArticlesStore} from '../../stores/articles'
import Actions from "./components/Actions.vue";
import Table from "./components/Table.vue";


const store = useArticlesStore();
const route = useRoute();

onMounted(async () => {
    await store.watchRoutes(route);
    await store.watchStates();
    await store.getAssets();
    await store.getList();
});


</script>
<template>

    <div class="grid">

        <div :class="'col-'+store.list_view_width">
            <Panel>

                <template class="p-1" #header>

                    <div class="flex flex-row">
                        <div class="p-panel-title">
                            Articles
                            <Badge v-if="store.list && store.list.total > 0"
                                   :value="store.list.total">
                            </Badge>
                        </div>

                    </div>


                </template>

                <template #icons>

                    <Button class="p-button-primary"
                            @click="store.toForm()">
                        <i class="pi pi-plus mr-1"></i>
                        Create
                    </Button>

                </template>

                <Actions/>

                <br/>

                <Table/>

            </Panel>
        </div>

        <RouterView/>

    </div>


</template>
