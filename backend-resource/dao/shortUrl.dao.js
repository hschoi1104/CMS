import ShortUrl from '../model/ShortUrl';

export class ShortUrlDao {
  static createShortUrl = async (objectId, key) => {
    const shortUrl = new ShortUrl({
      objectId,
      key,
    });
    return await shortUrl.save();
  };

  static getShortUrl = async (key) => {
    return await ShortUrl.find(
      { key },
      {
        __v: 0,
      }
    );
  };

  static getShortUrlKey = async (objectId) => {
    return await ShortUrl.find(
      { objectId },
      {
        __v: 0,
      }
    );
  };

  static getShortUrls = async () => {
    return await ShortUrl.find(
      {},
      {
        __v: 0,
      }
    ).sort({
      created: -1,
    });
  };

  static deleteShortUrl = async (key) => {
    return await ShortUrl.deleteOne({
      key,
    });
  };
}
