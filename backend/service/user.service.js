import { UserDao } from './../dao/user.dao';
import { handleError } from './../model/Error';
export class UserService {
  static create = async (req) => {
    const { id, password, name } = req;

    const exsited = await UserDao.getUser(id);

    if (exsited != null) {
      throw new handleError(400, 'User already existed');
    }

    const result = await UserDao.create(id, password, name);

    return result;
  };

  static getUser = async (req) => {
    const { id } = req;
    const result = await UserDao.getUser(id);

    if (result == null) {
      throw new handleError(400, 'User not exsited');
    }
    return result;
  };

  static updateUser = async (params, body) => {
    const { id } = params;
    const { isManager } = body;
    const result = await UserDao.updateUser(id, isManager);

    if (result == null) {
      throw new handleError(400, 'User not exsited');
    }
    return result;
  };

  static deleteUser = async (params) => {
    const { id } = params;

    const result = await UserDao.deleteUser(id);

    if (result.n == 0) {
      throw new handleError(404, 'User not exsited');
    } else if (result.ok == 1) {
      return result;
    } else {
      throw new handleError(500, 'Delete error');
    }
  };
}
