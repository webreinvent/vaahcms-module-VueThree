<script setup>
import {onMounted, ref} from "vue";

import { useRootStore } from '../../stores/root'
const rootStore = useRootStore();

import { useArticlesStore } from '../../stores/articles'
const store = useArticlesStore();

onMounted(async () => {

});



</script>
<template>

    <el-col :span="12" v-if="store.item">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>Create</span>



                    <div>


                        <el-button-group class="ml-4">
                            <el-button  icon="plus" >Save & New</el-button>
                            <el-button  @click="rootStore.to('/articles')" icon="close" />
                        </el-button-group>

                        <el-dropdown placement="bottom-end"  style="margin-left: 15px">
                            <el-button  icon="more-filled" />
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item icon="check">Save & Close</el-dropdown-item>
                                    <el-dropdown-item icon="copy-document">Save & Clone</el-dropdown-item>
                                    <el-dropdown-item icon="refresh">Reset</el-dropdown-item>
                                    <el-dropdown-item icon="pointer">Fill</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>


                    </div>

                </div>
            </template>

            <el-form label-width="120px">
                <el-form-item label="Name">
                    <el-input v-model="store.item.name" />
                </el-form-item>

                <el-form-item label="Slug">
                    <el-input v-model="store.item.slug" />
                </el-form-item>

                <el-form-item label="Is Active">
                    <el-switch style="--el-switch-on-color: #13ce66;" v-model="store.item.is_active">
                    </el-switch>
                </el-form-item>

            </el-form>


        </el-card>
    </el-col>

<!--    <div class="column" v-if="store.item" >

        <div class="card">

            &lt;!&ndash;header&ndash;&gt;
            <header class="card-header">

                <div class="card-header-title">
                    {{store.form.type}}
                </div>


                <div class="card-header-buttons">

                    <div class="field has-addons is-pulled-right">
                        <p v-if="store.item && store.item.id" class="control">
                            <o-button @click="$vaah.copy(store.item.id)"  variant="light">
                                <small><b>#{{store.item.id}}</b></small>
                            </o-button>
                        </p>
                        <p class="control">
                            <o-button v-if="store.form.type ==='Update'"
                                      icon-left="edit"
                                      :loading="store.form.is_button_loading"
                                      @click="store.setFormAction('save')">
                                Save
                            </o-button>

                            <o-button v-else
                                      icon-left="edit"
                                      :loading="store.form.is_button_loading"
                                      @click="store.setFormAction('save-and-new')">
                                Save & New
                            </o-button>
                        </p>

                        <p class="control">


                            <o-dropdown aria-role="list" position="bottom-left">
                                <o-button variant="light" icon-left="caret-down"></o-button>


                                <o-dropdown-item v-if="store.form.type === 'Create'"
                                                 @click="store.setFormAction('save-and-close')">
                                    <o-icon icon="check"></o-icon>
                                    Save & Close
                                </o-dropdown-item>

                                <o-dropdown-item v-if="store.form.type === 'Create'"
                                                 @click="store.setFormAction('save-and-clone')">
                                    <o-icon icon="copy"></o-icon>
                                    Save & Clone
                                </o-dropdown-item>

                                <o-dropdown-item v-if="store.form.type === 'Create'"
                                                 @click="store.resetNewItem()">
                                    <o-icon icon="eraser"></o-icon>
                                    Reset
                                </o-dropdown-item>

                                <o-dropdown-item >
                                    <o-icon icon="i-cursor"></o-icon>
                                    Fill Dummy Data
                                </o-dropdown-item>

                            </o-dropdown>


                        </p>


                        <p class="control" v-if="store.item && store.item.id">
                            <o-button @click="store.backToView()"
                                      icon-left="arrow-left">
                            </o-button>
                        </p>


                        <p class="control">
                            <o-button @click="store.closeForm()"
                                      icon-left="times">
                            </o-button>
                        </p>



                    </div>


                </div>

            </header>
            &lt;!&ndash;/header&ndash;&gt;

            &lt;!&ndash;content&ndash;&gt;
            <div class="card-content">

                <o-field label="Name" >
                    <o-input name="brands-name"
                             data-wdio="brands-name"
                             v-model="store.item.name"></o-input>
                </o-field>

                <o-field label="Slug" >
                    <o-input name="brands-slug"
                             data-wdio="brands-slug"
                             v-model="store.item.slug">
                    </o-input>
                </o-field>

                <o-field >
                    <o-switch variant="success"
                              :true-value="1"
                              v-model="store.item.is_active">Is Active</o-switch>
                </o-field>


            </div>
            &lt;!&ndash;/content&ndash;&gt;





        </div>




    </div>-->
</template>
