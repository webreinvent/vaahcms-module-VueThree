import axios from "axios";
import qs from "qs";
import {NotificationProgrammatic as Toast} from "@oruga-ui/oruga-next";


export default {
    install: (app, options) =>
    {
        const vaah = {

            test: function () {
                console.log('test--->');
            },

            //----------------------------------------------------------

            ajax: async function (
                url, params, callback = null,
                method = 'get', query = null,
                headers = null
            ) {


                let self = this;

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

                console.log('--->', url);
                // @ts-ignore
                let ajax = await axios[method](url, params, q)
                    .then(function (response) {
                        console.log('--->', response);
                        /*self.processResponse(response);
                        if(callback)
                        {
                            if(response.data && response.data.data)
                            {
                                callback(response.data.data, response);

                            } else{
                                self.log(response, 'response--->');
                                callback(false, response);
                            }
                        }*/
                        return response;
                    }).catch(function (error) {

                        console.log('error--->', error);

                        /*self.processError(error);
                        if(callback)
                        {
                            callback(false, error);
                        }
                        return error;*/
                    });

                return ajax;
            },

            //----------------------------------------------------------
            processResponse: function(response)
            {
                if(response.data.failed && response.data.messages)
                {
                    this.toastErrors(response.data.messages);
                }
                if(response.data.success && response.data.messages)
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
                let duration = 1000;

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
                    Toast.open({
                        position: 'is-top',
                        message: data.html,
                        variant: 'is-success',
                        duration: data.duration
                    });
                }
            },
            //----------------------------------------------------------
            toastErrors(messages){
                let data = this.getMessageAndDuration(messages);
                if(data && data.html !== "")
                {
                    Snackbar.open({
                        position: 'is-top',
                        message: data.html,
                        variant: 'is-danger',
                        duration: data.duration
                    });
                }
            },
            //----------------------------------------------------------
            //----------------------------------------------------------
            //----------------------------------------------------------
            //----------------------------------------------------------


        }

        app.provide("vaah", vaah);
    }
};