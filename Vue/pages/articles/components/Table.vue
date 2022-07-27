<script setup>
import { vaah } from '../../../vaahvue/pinia/vaah'
import { useArticlesStore } from '../../../stores/articles'
const store = useArticlesStore();
const useVaah = vaah();

</script>

<template>

    <div v-if="store.list">
        <!--table-->
         <DataTable :value="store.list.data"
                       dataKey="id"
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


                <Column field="updated_at" header="Updated"
                        v-if="store.isViewLarge()"
                        style="width:150px;"
                        :sortable="true">

                    <template #body="prop">
                        {{useVaah.ago(prop.data.updated_at)}}
                    </template>

                </Column>

            <Column field="is_active" v-if="store.isViewLarge()"
                    :sortable="true"
                    style="width:100px;"
                    header="Is Active">

                <template #body="prop">
                    <InputSwitch v-model.bool="prop.data.is_active"
                                 @input="store.changeStatus(prop.data)"
                                 class="p-inputswitch-sm"
                                 v-bind:false-value="0"  v-bind:true-value="1" >
                    </InputSwitch>
                </template>

            </Column>

            <Column field="actions" style="width:150px;"
                    :style="{width: store.getActionWidth() }"
                    :header="store.getActionLabel()">

                <template #body="prop">
                    <div class="p-inputgroup ">

                        <Button class="p-button-tiny p-button-text"
                                @click="store.toView(prop.data)"
                                icon="pi pi-eye">
                        </Button>

                        <Button class="p-button-tiny p-button-text"
                                @click="store.toEdit(prop.data)"
                                icon="pi pi-pencil">
                        </Button>

                        <Button class="p-button-tiny p-button-danger p-button-text"
                                @click="store.confirmDelete(prop.data)"
                                v-if="store.isViewLarge()"
                                icon="pi pi-trash">
                        </Button>

                    </div>

                </template>


            </Column>


        </DataTable>
        <!--/table-->

        <Divider />

        <!--paginator-->
        <Paginator v-model:rows="store.query.rows"
                   :totalRecords="store.list.total"
                   @page="store.paginate($event)"
                   :rowsPerPageOptions="store.rows_per_page">
        </Paginator>
        <!--/paginator-->

    </div>

</template>
