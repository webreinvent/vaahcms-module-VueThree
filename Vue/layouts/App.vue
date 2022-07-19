<script setup>
import {vaah} from '../vaahvue/pinia/vaah.js'
import { useToast } from "primevue/usetoast";
const toast = useToast();
const useVaah = vaah();
useVaah.setToast(toast);
</script>


<template>
    <div  style="margin: 20px;">
        <Toast class="p-container-toasts" position="top-center" />
        <RouterView />
    </div>
</template>
