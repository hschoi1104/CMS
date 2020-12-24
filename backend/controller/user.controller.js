import { UserService } from '../service/user.service';

export class UserController {
  static create = async (req, res, next) => {
    const result = await UserService.create(req.body);
    try {
      return res.status(201).json({
        success: true,
        message: 'create user success',
        result: result,
      });
    } catch (err) {
      next(err);
    }
  };
}
