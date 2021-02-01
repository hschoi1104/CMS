import express from 'express';
var router = express.Router();
import validate from '../validate/arObject.validate';
import { ArObjectController } from '../controller/arObject.controller';
import authMiddleware from '../middleware/auth.middleware';

router.post(
  '/',
  authMiddleware(),
  validate.createArObject,
  ArObjectController.createArObject
);
router.get(
  '/:objectId',
  authMiddleware(),
  validate.getArObject,
  ArObjectController.getArObject
);
router.get('/', authMiddleware(), ArObjectController.getArObjects);
router.patch(
  '/:objectId',
  authMiddleware(),
  validate.updateArObject,
  ArObjectController.updateArObject
);
router.delete(
  '/:objectId',
  authMiddleware(),
  validate.deleteArObject,
  ArObjectController.deleteArObject
);

module.exports = router;
