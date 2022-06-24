<template  >
    <div>
        <h1 v-if="heading" class="title">
            {{heading}}
        </h1>

        <section>
            <o-button variant="primary" >Click Me</o-button>
            <o-button variant="warning" >Click Me</o-button>
        </section>

    </div>
</template>

<script lang="ts" setup>

import {ref} from "vue";

const heading = ref("Dashboard");

</script>
