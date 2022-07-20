<script setup>
import { useArticlesStore } from '../../../stores/articles'
const store = useArticlesStore();
</script>

<template>

    <div v-if="store.list">
        <!--table-->
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
