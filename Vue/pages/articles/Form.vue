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

    <div class="col-6">

        <Panel >

            <template class="p-1" #header>


                <div class="flex flex-row">
                    <div class="p-panel-title">
                        Create
                    </div>

                </div>


            </template>

            <template #icons>

                <Button class="p-button-primary"
                        icon="pi pi-times"
                        @click="store.closeForm()">
                </Button>

            </template>


            <div>


                <div class="field">
                    <label for="username1">Username</label>
                    <InputText  id="username1" ></InputText >
                </div>




            </div>
        </Panel>

    </div>

</template>
