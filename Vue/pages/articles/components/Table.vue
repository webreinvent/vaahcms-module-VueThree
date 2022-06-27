<script setup>
import { useArticlesStore } from '../../../stores/articles'
const store = useArticlesStore();
</script>

<template>

    <div v-if="store.list">
        {{store.action}}

        <o-table :data="store.list.length ? [] : store.list.data"
                 v-model:checkedRows="store.action.items"
                 checkbox-position="left"
                 :checkable="store.isViewLarge()"
                 :hoverable="true"
                 :row-class="store.setRowClass">

            <template >
                <o-table-column field="id" label="ID"
                                sortable
                                :width="store.getIdWidth()"
                                :visible="store.isViewLarge()"
                                v-slot="props">
                    {{ props.row.id }}
                </o-table-column>

                <o-table-column field="name" label="Name" v-slot="props">
                    {{ props.row.name }}
                </o-table-column>

                <o-table-column field="slug" label="Slug"
                                :visible="store.isViewLarge()"
                                v-slot="props">
                    <o-tooltip label="Copy"
                               variant="dark">
                        {{props.row.slug}}
                    </o-tooltip>
                </o-table-column>


                <o-table-column field="is_active" label="Active"
                                :visible="store.isViewLarge()"
                                v-slot="props">

                    <o-button @click="store.changeStatus(props.row)"
                              :variant="props.row.is_active?'success':'danger'"
                              size="small" >
                        {{ props.row.is_active?'Yes':'No' }}
                    </o-button>

                </o-table-column>


                <o-table-column field="updated_at"
                                label="Updated At"
                                :visible="store.isViewLarge()"
                                width="150"
                                v-slot="props">
                    <o-tooltip :label="props.row.updated_at"
                               variant="dark">
                        <small>
                            {{ props.row.updated_at }}
                        </small>
                    </o-tooltip>
                </o-table-column>


                <o-table-column field="actions" label=""
                                v-slot="props"
                                width="40">

                    <o-tooltip label="View" variant="dark">
                        <o-button size="small"
                                  @click="store.setActiveItem(props.row)"
                                  icon-left="chevron-right">
                        </o-button>
                    </o-tooltip>


                </o-table-column>


            </template>

            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>Nothing here.</p>
                    </div>
                </section>
            </template>

        </o-table>

        <hr style="margin-top: 0;"/>


        <div class="block" v-if="store.list">
            <o-pagination  :total="store.list.total"
                           :current.sync="store.list.current_page"
                           :per-page="store.list.per_page"
                           range-before=3
                           range-after=3
                           @change="store.paginate">
            </o-pagination>
        </div>

    </div>
</template>
