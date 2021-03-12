import express from 'express';
var router = express.Router();
// import validate from '../validate/meter.validate';
import { MeterController } from '../controller/meter.controller';
import authMiddleware from './../middleware/auth.middleware';

router.get('/download', authMiddleware(), MeterController.getDownloadCount);
router.get('/storage', authMiddleware(), MeterController.getStorageState);

module.exports = router;
