import express from 'express';
var router = express.Router();
import { UserController } from '../controller/user.controller';

router.post('/', UserController.create);
router.get('/:id', UserController.getUser);
module.exports = router;
