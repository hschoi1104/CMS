import express from 'express';
import hello from './hello.route';
import user from './user.route';
var router = express.Router();

router.use('/hello', hello);
router.use('/user', user);
module.exports = router;
