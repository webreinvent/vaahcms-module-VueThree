<script setup>
import {onMounted, ref, watch} from "vue";
import {useRoute} from 'vue-router';

import { useArticlesStore } from '../../stores/articles'
import VhViewRow from '../../vaahvue/vue-three/primeflex/VhViewRow.vue';
const store = useArticlesStore();
const route = useRoute();

onMounted(async () => {

    if(route.params && !route.params.id)
    {
        store.toList();

        return false;
    }

    await store.getItem(route.params.id);

    watch(route, async (newVal,oldVal) =>
        {
            if(newVal.params && !newVal.params.id
                && newVal.name === 'articles.view')
            {
                store.toList();
            }

            await store.getItem(route.params.id);


        }, { deep: true }
    )

});

//--------actions_menu
const actions_menu = ref();

const actions_menu_items = ref([
    {
        label: 'Save & Close',
        icon: 'pi pi-check',
        command: () => {

        }
    },
    {
        label: 'Save & Clone',
        icon: 'pi pi-copy',
        command: () => {

        }
    },
    {
        label: 'Reset',
        icon: 'pi pi-refresh',
        command: () => {

        }
    },
    {
        label: 'Fill',
        icon: 'pi pi-pencil',
        command: () => {

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

        <Panel v-if="store && store.item">

            <template class="p-1" #header>

                <div class="flex flex-row">

                    <div class="p-panel-title">
                        #{{store.item.id}}
                    </div>

                </div>

            </template>

            <template #icons>


                <div class="p-inputgroup">
                    <Button label="Edit"
                            @click="store.toEdit(store.item)"
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

                <div class="p-datatable p-component p-datatable-responsive-scroll p-datatable-striped p-datatable-sm">
                <table class="p-datatable-table">
                    <tbody class="p-datatable-tbody">
                    <template v-for="(value, column) in store.item ">

                        <template v-if="column === 'created_by' || column === 'updated_by'">
                        </template>

                        <template v-else-if="column === 'id' || column === 'uuid'">
                            <VhViewRow :label="column"
                                       :value="value"
                                       :can_copy="true"
                            />
                        </template>

                        <template v-else-if="(column === 'created_by_user' || column === 'updated_by_user'  || column === 'deleted_by_user') && (typeof value === 'object' && value !== null)">
                            <VhViewRow :label="column"
                                       :value="value"
                                       type="user"
                            />
                        </template>

                        <template v-else-if="column === 'is_active'">
                            <VhViewRow :label="column"
                                       :value="value"
                                       type="yes-no"
                            />
                        </template>

                        <template v-else>
                            <VhViewRow :label="column"
                                       :value="value"
                                       />
                        </template>


                    </template>
                    </tbody>

                </table>

                </div>
            </div>
        </Panel>

    </div>

</template>
