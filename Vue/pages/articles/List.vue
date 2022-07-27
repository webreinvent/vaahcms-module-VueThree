<script setup>
import {onMounted, reactive, ref} from "vue";
import {useRoute} from 'vue-router';

import {useArticlesStore} from '../../stores/articles'
import Actions from "./components/Actions.vue";
import Table from "./components/Table.vue";

const store = useArticlesStore();
const route = useRoute();

import { useConfirm } from "primevue/useconfirm";
const confirm = useConfirm();


onMounted(async () => {
    await store.onLoad(route);
    await store.watchRoutes(route);
    await store.setConfirmDialog(confirm);
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
                        <div >
                            <b class="mr-1">Articles</b>
                            <Badge v-if="store.list && store.list.total > 0"
                                   :value="store.list.total">
                            </Badge>
                        </div>

                    </div>

                </template>

                <template #icons>

                    <Button @click="store.toForm()">
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
