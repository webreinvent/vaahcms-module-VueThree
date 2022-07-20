<script setup>
import {vaah} from '../vaahvue/pinia/vaah.js'
import {useRootStore} from '../stores/root.js'

import { useToast } from "primevue/usetoast";
const toast = useToast();
const useVaah = vaah();
const root = useRootStore();

useVaah.setToast(toast);
</script>


<template>
    <div  style="margin: 20px;">
        <ProgressBar style="z-index: 10000000; position: fixed; top: 1px; width: 100%; left: 0px; height: 2px;"
                     v-if="useVaah.show_progress_bar"
                     mode="indeterminate"/>
        <Toast class="p-container-toasts" position="top-center" />
        <RouterView />
    </div>
</template>
