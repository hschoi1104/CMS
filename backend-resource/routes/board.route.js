import express from 'express';
var router = express.Router();
import validate from './../validate/board.validate';
import { BoardController } from '../controller/board.controller';
import authMiddleware from './../middleware/auth.middleware';

router.post(
  '/',
  authMiddleware(),
  validate.createPost,
  BoardController.createPost
);
router.get('/', authMiddleware(), BoardController.getPosts);
router.delete(
  '/:_id',
  authMiddleware(),
  validate.getPosts,
  BoardController.deletePost
);

module.exports = router;
