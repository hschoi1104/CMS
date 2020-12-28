import { UserService } from '../service/user.service';

export class UserController {
  static create = async (req, res, next) => {
    try {
      const result = await UserService.create(req.body);

      return res.status(201).json({
        success: true,
        message: 'create user success',
        result: result,
      });
    } catch (err) {
      next(err);
    }
  };

  static getUser = async (req, res, next) => {
    try {
      const result = await UserService.getUser(req.params);

      return res.status(200).json({
        success: true,
        message: 'find user success',
        result: result,
      });
    } catch (err) {
      next(err);
    }
  };

  static updateUser = async (req, res, next) => {
    try {
      const result = await UserService.updateUser(req.params, req.body);

      return res.status(200).json({
        success: true,
        message: 'update user success',
        result: result,
      });
    } catch (err) {
      next(err);
    }
  };

  static deleteUser = async (req, res, next) => {
    try {
      const result = await UserService.deleteUser(req.params);
      return res.status(200).json({
        success: true,
        message: 'update user success',
        result: result,
      });
    } catch (err) {
      next(err);
    }
  };
}
