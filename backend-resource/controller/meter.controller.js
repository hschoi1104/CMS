import { MeterService } from '../service/meter.service';
import { Response } from '../model/Response';

export class MeterController {
  static getDownloadCount = async (req, res, next) => {
    try {
      const result = await MeterService.getDownloadCount(req.query);

      return res
        .status(200)
        .json(
          new Response(200, 'success', 'get download count success', result)
        );
    } catch (err) {
      next(err);
    }
  };

  static getStorageState = async (req, res, next) => {
    try {
      const result = await MeterService.getStorageState();

      return res
        .status(200)
        .json(
          new Response(200, 'success', 'get storage state success', result)
        );
    } catch (err) {
      next(err);
    }
  };
}
