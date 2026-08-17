import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import lego from './plugins/lego';

import 'lego-framework/src/scss/variables/lego-variables.scss';
import './assets/style.scss';

import 'font-icons/nunito/nunito.css';
import 'font-icons/simple-line-icons/css/simple-line-icons.css';
import 'font-icons/iconsmind-s/css/iconsminds.css';
import 'font-icons/nucleo/css/nucleo.css';
import VueNumber from 'vue-number-animation';
import Box from 'lego-framework/src/containers/Box';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'secure-axios';
import urls from './data/urls';

Vue.config.productionTip = false;

Vue.use(lego);
Vue.use(VueNumber);
Vue.component('Box', Box);
// AOS.init({ delay: 2500 });
const win = window;

Vue.use(axios, {
    // Session timeout handler
    sessionTimeoutTimer: {
        seconds: 9000, // Session timeout set to 15 minutes (900 seconds)
        router,
        url: '/logout/' // Endpoint to check session status
    },

    // URLs to ignore for unauthorized error handling
    ignoreUnAuthorisedErrorURLs: [urls.auth.status, urls.auth.login],

    // Custom unauthorized access handler
    unAuthorisedError: function (response) {
        alert('Your session has expired. Please log in again to continue.');
        win.location = location; // Redirect user to the login page
        return response;
    }
});
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        AOS.init();
    }
};
