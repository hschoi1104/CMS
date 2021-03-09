import axiosResource from './axios.resource';

export class ShortUrlService {
	static createShortUrl = async objectId => {
		try {
			const result = await axiosResource.post('/short', {
				objectId,
			});
			return result.data.result;
		} catch (err) {
			return err;
		}
	};

	static readShortUrl = async key => {
		try {
			const result = await axiosResource.get(`/short/${key}`);
			return result.data.result;
		} catch (err) {
			return err;
		}
	};

	static getShortUrlKey = async objectId => {
		try {
			const result = await axiosResource.get(`/short/${objectId}/key`);
			return result.data.result;
		} catch (err) {
			return err;
		}
	};
}
