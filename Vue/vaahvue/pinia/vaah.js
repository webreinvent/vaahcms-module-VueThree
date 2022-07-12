import {defineStore} from 'pinia'
import axios from 'axios'
import qs from "qs";
import {ElNotification} from "element-plus";


export const vaah = defineStore({
    id: 'vaah',
    state: () => ({
    }),
    getters: {},
    actions: {
        ajax: async function (
            url,
            callback = null,
            options= {
                params: null,
                method: 'get',
                query: null,
                headers: null,
                show_success: true,
            }
        ) {


            let self = this;
            let default_option = {
                params: null,
                method: 'get',
                query: null,
                headers: null,
                show_success: true,
            }

            if(options)
            {
                for(let key in options)
                {
                    default_option[key] = options[key];
                }
            }

            let params = default_option.params;
            let method = default_option.method;
            let query = default_option.query;
            let headers = default_option.headers;
            let show_success = default_option.show_success;



            //To make axios request as ajax request
            axios.defaults.headers.common = {
                'X-Requested-With': 'XMLHttpRequest',
            };

            let q = {};

            q.params = query;

            if (headers) {
                q.headers = headers;
            }

            if (method === 'get') {
                let query = {
                    params: params
                };
                params = query;
                q = {};
                axios.interceptors.request.use(
                    function (config) {
                        config.paramsSerializer = function (params) {
                            return qs.stringify(params, {
                                arrayFormat: 'brackets',
                                encode: false,
                                skipNulls: true
                            })
                        }
                        return config;
                    },
                    function (error) {
                        return Promise.reject(error)
                    }
                );
            }

            if (method === 'delete') {
                params = {
                    data: params
                };
            }

            console.log('options--->', options);
            console.log('--->', method);


            let ajax = await axios[method](url, params, q)
                .then(function (response) {
                    self.processResponse(response, show_success);
                    if(callback)
                    {
                        if(response.data && response.data.data)
                        {
                            callback(response.data.data, response);
                        } else{
                            callback(false, response);
                        }
                    }
                    return response;
                }).catch(function (error) {
                    self.processError(error);
                    if(callback)
                    {
                        callback(false, error);
                    }
                    return error;
                });

            return ajax;
        },

        //----------------------------------------------------------
        processResponse: function(response, show_success)
        {
            if(
                (response.data.failed || response.data.success === false)
                && response.data.messages
            )
            {
                this.toastErrors(response.data.messages);
            }

            if(
                response.data.success
                && response.data.success === true
                && response.data.messages
                && show_success === true
            )
            {
                this.toastSuccess(response.data.messages);
            }
        },

        //----------------------------------------------------------
        processError: function(error)
        {
            if(error.response
                && error.response.status
                && error.response.status === 419)
            {
                this.toastErrors(['Session Expired. Please sign in again.']);
                location.reload();
                return;
            }

            if(debug === 1)
            {
                this.toastErrors([error]);
            } else
            {
                this.toastErrors(['Something went wrong']);
            }
        },
        //----------------------------------------------------------
        getMessageAndDuration(messages)
        {
            let i = 1;
            let list_html = "";
            let duration = 3000;

            if(Object.keys(messages).length > 1)
            {
                for(let k in messages)
                {
                    list_html += i+") "+messages[k]+"<br/>";
                    i++;
                }
            } else
            {
                if(messages[0])
                {
                    list_html += messages[0];
                }
            }

            let chars = list_html.length
            let readable = 10; // readable character per second.

            duration = duration*(chars/readable);

            console.log('duration--->', duration);

            return {
                html: list_html,
                duration: duration
            };
        },
        //----------------------------------------------------------
        toastSuccess(messages){
            let data = this.getMessageAndDuration(messages);
            if(data && data.html !== "")
            {
                ElNotification({
                    type: 'success',
                    icon: 'warning',
                    customClass: 'notification-success',
                    position: 'top-right',
                    message: data.html,
                    duration: data.duration,
                    appendTo: '#element-plus-notifications'
                });
            }
        },
        //----------------------------------------------------------
        toastErrors(messages){
            let data = this.getMessageAndDuration(messages);
            if(data && data.html !== "")
            {
                ElNotification({
                    type: 'error',
                    icon: 'warning',
                    customClass: 'notification-error',
                    offset: 68,
                    position: 'top-right',
                    message: data.html,
                    duration: data.duration,
                    appendTo: '#element-plus-notifications'
                })
            }
        },
        //----------------------------------------------------------
        clone: function (source)
        {
            return JSON.parse(JSON.stringify(source));
        },
        //----------------------------------------------------------
        //----------------------------------------------------------
        //----------------------------------------------------------


    }
})