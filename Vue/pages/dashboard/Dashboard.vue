<template  >
    <div>
        <h1 v-if="heading" class="title">
            {{heading}}
        </h1>
    </div>
</template>

<script lang="ts" setup>

import {ref} from "vue";

const heading = ref("Dashboard");

</script>
