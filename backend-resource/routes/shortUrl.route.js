import express from 'express';
var router = express.Router();
import { ShortUrlController } from '../controller/shortUrl.controller';
import authMiddleware from './../middleware/auth.middleware';
import validate from './../validate/shortUrl.validate';

router.post(
  '/',
  authMiddleware(),
  validate.createShortUrl,
  ShortUrlController.createShortUrl
);
router.get('/', authMiddleware(), ShortUrlController.getShortUrls);
router.get(
  '/key/:objectId',
  authMiddleware(),
  ShortUrlController.getShortUrlKey
);
router.get(
  '/:key',
  authMiddleware(),
  validate.getShortUrl,
  ShortUrlController.getShortUrl
);
router.delete('/:key', authMiddleware(), ShortUrlController.deleteShortUrl);

module.exports = router;
