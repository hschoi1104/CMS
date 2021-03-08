import { ObjectLogDao } from '../dao/objectLog.dao';
import { ArObjectDao } from '../dao/arObject.dao';
import { handleError } from '../model/Error';
import moment from 'moment';

export class MeterService {
  static getDownloadCount = async (query) => {
    const { year, month } = query;
    const start = moment(new Date(year, month - 1, 1));
    const end = moment(start).endOf('month');

    const result = await ObjectLogDao.getObjectLogs(start, end);

    if (result == null) {
      throw new handleError(404, 'log not found');
    }
    return result.length;
  };

  static getStorageState = async () => {
    const result = await ArObjectDao.getArObjects();
    if (result == null) {
      throw new handleError(404, 'Arobject not exsited');
    }
    let size = 0;
    result.forEach((ArObject) => {
      ArObject.s3Info.forEach((file) => {
        size = size + file.size;
      });
    });
    return size;
  };
}
