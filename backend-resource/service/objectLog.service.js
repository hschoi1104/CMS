import { ObjectLogDao } from '../dao/objectLog.dao';
import { handleError } from '../model/Error';
import moment from 'moment';

export class ObjectLogService {
  static createObjectLog = async (req) => {
    let { objectId } = req;
    try {
      const result = await ObjectLogDao.createObjectLog(objectId);
      return result;
    } catch (err) {
      throw new handleError(500, 'Create ObjectLog fail');
    }
  };

  static getObjectLog = async (req) => {
    const { start, end } = req.query;
    logger.info(start, end);
    const { objectId } = req.params;
    const logs = await ObjectLogDao.getObjectLog(
      objectId,
      moment(start),
      moment(end)
    );
    let result = { objectId: objectId, created: [] };
    logs.forEach((element) => {
      result.created.push(element.created);
    });
    if (result == null) {
      throw new handleError(404, 'ObjectLog not exsited');
    }
    return result;
  };
}
