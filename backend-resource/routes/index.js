import express from 'express';
var router = express.Router();
import guestBook from './guestBook.route';
import board from './board.route';

router.use('/guestbook', guestBook);
router.use('/board', board);
module.exports = router;
