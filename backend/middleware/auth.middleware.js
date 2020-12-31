import jwt from 'jsonwebtoken';
import { UserDao } from '../dao/user.dao';
import { handleError } from './../model/Error';

function authMiddleware(role = []) {
  if (typeof role === 'string') {
    role = [role];
  }
  let token = '';
  let decode = {};
  return [
    // authorize based on user role
    async (req, res, next) => {
      try {
        token = req.headers.authorization.split('Bearer ')[1];
      } catch (err) {
        next(new handleError(401, 'Token is missing'));
      }
      try {
        decode = await jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        next(new handleError(401, 'Expired Token'));
      }

      const user = await UserDao.getUser(decode.id);
      if (!user || (role == 'manager' && !user.isManager)) {
        next(new handleError(403, 'Unauthorized'));
      }

      next();
    },
  ];
}

module.exports = authMiddleware;
