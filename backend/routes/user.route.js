import express from 'express';
var router = express.Router();
import validate from './../validate/user.validate';
import { UserController } from '../controller/user.controller';

router.post('/', validate.createUser, UserController.createUser);
router.get('/:id', validate.getUser, UserController.getUser);
router.get('/', UserController.getUsers);
router.patch('/:id', validate.updateUser, UserController.updateUser);
router.delete('/:id', validate.deleteUser, UserController.deleteUser);

router.post(
  '/authenticate',
  validate.authenticate,
  UserController.authenticate
);
router.post('/refresh-token', validate.token, UserController.refreshToken);
router.post('/revoke-token', validate.token, UserController.revokeToken);

module.exports = router;
