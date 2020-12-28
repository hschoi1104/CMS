import express from 'express';
var router = express.Router();
import { UserController } from '../controller/user.controller';

router.post('/', UserController.createUser);
router.get('/:id', UserController.getUser);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
