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


const menu = ref();
const items = ref([
    {
        label: 'Options',
        items: [{
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
                toast.add({severity:'success', summary:'Updated', detail:'Data Updated', life: 3000});
            }
        },
            {
                label: 'Delete',
                icon: 'pi pi-times',
                command: () => {
                    toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000});
                }
            }
        ]},
    {
        label: 'Navigate',
        items: [{
            label: 'Vue Website',
            icon: 'pi pi-external-link',
            url: 'https://vuejs.org/'
        },
            {
                label: 'Router',
                icon: 'pi pi-upload',
                command: () => {
                    window.location.hash = "/fileupload"
                }
            }
        ]}
]);

const toggle = (event) => {
    menu.value.toggle(event);
};

const productService = reactive(
    [
        {"id": "1000","code": "f230fh0g3","name": "Bamboo Watch","description": "Product Description","image": "bamboo-watch.jpg","price": 65,"category": "Accessories","quantity": 24,"inventoryStatus": "INSTOCK","rating": 5},
        {"id": "1001","code": "nvklal433","name": "Black Watch","description": "Product Description","image": "black-watch.jpg","price": 72,"category": "Accessories","quantity": 61,"inventoryStatus": "INSTOCK","rating": 4},
        {"id": "1002","code": "zz21cz3c1","name": "Blue Band","description": "Product Description","image": "blue-band.jpg","price": 79,"category": "Fitness","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 3},
        {"id": "1003","code": "244wgerg2","name": "Blue T-Shirt","description": "Product Description","image": "blue-t-shirt.jpg","price": 29,"category": "Clothing","quantity": 25,"inventoryStatus": "INSTOCK","rating": 5},
        {"id": "1004","code": "h456wer53","name": "Bracelet","description": "Product Description","image": "bracelet.jpg","price": 15,"category": "Accessories","quantity": 73,"inventoryStatus": "INSTOCK","rating": 4},
        {"id": "1005","code": "av2231fwg","name": "Brown Purse","description": "Product Description","image": "brown-purse.jpg","price": 120,"category": "Accessories","quantity": 0,"inventoryStatus": "OUTOFSTOCK","rating": 4},
        {"id": "1006","code": "bib36pfvm","name": "Chakra Bracelet","description": "Product Description","image": "chakra-bracelet.jpg","price": 32,"category": "Accessories","quantity": 5,"inventoryStatus": "LOWSTOCK","rating": 3},
        {"id": "1007","code": "mbvjkgip5","name": "Galaxy Earrings","description": "Product Description","image": "galaxy-earrings.jpg","price": 34,"category": "Accessories","quantity": 23,"inventoryStatus": "INSTOCK","rating": 5},
        {"id": "1008","code": "vbb124btr","name": "Game Controller","description": "Product Description","image": "game-controller.jpg","price": 99,"category": "Electronics","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 4},
        {"id": "1009","code": "cm230f032","name": "Gaming Set","description": "Product Description","image": "gaming-set.jpg","price": 299,"category": "Electronics","quantity": 63,"inventoryStatus": "INSTOCK","rating": 3}
    ]
);


const selectedProducts3 = ref();

</script>
<template>

    <Panel >

        <template class="p-1" #header>


            <div class="flex flex-row">
                <div class="p-panel-title">
                    Articles (2)
                </div>

            </div>


        </template>

        <template #icons>

            <Button >Create</Button>

        </template>


        <div>

            <div class="flex justify-content-between">


                <!--left-->
                <div>

                    <Button
                        type="button"
                        @click="toggle"
                        icon="pi pi-angle-down"
                        aria-haspopup="true"
                        aria-controls="overlay_menu"
                    />

                    <Button
                        type="button"
                        @click="toggle"
                        icon="pi pi-ellipsis-h"
                        aria-haspopup="true"
                        aria-controls="overlay_menu"
                        class="ml-1"
                    />
                    <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />




                </div>
                <!--/left-->

                <!--right-->
                <div class="">

                    <Button
                        type="button"
                        @click="toggle"
                        icon="pi pi-ellipsis-h"
                        aria-haspopup="true"
                        aria-controls="overlay_menu"
                        class="ml-1"
                    />

                </div>
                <!--/right-->



            </div>





            <br/>
            <br/>


            <DataTable :value="productService"
                       class="p-datatable-sm"
                       v-model:selection="selectedProducts3"
                       stripedRows
                       responsiveLayout="scroll">
                <Column selectionMode="multiple" headerStyle="width: 3em"></Column>

                <Column field="code" header="Code" :sortable="true"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="quantity" header="Quantity"></Column>
            </DataTable>



        </div>
    </Panel>





</template>
