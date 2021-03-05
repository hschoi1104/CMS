import ObjectLog from '../model/ObjectLog';

export class ObjectLogDao {
  static createObjectLog = async (objectId) => {
    const objectLog = new ObjectLog({
      objectId,
    });
    return await objectLog.save();
  };

  static getObjectLog = async (objectId, start, end) => {
    return ObjectLog.find(
      {
        objectId,
        created: {
          $gte: start,
          $lt: end,
        },
      },
      {
        __v: 0,
        _id: 0,
        objectId: 0,
      }
    ).sort({
      created: 1,
    });
  };
}
