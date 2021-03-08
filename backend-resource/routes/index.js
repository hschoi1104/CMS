import express from 'express';
var router = express.Router();
import guestBook from './guestBook.route';
import board from './board.route';
import arObject from './arObject.route';
import shortUrl from './shortUrl.route';
import objectLog from './objectLog.route';
import meter from './meter.route';

router.use('/guestbook', guestBook);
router.use('/board', board);
router.use('/arobject', arObject);
router.use('/short', shortUrl);
router.use('/objectlog', objectLog);
router.use('/meter', meter);

module.exports = router;
