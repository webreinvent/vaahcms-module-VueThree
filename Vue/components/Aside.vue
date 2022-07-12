<script setup>
import {reactive, ref} from 'vue';

import Menu from 'primevue/menu';

const inputs = {
}
const data = reactive(inputs);
const height = ref(window.innerHeight)

const menu = ref();

const items = ref([
    {
        label: 'VueThree',
        items: [
            {
            label: 'Dashboard',
            icon: 'fa-solid fa-plus',
            to: "/"
            },
            {
                label: 'Articles',
                icon: 'fa-solid fa-blog',
                to: "/articles"
            },
        ]
    },
]);

</script>
<template>

    <div v-if="height">
        <Menu :model="items" />
    </div>

</template>


