import axios from 'axios';
import { UserService } from './user.service';
import store from '../store/index';

const axiosResource = axios.create({
	baseURL: 'http://localhost:3000/api/v1',
	withCredentials: true,
});

// Add a request interceptor
axiosResource.interceptors.request.use(
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
axiosResource.interceptors.response.use(
	function(response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	async function(error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		console.log(error);
		const result = error.config;
		if (error.response.status === 401 && result.retry != true) {
			result.retry = true;

			const res = await UserService.refreshToken();

			error.response.config.headers = {
				Authorization: 'Bearer ' + res.data.result.accessToken,
			};

			return await axiosResource(result);
		}
		return Promise.reject(error);
	},
);

export default axiosResource;
