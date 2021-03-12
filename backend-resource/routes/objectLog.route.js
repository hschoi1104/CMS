import express from 'express';
var router = express.Router();
import validate from '../validate/objectLog.validate';
import { ObjectLogController } from '../controller/objectLog.controller';
import authMiddleware from './../middleware/auth.middleware';

router.post(
  '/',
  authMiddleware(),
  validate.createObjectLog,
  ObjectLogController.createObjectLog
);
router.get('/:objectId', authMiddleware(), ObjectLogController.getObjectLog);

module.exports = router;
