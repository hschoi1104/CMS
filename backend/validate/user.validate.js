import { check, validationResult } from 'express-validator';
import { handleError } from './../model/Error';
import { logger } from './../config/winston';

exports.createUser = [
  check('id').isString().isLength({ min: 5 }),
  check('password').isString().isLength({ min: 8 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.info(JSON.stringify(errors));
      next(new handleError(400, 'type validate fail'));
    } else next();
  },
];

exports.getUser = [
  check('id').isString().isLength({ min: 5 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.info(JSON.stringify(errors));
      next(new handleError(400, 'type validate fail'));
    } else next();
  },
];

exports.updateUser = [
  check('id').isString().isLength({ min: 5 }),
  check('isManager').isBoolean().notEmpty(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.info(JSON.stringify(errors));
      next(new handleError(400, 'type validate fail'));
    } else next();
  },
];

exports.deleteUser = [
  check('id').isString().isLength({ min: 5 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.info(JSON.stringify(errors));
      next(new handleError(400, 'type validate fail'));
    } else next();
  },
];
