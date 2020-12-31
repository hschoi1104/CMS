import express from 'express';
var router = express.Router();
import validate from './../validate/user.validate';
import { UserController } from '../controller/user.controller';
import authMiddleware from './../middleware/auth.middleware';

router.post('/', validate.createUser, UserController.createUser);
router.get('/:id', authMiddleware, validate.getUser, UserController.getUser);
router.get('/', authMiddleware, UserController.getUsers);
router.patch(
  '/:id',
  authMiddleware,
  validate.updateUser,
  UserController.updateUser
);
router.delete(
  '/:id',
  authMiddleware,
  validate.deleteUser,
  UserController.deleteUser
);

router.post(
  '/authenticate',
  validate.authenticate,
  UserController.authenticate
);
router.post(
  '/refresh-token',
  authMiddleware,
  validate.token,
  UserController.refreshToken
);
router.post(
  '/revoke-token',
  authMiddleware,
  validate.token,
  UserController.revokeToken
);

module.exports = router;
