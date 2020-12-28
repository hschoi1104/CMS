import User from '../model/User';

export class UserDao {
  static create = async (req) => {
    const user = new User({
      id: req.id,
      password: req.password,
      name: req.name,
    });
    return user.save();
  };

  static getUser = async (req) => {
    return User.findOne({
      id: req.id,
    });
  };

  static updateUser = async (id,isManager) => {
    return User.findOneAndUpdate({
      id
    },{
      isManager
    },{
      new: true
    });
  };
}
