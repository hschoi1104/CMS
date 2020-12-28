import { UserDao } from './../dao/user.dao';

export class UserService {
  static create = async (req) => {
    const { id, password, name } = req;

    const exsited = await UserDao.getUser(id);

    if (exsited != null) {
      let err = new Error();
      err.message = 'User already existed';
      err.status = 400;
      throw err;
    }

    const result = await UserDao.create(id, password, name);

    return result;
  };

  static getUser = async (req) => {
    const { id } = req;
    const result = await UserDao.getUser(id);

    if (result == null) {
      let err = new Error();
      err.message = 'User not exsited';
      err.status = 404;
      throw err;
    }
    return result;
  };

  static updateUser = async (params, body) => {
    const { id } = params;
    const { isManager } = body;
    const result = await UserDao.updateUser(id, isManager);

    if (result == null) {
      let err = new Error();
      err.message = 'User not exsited';
      err.status = 404;
      throw err;
    }
    return result;
  };

  static deleteUser = async (params) => {
    const { id } = params;

    const result = await UserDao.deleteUser(id);

    if (result.n == 0) {
      let err = new Error();
      err.message = 'User not exsited';
      err.status = 404;
      throw err;
    } else if (result.ok == 1) {
      return result;
    } else {
      let err = new Error();
      err.message = 'delete error';
      err.status = 500;
      throw err;
    }
  };
}
