import axios from 'axios';

export class UserService {
	static refreshToken = async () => {
		try {
			const result = await axios.post('/user/refresh-token');
			return result;
		} catch (err) {
			return err;
		}
	};
}
