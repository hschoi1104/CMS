import axiosResource from './axios.resource';

export class ObjectLogService {
	static createObjectLog = async objectId => {
		try {
			const result = await axiosResource.post(`/objectlog`, {
				objectId,
			});
			return result.data.result;
		} catch (err) {
			return err;
		}
	};
}
