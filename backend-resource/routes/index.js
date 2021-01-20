import express from 'express';
var router = express.Router();
import board from './board.route';

router.use('/board', board);
module.exports = router;
