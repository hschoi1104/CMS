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
	static getObjectLog = async (objectId, start, end) => {
		try {
			const result = await axiosResource.get(
				`/objectlog/${objectId}?start=${start}&${end}`,
			);
			return result;
		} catch (err) {
			return err;
		}
	};
}
