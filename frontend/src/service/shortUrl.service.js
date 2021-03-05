import axiosResource from './axios.resource';

export class ShortUrlService {
	static readShortUrl = async key => {
		try {
			const result = await axiosResource.get(`/short/${key}`);
			return result.data.result;
		} catch (err) {
			return err;
		}
	};
}
