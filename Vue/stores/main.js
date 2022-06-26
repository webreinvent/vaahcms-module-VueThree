import { defineStore } from 'pinia'
import axios from 'axios'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    assets: null,
  }),
  getters: {

  },
  actions: {
      async getAssets() {
        let res  = await axios.get('https://gorest.co.in/public/v2/users');
          this.assets = res.data;
          return res.data;
    }
  }
})
