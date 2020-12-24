import { UserDao } from './../dao/user.dao';

export class UserService {
  static create = async (req) => {
    const result = await UserDao.create(req);
    return result;
  };
}
