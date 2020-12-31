import jwt from 'jsonwebtoken';
import { handleError } from './../model/Error';

const authMiddleware = async (req, res, next) => {
  let token = '';
  try {
    token = req.headers.authorization.split('Bearer ')[1];
  } catch (err) {
    next(new handleError(401, 'Token is missing'));
  }
  try {
    await jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    next(new handleError(401, 'Expired Token'));
  }
};

module.exports = authMiddleware;
