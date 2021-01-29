import axios from 'axios';
import { UserService } from './user.service';
import store from '../store/index';
import router from './../router';
//import axiosResource from './axios.resource';

const axiosAuth = axios.create({
	baseURL: 'http://localhost:5000/api/v1/',
	withCredentials: true,
});

// Add a request interceptor
axiosAuth.interceptors.request.use(
	async function(config) {
		// Do something before request is sent
		try {
			config.headers.common = {
				Authorization: 'Bearer ' + store.state.accessToken,
			};
		} catch (err) {
			console.log();
		}
		return await config;
	},
	function(error) {
		// Do something with request error
		return Promise.reject(error);
	},
);

// Add a response interceptor
axiosAuth.interceptors.response.use(
	function(response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	async function(error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		const result = error.config;
		if (error.response.status === 401 && result.retry != true) {
			result.retry = true;
			const res = await UserService.refreshToken();
			await store.commit('RefreshToken', res.data.result);
			error.response.config.headers = {
				Authorization: 'Bearer ' + res.data.result.accessToken,
			};
			return await axiosAuth(result);
		} else {
			alert('로그인이 필요합니다.');
			router.push('/login').catch(() => {});
		}
		return Promise.reject(error);
	},
);

export default axiosAuth;
