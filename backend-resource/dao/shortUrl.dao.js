import ShortUrl from '../model/ShortUrl';

export class ShortUrlDao {
  static createShortUrl = async (objectId, key) => {
    const shortUrl = new ShortUrl({
      objectId,
      key,
    });
    return shortUrl.save();
  };

  static getShortUrl = async (key) => {
    return ShortUrl.find(
      { key },
      {
        __v: 0,
      }
    );
  };

  static getShortUrls = async () => {
    return ShortUrl.find(
      {},
      {
        __v: 0,
      }
    ).sort({
      created: -1,
    });
  };

  static deleteShortUrl = async (key) => {
    return ShortUrl.deleteOne({
      key,
    });
  };
}
