import Board from '../model/Board';

export class BoardDao {
  static createPost = async (name, content) => {
    const board = new Board({
      name,
      content,
    });
    return board.save();
  };

  static getPosts = async () => {
    return Board.find({}, { p__v: 0 });
  };

  static deletePost = async (_id) => {
    return Board.deleteOne({
      _id,
    });
  };
}
