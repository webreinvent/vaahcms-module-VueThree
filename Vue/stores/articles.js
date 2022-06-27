import {watch} from 'vue'
import {defineStore, acceptHMRUpdate} from 'pinia'
import qs from 'qs'
import {vaah} from '../vaahvue/pinia/vaah'

let base_url = document.getElementsByTagName('base')[0].getAttribute("href");
let ajax_url = base_url + "/backend/vuethree/articles";

let empty_query = {
    page: null,
    filter: {
        q: null,
        is_active: null,
        trashed: null,
        sort: null,
    },
};

let empty_action = {
    items: [],
};

export const useArticlesStore = defineStore({
    id: 'articles',
    state: () => ({
        base_url: base_url,
        ajax_url: ajax_url,
        assets: null,
        list: null,
        item: null,
        fillable:null,
        empty_query:empty_query,
        empty_action:empty_action,
        query: vaah().clone(empty_query),
        action: vaah().clone(empty_action),
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
    getters: {
        updateState(state, payload)
        {
            state[payload.key] = payload.value
        },
        getState(state)
        {
            return state
        },
        watchStates()
        {
            watch(this.query.filter, (newVal,oldVal) =>
                {
                    console.log('--->', newVal);

                    this.query.filter = newVal;

                    this.delayedSearch();
                },
             { deep: true }
            )
        },


    },
    actions: {
        watchRoutes(route)
        {
            watch(route, (newVal,oldVal) =>
                {
                    switch(route.name)
                    {
                        case 'articles.form':
                            this.view = 'small';
                        break;
                        default:
                            this.view = 'large';
                        break
                    }

                },
                { deep: true }
            )

        },
        async getAssets() {
            vaah().ajax(
                this.ajax_url+'/assets',
                this.afterGetAssets
            );
        },
        afterGetAssets(data, res)
        {
            if(data)
            {
                this.assets = data;
                this.item = vaah().clone(data.empty_item);
            }
        },
        async getList() {
            await vaah().ajax(
                this.ajax_url,
                this.afterGetList,
                this.query
            );
        },
        afterGetList: function (data, res)
        {
            if(data)
            {
                console.log('list data--->', data);
                this.list = data;
            }
        },
        async reload()
        {
            await this.getAssets();
            await this.getList();
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
            vaah().ajax(
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
                this.item = vaah().clone(this.assets.empty_item);
                this.getList();
            }
        },
        async paginate() {

        },
        async updateList(){

        },
        confirmDelete()
        {

        },
        async delayedSearch()
        {
            let self = this;
            this.query.page = 1;
            this.action.items = [];

            clearTimeout(this.search.delay_timer);
            this.search.delay_timer = setTimeout(async function() {
                await self.updateUrlQueryString(self.query);
                await self.getList();
            }, this.search.delay_time);


        },
        async updateUrlQueryString(query)
        {
            //remove reactivity from source object
            query = vaah().clone(query)

            //create query string
            let query_string = qs.stringify(query, {
                skipNulls: true
            });
            let query_object = qs.parse(query_string);

            //reset url query string
            await this.$router.replace({query: null});

            //replace url query string
            await this.$router.replace({query: query_object});

            //update applied filters
            if(query_object && query_object.filter)
            {
                this.count_filters = Object.keys(query_object.filter).length;
            } else{
                this.count_filters = 0;
            }
            
        },
        async updateQueryFromUrl(route)
        {
            if(Object.keys(route.query).length > 0)
            {
                for(let key in route.query)
                {
                    this.query[key] = route.query[key]
                }
            }

        },
        async clearSearch()
        {
            this.query.filter.q = null;
            await this.updateUrlQueryString(this.query);
            await this.getList();
        },
        async resetQuery()
        {
            //reset query strings
            await this.resetQueryString();

            //reload page list
            await this.getList();
        },
        async resetQueryString()
        {
            for(let key in this.query.filter)
            {
                this.query.filter[key] = null;
            }

            console.log('--->', this.query.filter);

            await this.updateUrlQueryString(this.query);
        },
        resetNewItem()
        {

        },
        backToView()
        {

        },
        closeForm()
        {
            this.$router.push({name: 'articles.index'})


        },
        setRegisteredBy()
        {

        },
        isViewLarge()
        {

            if(this.view === 'large')
            {
                return true;
            }

            return false;

        },
        setRowClass()
        {

        },
        changeStatus()
        {

        },
        setActiveItem()
        {

        },
        getIdWidth()
        {
            let width = 50;
            if(this.list && this.list.total)
            {
                let chrs = this.list.total.toString();
                chrs = chrs.length;
                console.log('--->', chrs);
                width = chrs*20;
            }

            console.log('--->', width);

            return width;
        },
    }
})

// Pinia hot reload
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useArticlesStore, import.meta.hot))
}
