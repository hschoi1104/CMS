import { BoardService } from '../service/board.service';
import { Response } from '../model/Response';
import { logger } from '../config/winston';
export class BoardController {
  static createPost = async (req, res, next) => {
    try {
      const result = await BoardService.createPost(req.body);

      logger.http('POST /api/v1/user');
      return res
        .status(201)
        .json(new Response(201, 'success', 'create post success', result));
    } catch (err) {
      next(err);
    }
  };

  static getPosts = async (req, res, next) => {
    try {
      const result = await BoardService.getPosts();

      return res
        .status(200)
        .json(new Response(200, 'success', 'find posts success', result));
    } catch (err) {
      next(err);
    }
  };

  static deletePost = async (req, res, next) => {
    try {
      const result = await BoardService.deletePost(req.params);
      return res
        .status(200)
        .json(new Response(200, 'success', 'delete post success', result));
    } catch (err) {
      next(err);
    }
  };
}
