import { UserDao } from './../dao/user.dao';

export class UserService {
  static create = async (req) => {
    const result = await UserDao.create(req);
    return result;
  };

  static getUser = async (req) => {
    const result = await UserDao.getUser(req);
    if (result == null) {
      let err = new Error();
      err.message = 'User not exsited';
      err.status = 404;
      throw err;
    }
    return result;
  };
}
