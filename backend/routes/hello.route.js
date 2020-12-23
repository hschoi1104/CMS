import express from 'express';
var router = express.Router();
import { HelloController } from '../controller/hello.controller';

router.get('/', HelloController.read);

module.exports = router;
