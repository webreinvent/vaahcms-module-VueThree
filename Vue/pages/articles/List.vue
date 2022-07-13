<script setup>
import {onMounted, reactive, ref} from "vue";
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

    <div class="grid">


        <div :class="'col-'+store.list_view_width"  >
            <Panel >

        <template class="p-1" #header>


            <div class="flex flex-row">
                <div class="p-panel-title">
                    Articles

                    <Badge v-if="store.list" :value="store.list.total" ></Badge>
                </div>

            </div>


        </template>

        <template #icons>

            <Button class="p-button-primary" @click="store.toForm()"  >Create</Button>

        </template>


        <div>

            <Actions></Actions>

            <br/>

            <div v-if="store.list">

                <DataTable :value="store.list.data"
                       class="p-datatable-sm"
                       v-model:selection="store.action.items"
                       stripedRows
                       responsiveLayout="scroll">

                    <Column selectionMode="multiple"
                            v-if="store.isViewLarge()"
                            headerStyle="width: 3em">
                    </Column>

                    <Column field="id" header="ID" :style="{width: store.getIdWidth()}" :sortable="true">
                    </Column>

                    <Column field="name" header="Name"
                            :sortable="true">
                    </Column>

                    <Column field="is_active" v-if="store.isViewLarge()"
                            :sortable="true"
                            style="width:100px;"
                            header="Is Active">

                        <template #body="prop">

                            <InputSwitch v-model.bool="prop.data.is_active"
                                         class="p-inputswitch-sm"
                                         v-bind:false-value="0"  v-bind:true-value="1" />
                        </template>

                    </Column>

                    <Column field="actions" style="width:150px;"
                            v-if="store.isViewLarge()"
                            header="Actions">

                        <template #body="prop">

                            <div class="p-inputgroup ">

                                <Button class="p-button-tiny p-button-text"
                                        icon="pi pi-eye"/>

                                <Button class="p-button-tiny p-button-text"
                                        icon="pi pi-pencil"/>

                                <Button class="p-button-tiny p-button-danger p-button-text"
                                        icon="pi pi-trash"/>

                            </div>

                        </template>


                    </Column>


                </DataTable>



            </div>



        </div>
    </Panel>
        </div>

        <RouterView/>

    </div>



</template>
