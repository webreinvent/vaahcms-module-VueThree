import {onMounted, defineComponent, reactive, onCreated } from "vue";


import { useMainStore } from '../stores/main'

export default {
    setup()
    {
        import Sidebar from '../components/Sidebar.vue';

        const mainStore = useMainStore();

        onCreated(async () => {
            data.main_assets = await mainStore.getAssets();
        });




        console.log('--->', mainStore.assets);

        const data = reactive({
            is_loading: null,
            main_assets: null,
        })



        return {data};
    }

}
