<script setup>
import {onMounted} from "vue";

import { useMainStore } from '../../stores/main'
import { useArticlesStore } from '../../stores/articles'

const mainStore = useMainStore();
const store = useArticlesStore();

onMounted(async () => {
    await store.getAssets();
    await store.getList();
});

</script>
<template>

    <div class="columns" v-if="store.assets">




        <!--left-->
        <div class="column" :class="{'is-6': store.view !== 'large'}">

            <pre>{{store.list}}</pre>

            <!--card-->
            <div class="card" >

                <!--header-->
                <header class="card-header">

                    <div class="card-header-title">
                        Brands
                        <span v-if="store.list"
                              class="tag has-margin-left-5">
                            {{store.list.total}}
                        </span>

                        <!--                        <o-tag v-if="store.list"
                                                       class="has-margin-left-5">
                                                    {{store.list.total}}
                                                </o-tag>-->

                    </div>


                    <div class="card-header-buttons">
                        <div class="field has-addons is-pulled-right">
                            <p   class="control">
                                <o-button type="is-light"
                                          tag="router-link"
                                          :to="{name: 'articles.form'}"
                                          icon-left="plus">
                                    Create
                                </o-button>
                            </p>

                            <p class="control">
                                <o-button type="is-light"
                                          @click="store.getAssets()"
                                          :loading="store.is_list_loading"
                                          icon-left="redo-alt">
                                </o-button>
                            </p>
                        </div>
                    </div>

                </header>
                <!--/header-->

                <!--content-->
                <div class="card-content">

                    <div class="block" >
                        <!--actions-->
                        <div  v-if="store.view === 'large'" class="level">

                            <!--left-->
                            <div class="level-left" >
                                <div  class="level-item">

                                    <o-field>

                                        <div class="control">
                                            <o-dropdown class="is-paddingless"
                                                        aria-role="list">

                                                <template #trigger="{ active }">
                                                    <o-button
                                                        type="is-outlined"
                                                        :icon-right="active ? 'angle-up' : 'angle-down'"
                                                        icon-left="edit">
                                                    </o-button>
                                                </template>

                                                <o-dropdown-item @click="store.updateList('active')"
                                                                 aria-role="listitem">
                                                    Mark as active
                                                </o-dropdown-item>

                                                <o-dropdown-item @click="store.updateList('inactive')"
                                                                 aria-role="listitem">
                                                    Mark as inactive
                                                </o-dropdown-item>
                                                <hr class="dropdown-divider">

                                                <o-dropdown-item @click="store.updateList('trash')"
                                                                 aria-role="listitem">
                                                    <o-icon icon="trash"></o-icon>
                                                    Trash
                                                </o-dropdown-item>

                                                <o-dropdown-item @click="store.confirmDelete()"
                                                                 aria-role="listitem">
                                                    <o-icon type="is-danger is-light"
                                                            icon="trash-alt"></o-icon>
                                                    Delete
                                                </o-dropdown-item>

                                                <o-dropdown-item @click="store.updateList('restore')"
                                                                 aria-role="listitem">
                                                    <o-icon type="is-success is-light"
                                                            icon="trash"></o-icon>
                                                    Restore
                                                </o-dropdown-item>


                                            </o-dropdown>
                                        </div>


                                    </o-field>

                                </div>
                            </div>
                            <!--/left-->


                            <!--right-->
                            <div class="level-right">



                                <div class="level-item">

                                    <o-field>

                                        <o-input placeholder="Search"
                                                 v-model="store.query.q"
                                                 @input="store.delayedSearch"
                                                 @keyup.enter.prevent="store.delayedSearch"
                                                 icon="search"
                                                 icon-right="close-circle"
                                                 icon-right-clickable
                                                 @icon-right-click="store.clearSearch">
                                        </o-input>

                                    </o-field>

                                </div>


                                <div class="level-item">

                                    <o-field grouped>
                                        <o-field>
                                            <div class="control">
                                                <o-dropdown class="is-paddingless"
                                                            position="bottom-left"
                                                            aria-role="list">

                                                    <template #trigger>
                                                        <o-button
                                                            type="is-outlined"
                                                            :label="'Filters ('+store.count_filters+')'"
                                                            icon-left="filter">
                                                        </o-button>
                                                    </template>


                                                    <o-dropdown-item
                                                        aria-role="menu-item"
                                                        :focusable="false"
                                                        custom>

                                                        <div class="columns is-paddingless is-multiline is-marginless filters" style="width: 400px;">

                                                            <div class="column is-6">
                                                                <div class="filter mb-2">
                                                                    <p class="mb-1"><b>Is Active</b></p>

                                                                    <o-field>
                                                                        <o-radio v-model="store.query.filter.is_active"
                                                                                 :native-value="null"
                                                                                 name="is_active">
                                                                            All
                                                                        </o-radio>
                                                                    </o-field>

                                                                    <o-field>
                                                                        <o-radio v-model="store.query.filter.is_active"
                                                                                 native-value="true"
                                                                                 name="is_active">
                                                                            Only Active
                                                                        </o-radio>
                                                                    </o-field>

                                                                    <o-field>
                                                                        <o-radio v-model="store.query.filter.is_active"
                                                                                 native-value="false"
                                                                                 name="is_active">
                                                                            Only Inactive
                                                                        </o-radio>
                                                                    </o-field>

                                                                    <hr/>
                                                                </div>

                                                                <div class="filter mb-2">
                                                                    <p class="mb-1"><b>Include</b></p>

                                                                    <o-field>
                                                                        <o-radio v-model="store.query.filter.trashed"
                                                                                 :native-value="null"
                                                                                 name="trashed">
                                                                            Exclude Trashed
                                                                        </o-radio>

                                                                    </o-field>

                                                                    <o-field>
                                                                        <o-radio v-model="store.query.filter.trashed"
                                                                                 native-value="include"
                                                                                 name="trashed">
                                                                            Include Trashed
                                                                        </o-radio>

                                                                    </o-field>

                                                                    <o-field>
                                                                        <o-radio v-model="store.query.filter.trashed"
                                                                                 native-value="only"
                                                                                 name="trashed">
                                                                            Only Trashed
                                                                        </o-radio>
                                                                    </o-field>
                                                                    <hr/>
                                                                </div>

                                                            </div>
                                                            <div class="column is-6">
                                                                <div class="filter mb-2">
                                                                    <p class="mb-1"><b>Sort By</b></p>

                                                                    <o-field>
                                                                        <o-radio v-model="store.query.sort"
                                                                                 :native-value="null"
                                                                                 name="sort">
                                                                            None
                                                                        </o-radio>
                                                                    </o-field>

                                                                    <o-field>
                                                                        <o-radio v-model="store.query.sort"
                                                                                 native-value="updated_at"
                                                                                 name="sort">
                                                                            Updated (Ascending)
                                                                        </o-radio>
                                                                    </o-field>

                                                                    <o-field>
                                                                        <o-radio v-model="store.query.sort"
                                                                                 native-value="updated_at:desc"
                                                                                 name="sort">
                                                                            Updated (Descending)
                                                                        </o-radio>
                                                                    </o-field>
                                                                    <hr/>
                                                                </div>


                                                                <div class="filter mb-2">
                                                                    <p class="mb-1"><b>Page</b></p>

                                                                    <o-field>
                                                                        <o-field>
                                                                            <o-input
                                                                                native-min="1"
                                                                                v-model="store.query.page">
                                                                            </o-input>
                                                                        </o-field>
                                                                    </o-field>

                                                                    <hr/>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </o-dropdown-item>


                                                </o-dropdown>
                                            </div>


                                            <o-tooltip label="Reset Filters"
                                                       type="is-dark">
                                                <p class="control" >

                                                    <o-button @click="store.resetQuery()"
                                                              icon-left="times">
                                                    </o-button>
                                                </p>
                                            </o-tooltip>

                                        </o-field>



                                    </o-field>

                                </div>

                            </div>
                            <!--/right-->

                        </div>
                        <!--/actions-->




                        <!--search on small view-->
                        <o-field v-else>

                            <o-input placeholder="Search"
                                     v-model="store.query.q"
                                     @input="store.delayedSearch"
                                     @keyup.enter.prevent="store.delayedSearch"
                                     icon="search"
                                     expanded
                                     icon-right="close-circle"
                                     icon-right-clickable
                                     @icon-right-click="store.query.q = ''">
                            </o-input>

                        </o-field>
                        <!--/search on small view-->



                        <!--list-->
                        <div class="container">




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
                        <!--/list-->



                    </div>
                </div>
                <!--/content-->



            </div>
            <!--/card-->





        </div>
        <!--/left-->


        <router-view></router-view>

    </div>

</template>
