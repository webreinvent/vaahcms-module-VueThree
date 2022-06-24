<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink to="/about">About</RouterLink>
    </nav>

    <RouterView />

</template>
