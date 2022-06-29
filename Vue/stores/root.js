import {defineStore, acceptHMRUpdate} from 'pinia'
import axios from 'axios'


export const useRootStore = defineStore({
    id: 'root',
    state: () => ({
        assets: null,
        gutter: 20,
    }),
    getters: {},
    actions: {
        async getAssets() {
            /*let res  = await axios.get('https://gorest.co.in/public/v2/users');
              this.assets = res.data;
              return res.data;*/
        },
        async to(path)
        {
            this.$router.push({path: path})
        }

    }
})


// Pinia hot reload
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useRootStore, import.meta.hot))
}
