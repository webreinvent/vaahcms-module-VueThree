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
    type: null,
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
        watchStates()
        {
            watch(this.view, (newVal,oldVal) =>
                {
                    console.log('state.view--->', newVal);
                    if(newVal === 'large')
                    {
                        this.list_view_width = 12;
                    } else{

                    }
                    this.list_view_width = 6;
                },
                { deep: true }
            )
        },
        watchRoutes(route)
        {
            //set initial value
            this.route = route;
            this.setViewAndWidth(route.name);
            this.updateQueryFromUrl(route)

            //watch routes
            watch(route, (newVal,oldVal) =>
                {
                    console.log('route--->', newVal);
                    this.route = newVal;
                    this.setViewAndWidth(newVal.name);
                    this.updateQueryFromUrl(newVal)

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
                this.item = vaah().clone(data.empty_item);
            }
        },
        async getList() {
            let options = {
                query: vaah().clone(this.query)
            }

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
        async paginate() {

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
