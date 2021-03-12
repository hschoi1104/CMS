import { check, validationResult } from 'express-validator';
import { handleError } from '../model/Error';
import { logger } from '../config/winston';

exports.createObjectLog = [
  check('objectId').isNumeric(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(JSON.stringify(errors));
      next(new handleError(400, 'type validate fail'));
    } else next();
  },
];
