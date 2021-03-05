import { ShortUrlDao } from '../dao/shortUrl.dao';
import { ArObjectDao } from '../dao/arObject.dao';
import { handleError } from '../model/Error';
export class ShortUrlService {
  static createShortUrl = async (req) => {
    let { objectId } = req;
    let key = Math.random().toString(36).substr(2, 11);
    try {
      const exsitedArobject = await ArObjectDao.getArObject(objectId);
      if (exsitedArobject == null) {
        return new handleError(404, 'object not exsited');
      }

      objectId = exsitedArobject.objectId;
      let exsitedKey = await ShortUrlDao.getShortUrl(key);
      while (exsitedKey.length != 0) {
        key = Math.random().toString(36).substr(2, 11);
        exsitedKey = await ShortUrlDao.getShortUrl(key);
      }
      const result = await ShortUrlDao.createShortUrl(objectId, key);
      return result;
    } catch (err) {
      throw new handleError(500, 'Create ShortUrl fail');
    }
  };

  static getShortUrl = async (params) => {
    let { key } = params;
    const result = await ShortUrlDao.getShortUrl(key);

    if (result == null) {
      throw new handleError(404, 'ShortUrl not exsited');
    }
    return result;
  };

  static getShortUrls = async () => {
    const result = await ShortUrlDao.getShortUrls();

    if (result == null) {
      throw new handleError(404, 'ShortUrl not exsited');
    }
    return result;
  };

  static deleteShortUrl = async (params) => {
    const { key } = params;

    const result = await ShortUrlDao.deleteShortUrl(key);

    if (result.n == 0) {
      throw new handleError(404, 'ShortUrl not exsited');
    } else if (result.ok == 1) {
      return result;
    } else {
      throw new handleError(500, 'Delete error');
    }
  };
}
