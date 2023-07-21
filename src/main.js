// EXTERNAL MODULES
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import VueCarousel from "vue-carousel";
import FlagIcon from "vue-flag-icon";
import InfiniteLoading from 'vue-infinite-loading';
import vSelect from 'vue-select'

// EXTERNAL MODULES--END

// CUSTOM MODULES
import i18n from "./plugins/i18n/index"

// CUSTOM MODULES--END

Vue.use("axios", axios);
Vue.use(VueSweetalert2);
Vue.use(VueCarousel);
Vue.use(FlagIcon);
Vue.use(InfiniteLoading);
Vue.component('v-select', vSelect)
Vue.config.productionTip = false;

// This capitalizes a text, i.e. first letter in capital and the rest in lower case
Vue.filter('capitalizeText', function(text) { return text[0].toUpperCase() + text.slice(1).toLowerCase() })

// This gets the part of the user's role name that is more understandable (to display it, use it for routing, etc.)  
Vue.filter('getRoleName', function (text) { return text.slice(text.search('_') + 1) })

// This gets the model to use to get the user characteristics depending on his role either player, coach or club  
Vue.filter('getModel', function (text) { return text.slice(text.search('_') + 1).toLowerCase() })

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register(`${process.env.VUE_APP_FRONT_URL}/sw.js`)
            .then((reg) => {
                // registration worked
                console.log('Registration succeeded. Scope is ' + reg.scope);
            }).catch((error) => {
                // registration failed
                console.log('Registration failed with ' + error);
            });
        })
}

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
