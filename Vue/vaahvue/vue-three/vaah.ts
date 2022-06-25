import axios from "axios";



export default {
    install: (app, options) => {
        const vaah = {

            test: function () {
                console.log('test--->');
            },


            ajax: async function (
                url: string, params: object, callback = null,
                method: string = 'get', query = null,
                headers = null
            ) {


                let self = this;

                //To make axios request as ajax request
                axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest',
                };

                type  Qr = {
                    params: string | null;
                    headers: string;
                }

                let q = <Qr>{};

                q.params = query;

                if (headers) {
                    q.headers = headers;
                }

                if (method === 'get') {
                    let query = {
                        params: params
                    };
                    params = query;
                    q = <Qr>{};
                    /*axios.interceptors.request.use(
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
                    );*/
                }

                if (method === 'delete') {
                    params = {
                        data: params
                    };
                }

                console.log('--->', url);
                // @ts-ignore
                let ajax = await axios[method](url, params, q)
                    .then(function (response: any) {
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
                    }).catch(function (error: any) {

                        console.log('error--->', error);

                        /*self.processError(error);
                        if(callback)
                        {
                            callback(false, error);
                        }
                        return error;*/
                    });

                return ajax;
            }
        }

        app.provide("vaah", vaah);
    }
};
