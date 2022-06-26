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
            //----------------------------------------------------------
            //----------------------------------------------------------
            //----------------------------------------------------------


        }

        app.provide("vaah", vaah);
    }
};
