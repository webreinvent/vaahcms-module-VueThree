<script setup>
import {onMounted} from "vue";

import { useMainStore } from '../../stores/main'
import { useArticlesStore } from '../../stores/articles'

const mainStore = useMainStore();
const store = useArticlesStore();

onMounted(async () => {

});

</script>
<template>
    <div class="column" v-if="store.item" >

        <div class="card">

            <!--header-->
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
                                      variant="light"
                                      :loading="store.form.is_button_loading"
                                      @click="store.setFormAction('save')">
                                Save
                            </o-button>

                            <o-button v-else
                                      icon-left="edit"
                                      variant="light"
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
                            <o-button variant="light"
                                      @click="store.backToView()"
                                      icon-left="arrow-left">
                            </o-button>
                        </p>


                        <p class="control">
                            <o-button variant="light"
                                      @click="store.closeForm()"
                                      icon-left="times">
                            </o-button>
                        </p>



                    </div>


                </div>

            </header>
            <!--/header-->

            <!--content-->
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
            <!--/content-->





        </div>




    </div>
</template>
