<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue';
</script>

<template>

    <div class="container-fluid">
        <div class="columns">

            <div class="column is-2">
                <Sidebar/>
            </div>

            <div class="column">
                <RouterView />
            </div>


        </div>



    </div>


</template>
