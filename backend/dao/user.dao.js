import User from '../model/User';

export class UserDao {
  static create = async (id, password, name) => {
    const user = new User({
      id,
      password,
      name,
    });
    return user.save();
  };

  static getUser = async (id) => {
    return User.findOne({
      id,
    });
  };

  static updateUser = async (id, isManager) => {
    return User.findOneAndUpdate(
      {
        id,
      },
      {
        isManager,
      },
      {
        new: true,
      }
    );
  };

  static deleteUser = async (id) => {
    return User.deleteOne({
      id,
    });
  };
}
