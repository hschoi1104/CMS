import express from 'express';
var router = express.Router();
import guestBook from './guestBook.route';

router.use('/guestbook', guestBook);
module.exports = router;
