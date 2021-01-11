import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
// import moduleName from './moduleName';
Vue.use(Vuex);

export default new Vuex.Store({
	state: { accessToken: null, refreshToken: null },
	mutations: {
		Login(state, { accessToken }) {
			state.accessToken = accessToken;
		},
		Logout(state) {
			state.accessToken = null;
		},
	},
	actions: {
		async Login({ commit }, { id, password }) {
			const result = await axios.post('/user/authenticate', {
				id,
				password,
			});
			return commit('Login', result.data.result);
		},
	},
	modules: {},
	plugins: [createPersistedState()],
});
