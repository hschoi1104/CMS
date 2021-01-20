import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import vuetify from './plugins/vuetify';
import axios from './service/axios';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount('#app');
