import axiosResource from './axios.resource';
export class MeterService {
	static getDownload = async (year, month) => {
		try {
			const result = await axiosResource.get(
				`/meter/download/?year=${year}&month=${month}`,
				{},
			);
			return result.data.result;
		} catch (err) {
			return err;
		}
	};
	static getStorage = async () => {
		try {
			const result = await axiosResource.get(`/meter/storage`);
			return result.data.result;
		} catch (err) {
			return err;
		}
	};
}
