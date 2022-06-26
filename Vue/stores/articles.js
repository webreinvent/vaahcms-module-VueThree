import {defineStore} from 'pinia'
import axios from 'axios'
import { vaah } from '../vaahvue/pinia/vaah'


//---------Variables
let base_url = document.getElementsByTagName('base')[0].getAttribute("href");
//---------/Variables

let ajax_url = base_url + "/backend/vuethree/articles";

export const useArticlesStore = defineStore({
    id: 'articles',
    state: () => ({
        base_url: base_url,
        ajax_url: ajax_url,
        vaah: vaah(),
        assets: null,
        list: null,
        item: null,
        fillable:null,
        query: {
            q: null,
            page: null,
            filter: {
                is_active: null,
                trashed: null,
                sort: null,
            },
        },
        action: null,
        search: {
            delay_time: 600, // time delay in milliseconds
            delay_timer: 0 // time delay in milliseconds
        },
        empty: {
            query: null,
            action: null,
        },
        view: 'large',
        form: {
            type: 'Create',
            action: null,
            is_button_loading: null
        },
        show_filters: null,
        is_list_loading: null,
        count_filters: 0,
    }),
    getters: {},
    actions: {
        async getAssets() {
            this.vaah.ajax(
                this.ajax_url+'/assets',
                this.afterGetAssets
            );
        },
        afterGetAssets(data, res)
        {
            if(data)
            {
                this.assets = data;
                this.item = data.empty_item;
            }
        },
        async getList() {
            this.vaah.ajax(
                this.ajax_url,
                this.afterGetList
            );
        },
        afterGetList: function (data, res)
        {
            if(data)
            {
                this.list = data.list;
            }
        },
        async setFormAction(action)
        {
            this.form.action = action;

            switch(action)
            {
                case 'save-and-new':
                    await this.create();
                    break;


            }

        },
        async create() {
            this.vaah.ajax(
                ajax_url,
                this.afterCreate,
                this.item,
                'post'
            );
        },
        afterCreate(data, res)
        {
            if(data)
            {
                this.item = this.assets.empty_item;
            }
        },
        async paginate() {

        },
        async updateList(){

        },
        confirmDelete()
        {

        },
        delayedSearch()
        {

        },
        clearSearch()
        {

        },
        resetQuery()
        {

        },

        resetNewItem()
        {

        },
        backToView()
        {

        },
        closeForm()
        {


        },
        setRegisteredBy()
        {

        },

    }
})
