<script  setup>
import {ref, reactive, watch} from 'vue';
import { useArticlesStore } from '../../../stores/articles'

import Filters from './Filters.vue'

const store = useArticlesStore();

//--------selected_actions
const selected_actions_menu = ref();

const selected_actions_menu_items = ref([
    {
        label: 'Mark as active',
        command: () => {
            /*toast.add({
                severity:'success',
                summary: 'Success Message',
                detail:'Order submitted',
                life: 3000
            });*/
            store.updateList('active')
        }
    },
    {
        label: 'Mark as inactive',
        command: () => {
            store.updateList('inactive')
        }
    },
    {
        separator: true
    },
    {
        label: 'Trash',
        icon: 'pi pi-times',
        command: () => {
            store.updateList('trash')
        }
    },
    {
        label: 'Restore',
        icon: 'pi pi-replay',
        command: () => {
            store.updateList('restore')
        }
    },
    {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
            store.confirmDelete()
            //store.updateList('delete')
        }
    },
    ]);


const toggleSelectedActionsMenu = (event) => {
    selected_actions_menu.value.toggle(event);
};
//--------end of selected_actions


//--------bulk_actions
const bulk_actions_menu = ref();

const bulk_actions_menu_items = ref([
    {
        label: 'Mark all as active',
        command: () => {
            store.bulkUpdateList('activate-all')
        }
    },
    {
        label: 'Mark all as inactive',
        command: () => {
            store.bulkUpdateList('deactivate-all')
        }
    },
    {
        separator: true
    },
    {
        label: 'Trash All',
        icon: 'pi pi-times',
        command: () => {
            store.bulkUpdateList('trash-all')
        }
    },
    {
        label: 'Restore All',
        icon: 'pi pi-replay',
        command: () => {
            store.bulkUpdateList('restore-all')
        }
    },
    {
        label: 'Delete All',
        icon: 'pi pi-trash',
        command: () => {
            store.bulkUpdateList('delete-all')
        }
    },
]);


const toggleBulkActionsMenu = (event) => {
    bulk_actions_menu.value.toggle(event);
};
//--------end of selected_actions


const cities = ref([
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Istanbul', code: 'IST'},
    {name: 'Paris', code: 'PRS'}
]);

const selectedCity1 = ref();

</script>

<template>
    <div>

        <!--actions-->
        <div :class="{'flex justify-content-between': store.isViewLarge()}">


        <!--left-->
        <div v-if="store.view === 'large'">

            <!--selected_actions-->
            <Button
                type="button"
                @click="toggleSelectedActionsMenu"
                aria-haspopup="true"
                aria-controls="overlay_menu">
                <i class="pi pi-angle-down"></i>
                <Badge v-if="store.action.items.length > 0"
                       :value="store.action.items.length"></Badge>
            </Button>
            <Menu ref="selected_actions_menu"
                  :model="selected_actions_menu_items"
                  :popup="true" />
            <!--end of selected_actions-->


            <!--bulk_actions-->
            <Button
                type="button"
                @click="toggleBulkActionsMenu"
                aria-haspopup="true"
                aria-controls="selected_action_menu"
                class="ml-1">
                <i class="pi pi-ellipsis-h"></i>
            </Button>

            <Menu ref="bulk_actions_menu"
                  :model="bulk_actions_menu_items"
                  :popup="true" />

            <!--end of bulk_actions-->



        </div>
        <!--/left-->

        <!--right-->
        <div >


            <div class="grid p-fluid">


                <div class="col-12">
                    <div class="p-inputgroup ">

                        <InputText v-model="store.query.filter.q"
                                   @keyup.enter="store.delayedSearch()"
                                   @keyup.enter.native="store.delayedSearch()"
                                   @keyup.13="store.delayedSearch()"
                                   placeholder="Search"/>

                        <Button @click="store.delayedSearch()" icon="pi pi-search"/>

                        <Button
                            type="button"
                            class="p-button-sm"
                            @click="store.show_filters = true">
                            Filters
                            <Badge v-if="store.count_filters > 0" :value="store.count_filters"></Badge>
                        </Button>



                    </div>
                </div>


                <Filters/>

            </div>

        </div>
        <!--/right-->



    </div>
        <!--/actions-->

    </div>
</template>
