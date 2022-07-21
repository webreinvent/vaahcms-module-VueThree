import {watch, ref} from 'vue'
import {defineStore, storeToRefs, acceptHMRUpdate} from 'pinia'
import qs from 'qs'
import {vaah} from '../vaahvue/pinia/vaah'


let base_url = document.getElementsByTagName('base')[0].getAttribute("href");
let ajax_url = base_url + "/backend/vuethree/articles";

let empty_states = {
    query: {
        page: null,
        rows: null,
        filter: {
            q: null,
            is_active: null,
            trashed: null,
            sort: null,
        },
    },
    action: {
        type: null,
        items: [],
    }
}

export const useArticlesStore = defineStore({
    id: 'articles',
    state: () => ({
        base_url: base_url,
        ajax_url: ajax_url,
        app: null,
        assets: null,
        rows_per_page: [10,20,30,50,100,500],
        list: null,
        item: null,
        fillable:null,
        empty_query:empty_states.query,
        empty_action:empty_states.action,
        query: vaah().clone(empty_states.query),
        action: vaah().clone(empty_states.action),
        search: {
            delay_time: 600, // time delay in milliseconds
            delay_timer: 0 // time delay in milliseconds
        },
        route: null,
        view: 'large',
        show_filters: false,
        list_view_width: 12,
        form: {
            type: 'Create',
            action: null,
            is_button_loading: null
        },
        is_list_loading: null,
        count_filters: 0,
    }),
    getters: {

    },
    actions: {
        async onLoad(route)
        {
            //set initial value
            this.route = route;
            this.setViewAndWidth(route.name);
            this.updateQueryFromUrl(route);
        },
        watchStates()
        {
            watch(this.query.filter, (newVal,oldVal) =>
                {
                    this.delayedSearch();
                },{deep: true}
            )
        },
        watchRoutes(route)
        {
            //watch routes
            watch(route, (newVal,oldVal) =>
                {
                    console.log('route--->', newVal);
                    this.route = newVal;
                    this.setViewAndWidth(newVal.name);
                }, { deep: true }
            )

        },
        setViewAndWidth(route_name)
        {
            switch(route_name)
            {
                case 'articles.form':
                    this.view = 'small';
                    this.list_view_width = 6;
                    break;
                default:
                    this.view = 'large';
                    this.list_view_width = 12;
                    break
            }
        },
        async getAssets() {
            vaah().ajax(
                this.ajax_url+'/assets',
                this.afterGetAssets,
            );
        },
        afterGetAssets(data, res)
        {
            if(data)
            {
                this.assets = data;
                if(data.rows)
                {
                    this.query.rows = data.rows;
                }
                this.item = vaah().clone(data.empty_item);
            }
        },
        async paginate(event) {
            this.query.page = event.page+1;
            this.getList();
        },
        async getList() {
            let options = {
                query: vaah().clone(this.query)
            }

            console.log('options--->', options);

            await vaah().ajax(
                this.ajax_url,
                this.afterGetList,
                options
            );
        },
        afterGetList: function (data, res)
        {
            if(data)
            {
                //console.log('list data--->', data);
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

            let options = {
                params: this.item,
                method: 'post',
            };

            vaah().ajax(
                ajax_url,
                this.afterCreate,
                options
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

        onItemSelection(items)
        {
            this.action.items = items;
        },
        async updateList(type){
            if(!type)
            {
                vaah().toastErrors(['Select an action type']);
                return false;
            }
            this.action.type = type;
            if(this.action.items.length < 1)
            {
                vaah().toastErrors(['Select records']);
                return false;
            }

            let options = {
                params: this.action,
                method: 'put',
                show_success: false
            };
            vaah().ajax(
                this.ajax_url,
                this.updateListAfter,
                options
            );
        },
        async bulkUpdateList(type){

            if(!type)
            {
                vaah().toastErrors(['Select an action type']);
                return false;
            }
            this.action.type = type;

            let options = {
                params: this.action,
                method: 'put',
                show_success: false
            };

            vaah().ajax(
                this.ajax_url,
                this.updateListAfter,
                options
            );

        },
        async updateListAfter(data, res) {
            if(data)
            {
                this.action = vaah().clone(this.empty_action);
                await this.getList();
            }
        },
        confirmDelete()
        {

            if(this.action.items.length < 1)
            {
                vaah().toastErrors(['Select a record']);
                return false;
            }

            let self = this;
            this.$buefy.dialog.confirm({
                title: 'Deleting record',
                message: 'Are you sure you want to <b>delete</b> the records? This action cannot be undone.',
                confirmText: 'Delete',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: function () {
                    self.deleteList('delete');
                }
            })

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
                skipNulls: true,
            });
            let query_object = qs.parse(query_string);

            let filter = vaah().cleanObject(query_object.filter);
            query_object.filter = filter;

            console.log('query_object--->', query_object.filter);


            //reset url query string
            await this.$router.replace({query: null});

            //replace url query string
            await this.$router.replace({query: query_object});

            //update applied filters
            this.countFilters();

        },
        countFilters: function (url_query=null)
        {
            if(!url_query)
            {
                console.log('this.$route.query--->', this.$route.query);
                url_query = this.$route.query;
            }

            this.count_filters = 0;

            if(url_query.filter)
            {
                this.count_filters = Object.keys(url_query.filter).length;
            }

        },
        async updateQueryFromUrl(route)
        {
            if(route.query)
            {
                if(Object.keys(route.query).length > 0)
                {
                    for(let key in route.query)
                    {
                        this.query[key] = route.query[key]
                    }
                    this.countFilters();
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
        toForm()
        {
            this.$router.push({name: 'articles.form'})


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
                width = chrs*40;
            }

            return width+'px';
        },
    }
})



// Pinia hot reload
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useArticlesStore, import.meta.hot))
}
