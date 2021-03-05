import { ObjectLogService } from '../service/objectLog.service';
import { Response } from '../model/Response';
export class ObjectLogController {
  static createObjectLog = async (req, res, next) => {
    try {
      const result = await ObjectLogService.createObjectLog(req.body);
      return res
        .status(201)
        .json(new Response(201, 'success', 'create objectLog success', result));
    } catch (err) {
      next(err);
    }
  };

  static getObjectLog = async (req, res, next) => {
    try {
      const result = await ObjectLogService.getObjectLog(req);

      return res
        .status(200)
        .json(new Response(200, 'success', 'find objectLog success', result));
    } catch (err) {
      next(err);
    }
  };
}
