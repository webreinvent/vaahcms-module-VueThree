<template  >
    <div>
        <h1 v-if="data" class="title">
            {{data.heading}}
        </h1>

        <section>
            <o-button variant="primary" >Click Me</o-button>
            <o-button variant="warning" >Click Me</o-button>
        </section>

    </div>
</template>

<script lang="ts" src="./Dashboard.ts"></script>
