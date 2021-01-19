import Vue from 'vue';
import Vuex from 'vuex';
import axios from './../service/axios';
import createPersistedState from 'vuex-persistedstate';

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
			console.log('login' + result.data.result.accessToken);
			axios.defaults.headers.common = {
				Authorization: 'Bearer ' + result.data.result.accessToken,
			};

			return commit('Login', result.data.result);
		},
		async Logout({ commit }) {
			try {
				await axios.post('/user/revoke-token');
			} catch (err) {
				console.log();
			}
			localStorage.clear();
			return commit('Logout');
		},
		RefreshToken({ commit }, { accessToken }) {
			return commit('RefreshToken', { accessToken });
		},
	},
	modules: {},
	plugins: [createPersistedState()],
});
