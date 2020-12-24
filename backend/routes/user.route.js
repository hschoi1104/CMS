import express from 'express';
var router = express.Router();
import { UserController } from '../controller/user.controller';

router.post('/', UserController.create);

module.exports = router;
