<script setup>
import {onMounted, ref, watch} from "vue";
import VhField from './../../vaahvue/vue-three/primeflex/VhField.vue'
import { useArticlesStore } from '../../stores/articles'
import {useRoute} from 'vue-router';


const store = useArticlesStore();
const route = useRoute();

onMounted(async () => {
    if(route.params && route.params.id)
    {
        await store.getItem(route.params.id);

        watch(route, async (newVal,oldVal) =>
            {
                await store.getItem(route.params.id);
            }, { deep: true }
        )
    }
});

//--------actions_menu
const actions_menu = ref();

const actions_menu_items = ref([
    {
        label: 'Save & Close',
        icon: 'pi pi-check',
        command: () => {
            store.form.action = 'save-and-close';
            if(store.item && store.item.id){
                store.store();
            }else{
                store.create();
            }

        }
    },
    {
        label: 'Save & Clone',
        icon: 'pi pi-copy',
        command: () => {
            store.form.action = 'save-and-clone';
            if(store.item && store.item.id){
                store.store();
            }else{
                store.create();
            }
        }
    },
    {
        label: 'Reset',
        icon: 'pi pi-refresh',
        command: () => {
            store.setActiveItem();
        }
    },
    {
        label: 'Fill',
        icon: 'pi pi-pencil',
        command: () => {
            store.getFaker();
        }
    },
]);


const toggleActionsMenu = (event) => {
    actions_menu.value.toggle(event);
};
//--------end of actions_menu

</script>
<template>

    <div class="col-6" >

        <Panel >

            <template class="p-1" #header>


                <div class="flex flex-row">
                    <div class="p-panel-title">
                        <span v-if="store.item && store.item.id">
                            Update
                        </span>
                        <span v-else>
                            Create
                        </span>
                    </div>

                </div>


            </template>

            <template #icons>


                <div class="p-inputgroup">
                    <Button label="Save"
                            v-if="store.item && store.item.id"
                            @click="store.setFormAction('save')"
                            icon="pi pi-save"/>

                    <Button label="Save & New"
                            v-else
                            @click="store.setFormAction('save-and-new')"
                            icon="pi pi-save"/>


                    <!--bulk_actions-->
                    <Button
                        type="button"
                        @click="toggleActionsMenu"
                        aria-haspopup="true"
                        aria-controls="actions_menu">
                        <i class="pi pi-angle-down"></i>
                    </Button>

                    <Menu ref="actions_menu"
                          :model="actions_menu_items"
                          :popup="true" />

                    <!--end of bulk_actions-->


                    <Button class="p-button-primary"
                            icon="pi pi-times"
                            @click="store.toList()">
                    </Button>
                </div>



            </template>


            <div v-if="store.item">

                <VhField label="Name">
                    <InputText class="w-full" v-model="store.item.name">
                    </InputText >
                </VhField>

                <VhField label="Slug">
                    <InputText class="w-full" v-model="store.item.slug">
                    </InputText >
                </VhField>

                <VhField label="Is Active">
                    <InputSwitch v-bind:false-value="0"
                                 v-bind:true-value="1"
                                 v-model="store.item.is_active">
                    </InputSwitch>
                </VhField>

            </div>
        </Panel>

    </div>

</template>
