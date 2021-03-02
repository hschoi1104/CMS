import { check, validationResult } from 'express-validator';
import { handleError } from '../model/Error';
import { logger } from '../config/winston';

exports.createShortUrl = [
  check('objectId').isNumeric(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(JSON.stringify(errors));
      next(new handleError(400, 'type validate fail'));
    } else next();
  },
];

exports.getShortUrl = [
  check('key').isString().isLength({ min: 9, max: 11 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(JSON.stringify(errors));
      next(new handleError(400, 'type validate fail'));
    } else next();
  },
];
