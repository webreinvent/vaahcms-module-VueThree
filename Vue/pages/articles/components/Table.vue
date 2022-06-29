<script setup>
import { useArticlesStore } from '../../../stores/articles'
const store = useArticlesStore();
</script>

<template>

    <div v-if="store.list">

        <el-table :data="store.list.data" style="width: 100%"
                  @selection-change="store.onItemSelection">
            <el-table-column type="selection" v-if="store.isViewLarge()" width="55" />
            <el-table-column prop="id" label="ID" :width="store.getIdWidth()" />
            <el-table-column label="Name" style="cursor: pointer;">
                <template #default="scope">
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column prop="slug" v-if="store.isViewLarge()" label="Slug" />
            <el-table-column prop="is_active" width="80" v-if="store.isViewLarge()" label="Is Active" >
                <template #default="scope">
                    <el-button type="success" size="small"
                               v-if="scope.row.is_active" plain>
                        Yes
                    </el-button>
                    <el-button type="info" size="small" v-else plain>
                        No
                    </el-button>
                </template>
            </el-table-column>

            <el-table-column width="130" v-if="store.isViewLarge()" label="Action" >

                <el-button-group>
                    <el-tooltip effect="dark" content="View" placement="top">
                        <el-button icon="view" size="small"></el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="Edit" placement="top">
                        <el-button icon="edit" size="small"></el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="Trash" placement="top">
                        <el-button icon="delete" size="small"></el-button>
                    </el-tooltip>
                </el-button-group>

            </el-table-column>


        </el-table>

        <hr/>

        <el-pagination background layout="prev, pager, next" :total="store.list.total" />

    </div>

</template>
