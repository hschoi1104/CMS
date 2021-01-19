import axios from 'axios';
import { UserService } from './user.service';
import store from './../store/index';
axios.defaults.baseURL = '/api';

// Add a request interceptor
axios.interceptors.request.use(
	function(config) {
		// Do something before request is sent
		try {
			config.defaults.headers.common = {
				Authorization: 'Bearer ' + store.state.accessToken,
			};
		} catch (err) {
			console.log(err);
		}
		return config;
	},
	function(error) {
		// Do something with request error
		return Promise.reject(error);
	},
);

// Add a response interceptor
axios.interceptors.response.use(
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

			axios.defaults.headers.common = {
				Authorization: 'Bearer ' + res.data.result.accessToken,
			};

			return await axios(result);
		}
		return Promise.reject(error);
	},
);

export default axios;
