
<template>
    <div  style="margin: 20px;">

        <div class="container-toasts">
            <Toast />
            <Toast position="top-left" group="tl" />
            <Toast position="top-right" group="tr" />
            <Toast position="bottom-left" group="bl" />
            <Toast position="bottom-right" group="br" />
        </div>


        <RouterView />
    </div>
</template>
