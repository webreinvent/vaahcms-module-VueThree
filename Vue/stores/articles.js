import {watch} from 'vue'
import {acceptHMRUpdate, defineStore} from 'pinia'
import qs from 'qs'
import {vaah} from '../vaahvue/pinia/vaah'

let model_namespace = 'VaahCms\\Modules\\VueThree\\Models\\Article';


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
};

export const useArticlesStore = defineStore({
    id: 'articles',
    state: () => ({
        base_url: base_url,
        ajax_url: ajax_url,
        model: model_namespace,
        assets_is_fetching: true,
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
        item_menu_list: [],
        item_menu_state: null,
        form_menu_list: []
    }),
    getters: {

    },
    actions: {
        //---------------------------------------------------------------------
        async onLoad(route)
        {
            /**
             * Set initial routes
             */
            this.route = route;

            /**
             * Update with view and list css column number
             */
            this.setViewAndWidth(route.name);

            /**
             * Update query state with the query parameters of url
             */
            this.updateQueryFromUrl(route);
        },
        //---------------------------------------------------------------------
        setViewAndWidth(route_name)
        {
            switch(route_name)
            {
                case 'articles.index':
                    this.view = 'large';
                    this.list_view_width = 12;
                    break;
                default:
                    this.view = 'small';
                    this.list_view_width = 6;
                    break
            }
        },
        //---------------------------------------------------------------------
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
                    this.countFilters(route.query);
                }
            }
        },
        //---------------------------------------------------------------------
        watchRoutes(route)
        {
            //watch routes
            watch(route, (newVal,oldVal) =>
                {
                    this.route = newVal;
                    if(newVal.params.id){
                        this.getItem(newVal.params.id);
                    }
                    this.setViewAndWidth(newVal.name);
                }, { deep: true }
            )
        },
        //---------------------------------------------------------------------
        watchStates()
        {
            watch(this.query.filter, (newVal,oldVal) =>
                {
                    this.delayedSearch();
                },{deep: true}
            )
        },
        //---------------------------------------------------------------------
        async getAssets() {

            if(this.assets_is_fetching === true){
                this.assets_is_fetching = false;

                vaah().ajax(
                    this.ajax_url+'/assets',
                    this.afterGetAssets,
                );
            }
        },
        //---------------------------------------------------------------------
        afterGetAssets(data, res)
        {
            if(data)
            {
                this.assets = data;
                if(data.rows)
                {
                    this.query.rows = data.rows;
                }

                if(this.route.params && !this.route.params.id){
                    this.item = vaah().clone(data.empty_item);
                }

            }
        },
        //---------------------------------------------------------------------
        async getList() {
            let options = {
                query: vaah().clone(this.query)
            };

            await vaah().ajax(
                this.ajax_url,
                this.afterGetList,
                options
            );
        },
        //---------------------------------------------------------------------
        afterGetList: function (data, res)
        {
            if(data)
            {
                this.list = data;
            }
        },
        //---------------------------------------------------------------------
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
        //---------------------------------------------------------------------
        afterCreate(data, res)
        {
            if(data)
            {
                this.getList();
                this.performFormAction();
            }
        },
        //---------------------------------------------------------------------
        async getItem(id) {
            if(id){
                vaah().ajax(
                    ajax_url+'/'+id,
                    this.getItemAfter
                );
            }

        },
        //---------------------------------------------------------------------
        getItemAfter(data, res)
        {
            if(data)
            {
                this.item = data;
            }else{
                this.$router.push({name: 'articles.index'});
            }
            this.getItemMenu();
            this.getFormMenu();
        },
        //---------------------------------------------------------------------
        async store() {
            let options = {
                params: this.item,
                method: 'put',
            };
            vaah().ajax(
                ajax_url+'/'+this.item.id,
                this.storeAfter,
                options
            );
        },
        //---------------------------------------------------------------------
        storeAfter(data, res)
        {
            if(data)
            {
                this.getList();
                this.performFormAction();
            }
        },
        //---------------------------------------------------------------------
        async paginate(event) {
            this.query.page = event.page+1;
            this.getList();
        },
        //---------------------------------------------------------------------
        async reload()
        {
            await this.getAssets();
            await this.getList();
        },
        //---------------------------------------------------------------------
        async setFormAction(action)
        {
            this.form.action = action;
            if(this.item.id)
            {
                await this.store();
            } else{
                await this.create();
            }
        },
        //---------------------------------------------------------------------
        async getFaker () {
            let params = {
                model_namespace: this.model,
                except: this.assets.fillable.except,
            };

            let url = this.base_url+'/faker';

            let options = {
                params: params,
                method: 'post',
            };

            vaah().ajax(
                url,
                this.getFakerAfter,
                options
            );
        },
        //---------------------------------------------------------------------
        getFakerAfter: function (data, res) {
            if(data)
            {
                let self = this;
                Object.keys(data.fill).forEach(function(key) {
                    self.item[key] = data.fill[key];
                });
            }
        },

        //---------------------------------------------------------------------
        performFormAction: function ()
        {
            switch (this.form.action)
            {
                case 'save-and-new':
                    this.setActiveItemAsEmpty();
                    break;
                case 'save-and-close':
                    this.setActiveItemAsEmpty();
                    this.$router.push({name: 'articles.index'});
                    break;
                case 'save-and-clone':
                    break;
            }
        },
        //---------------------------------------------------------------------
        onItemSelection(items)
        {
            this.action.items = items;
        },
        //---------------------------------------------------------------------
        setActiveItemAsEmpty()
        {
            this.item = vaah().clone(this.assets.empty_item);
        },
        //---------------------------------------------------------------------
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

        //---------------------------------------------------------------------
        async updateListAfter(data, res) {
            if(data)
            {
                this.action = vaah().clone(this.empty_action);
                await this.getList();
            }
        },

        //---------------------------------------------------------------------
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
        //---------------------------------------------------------------------
        confirmDelete()
        {
            if(this.action.items.length < 1)
            {
                vaah().toastErrors(['Select a record']);
                return false;
            }
            vaah().confirmDialogDelete(this.deleteList);
        },
        //---------------------------------------------------------------------
        async deleteList(){
            this.action.type = 'delete';
            if(this.action.items.length < 1)
            {
                vaah().toastErrors(['Select records']);
                return false;
            }
            let options = {
                params: this.action,
                method: 'delete',
                show_success: false
            };
            vaah().ajax(
                this.ajax_url,
                this.updateListAfter,
                options
            );
        },
        //---------------------------------------------------------------------
        confirmDeleteItem()
        {
            vaah().confirmDialogDelete(this.deleteItem);
        },
        //---------------------------------------------------------------------
        async deleteItem(item=null){

            if(!item){
                item = this.item;
            }

            let params = {
                type: 'trash',
                items: [
                    item
                ]
            }
            let options = {
                params: params,
                method: 'put',
                show_success: false
            };
            vaah().ajax(
                this.ajax_url,
                this.updateListAfter,
                options
            );
        },
        //---------------------------------------------------------------------
        deleteItemAfter()
        {
            this.updateListAfter();

            if(this.route.params.id === this.item.id)
            {
                this.setActiveItemAsEmpty();
                this.toList();
            }

        },
        //---------------------------------------------------------------------
        updateItem(action)
        {
            this.item['action'] = action;
            let url = this.ajax_url+'/'+this.item.id;
            let options = {
                params: this.item,
                method: 'patch'
            };
            vaah().ajax(
                url,
                this.updateItemAfter,
                options
            );
        },
        //---------------------------------------------------------------------
        async updateItemAfter(data, res) {
            if(data)
            {
                this.getList();
                if(this.route.params && this.route.params.id){
                    this.getItem(this.route.params.id);
                }

            }
        },
        //---------------------------------------------------------------------
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
        //---------------------------------------------------------------------
        async updateUrlQueryString(query)
        {
            //remove reactivity from source object
            query = vaah().clone(query)

            //create query string
            let query_string = qs.stringify(query, {
                skipNulls: true,
            });
            let query_object = qs.parse(query_string);

            if(query_object.filter){
                query_object.filter = vaah().cleanObject(query_object.filter);
            }

            //reset url query string
            await this.$router.replace({query: null});

            //replace url query string
            await this.$router.replace({query: query_object});

            //update applied filters
            this.countFilters(query_object);

        },
        //---------------------------------------------------------------------
        countFilters: function (query)
        {
            this.count_filters = 0;
            if(query && query.filter)
            {
                let filter = vaah().cleanObject(query.filter);
                this.count_filters = Object.keys(filter).length;
            }
        },
        //---------------------------------------------------------------------
        async clearSearch()
        {
            this.query.filter.q = null;
            await this.updateUrlQueryString(this.query);
            await this.getList();
        },
        //---------------------------------------------------------------------
        async resetQuery()
        {
            //reset query strings
            await this.resetQueryString();

            //reload page list
            await this.getList();
        },
        //---------------------------------------------------------------------
        async resetQueryString()
        {
            for(let key in this.query.filter)
            {
                this.query.filter[key] = null;
            }
            await this.updateUrlQueryString(this.query);
        },
        //---------------------------------------------------------------------
        closeForm()
        {
            this.$router.push({name: 'articles.index'})
        },
        //---------------------------------------------------------------------
        toList()
        {
            this.item = null;
            this.$router.push({name: 'articles.index'})
        },
        //---------------------------------------------------------------------
        toForm()
        {
            this.item = vaah().clone(this.assets.empty_item);
            this.getFormMenu();
            this.$router.push({name: 'articles.form'})
        },
        //---------------------------------------------------------------------
        toView(item)
        {
            this.item = vaah().clone(item);
            this.$router.push({name: 'articles.view', params:{id:item.id}})
        },
        //---------------------------------------------------------------------
        toEdit(item)
        {
            this.item = item;
            this.$router.push({name: 'articles.form', params:{id:item.id}})
        },
        //---------------------------------------------------------------------
        isViewLarge()
        {
            return this.view === 'large';
        },
        //---------------------------------------------------------------------
        changeStatus(item)
        {

            let url = this.ajax_url+'/'+item.id;

            let options = {
                params: item,
                method: 'put',
                show_success: false
            };
            vaah().ajax(
                url,
                this.updateListAfter,
                options
            );
        },
        //---------------------------------------------------------------------

        //---------------------------------------------------------------------
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
        //---------------------------------------------------------------------
        getActionWidth()
        {
            let width = 100;
            if(!this.isViewLarge())
            {
                width = 80;
            }
            return width+'px';
        },
        //---------------------------------------------------------------------
        getActionLabel()
        {
            let text = null;
            if(this.isViewLarge())
            {
                text = 'Actions';
            }

            return text;
        },
        //---------------------------------------------------------------------
        getItemMenu()
        {
            let item_menu = [];

            if(this.item && this.item.deleted_at)
            {

                item_menu.push({
                    label: 'Restore',
                    icon: 'pi pi-refresh',
                    command: () => {
                        this.updateItem('restore');
                    }
                });
            }

            if(this.item && this.item.id && !this.item.deleted_at)
            {
                item_menu.push({
                    label: 'Trash',
                    icon: 'pi pi-times',
                    command: () => {
                        this.updateItem('trash');
                    }
                });
            }

            item_menu.push({
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => {
                    this.confirmDeleteItem('delete');
                }
            });

            this.item_menu_list = item_menu;
        },
        //---------------------------------------------------------------------
        getFormMenu()
        {

            let form_menu = [];

            if(!this.item || !this.item.id)
            {

                form_menu.push({
                    label: 'Save & Close',
                    icon: 'pi pi-check',
                    command: () => {
                        this.form.action = 'save-and-close';
                        if(this.item && this.item.id){
                            this.store();
                        }else{
                            this.create();
                        }

                    }
                },);

                form_menu.push({
                    label: 'Save & Clone',
                    icon: 'pi pi-copy',
                    command: () => {
                        this.form.action = 'save-and-clone';
                        if(this.item && this.item.id){
                            this.store();
                        }else{
                            this.create();
                        }
                    }
                });


                form_menu.push({
                    label: 'Reset',
                    icon: 'pi pi-refresh',
                    command: () => {
                        this.setActiveItem();
                    }
                });


            }

            form_menu.push({
                label: 'Fill',
                icon: 'pi pi-pencil',
                command: () => {
                    this.getFaker();
                }
            });

            this.form_menu_list = form_menu;
        },
        //---------------------------------------------------------------------
    }
});



// Pinia hot reload
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useArticlesStore, import.meta.hot))
}
