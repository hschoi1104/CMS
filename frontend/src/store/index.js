import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';
// import moduleName from './moduleName';
Vue.use(Vuex);

export default new Vuex.Store({
	state: { accessToken: null },
	mutations: {
		Login(state, { accessToken }) {
			state.accessToken = accessToken;
		},
		Logout(state) {
			state.accessToken = null;
		},
		RefreshToken(state, { accessToken }) {
			state.accessToken = accessToken;
		},
	},
	actions: {
		async Login({ commit }, { id, password }) {
			const result = await axios.post('/user/authenticate', {
				id,
				password,
			});
			axios.defaults.headers.common['Authorization'] =
				result.data.result.accessToken;
			return commit('Login', result.data.result);
		},
		async Logout({ commit }) {
			await axios.post('/user/revoke-token');
			return commit('Logout');
		},
		RefreshToken({ commit }, { accessToken }) {
			return commit('RefreshToken', { accessToken });
		},
	},
	modules: {},
	plugins: [createPersistedState()],
});
