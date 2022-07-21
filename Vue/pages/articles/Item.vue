<script setup>
import {onMounted, ref} from "vue";
import { useArticlesStore } from '../../stores/articles'
const store = useArticlesStore();
onMounted(async () => {

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

        <Panel >

            <template class="p-1" #header>


                <div class="flex flex-row">
                    <div class="p-panel-title">
                        Create
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
                asdf
            </div>
        </Panel>

    </div>

</template>
