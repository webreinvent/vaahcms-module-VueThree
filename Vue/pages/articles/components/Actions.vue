<script  setup>
import {ref} from 'vue';
import { useArticlesStore } from '../../../stores/articles'

const store = useArticlesStore();

</script>

<template>
    <div>

        <!--large view - actions-->
        <el-row justify="space-between" v-if="store.isViewLarge()">
            <el-col :span="8" >

                <el-space>

                    <el-dropdown placement="bottom-start">
                        <el-button icon="arrow-down" >

                            <el-tag effect="plain" round v-if="store.action.items.length > 0">
                                {{store.action.items.length}}
                            </el-tag>

                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="store.updateList('active')">Mark as active</el-dropdown-item>
                                <el-dropdown-item @click="store.updateList('inactive')">Mark as inactive</el-dropdown-item>
                                <el-dropdown-item divided
                                                  @click="store.updateList('trash')"
                                                  icon="minus">
                                    Trash
                                </el-dropdown-item>
                                <el-dropdown-item icon="refresh-left"
                                                  @click="store.updateList('restore')">
                                    Restore
                                </el-dropdown-item>
                                <el-dropdown-item icon="delete" @click="store.updateList('delete')">
                                    Delete
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>

                    <el-popconfirm v-if="store.action.items.length>0" title="Are you sure to delete this?">
                        <template #reference>
                            <el-button  icon="delete"></el-button>
                        </template>
                    </el-popconfirm>

                    <el-dropdown placement="bottom-start">
                        <el-button icon="more-filled" >

                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>Mark all as active</el-dropdown-item>
                                <el-dropdown-item>Mark all as inactive</el-dropdown-item>
                                <el-dropdown-item divided icon="minus">Trash All</el-dropdown-item>
                                <el-dropdown-item icon="refresh-left">Restore All</el-dropdown-item>
                                <el-dropdown-item icon="delete">Delete All</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>



                </el-space>


            </el-col>
            <el-col :span="10" style="text-align: right;">

                <el-space>

                    <el-input
                        class="w-50 m-2"
                        v-model="store.query.filter.q"
                        placeholder="Search"
                        prefix-icon="search"
                    />

                    <el-button-group>

                        <el-button icon="filter" @click="store.show_filters = true">
                            Filters  <el-tag effect="plain" style="margin-left: 5px;" round>2</el-tag>
                        </el-button>


                        <el-button icon="close" @click="store.show_filters = true">
                        </el-button>

                    </el-button-group>


                </el-space>

            </el-col>
        </el-row>
        <!--/large view - actions-->

        <!--small view - search-->
        <el-row v-else>
            <el-col>
                <el-input
                    class="w-50 m-2"
                    placeholder="Type something"
                    prefix-icon="search"
                />
            </el-col>
        </el-row>
        <!--/small view - search-->

        <hr style="margin: 10px 0 10px 0;"/>

        <!--filters-->
        <el-drawer
            v-model="store.show_filters"
            title="Filters">

            <el-form label-width="80px">

                <el-form-item label="Is Active" >
                    <el-radio-group  size="small">
                        <el-radio-button label="All" />
                        <el-radio-button label="Only Active" />
                        <el-radio-button label="Only Inactive" />
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="Trashed" >
                    <el-radio-group  size="small">
                        <el-radio-button label="Exclude" />
                        <el-radio-button label="Include" />
                        <el-radio-button label="Only" />
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="Short By" >
                    <el-radio-group  size="small">
                        <el-radio-button label="None" />
                        <el-radio-button label="Ascending" />
                        <el-radio-button label="Descending" />
                    </el-radio-group>
                </el-form-item>

            </el-form>
        </el-drawer>
        <!--/filters-->


    </div>
</template>
