import axios from './axios';

export class UserService {
	static refreshToken = async () => {
		try {
			const result = await axios.post('/user/refresh-token');
			console.log('userservice  ' + result);
			return result;
		} catch (err) {
			return err;
		}
	};
	static getUsers = async () => {
		try {
			const result = await axios.get('/user');
			return result.data.result;
		} catch (err) {
			return err;
		}
	};
}
