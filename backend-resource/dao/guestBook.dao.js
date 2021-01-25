import GuestBook from '../model/GuestBook';

export class GuestBookDao {
  static createPost = async (name, content) => {
    const guestBook = new GuestBook({
      name,
      content,
    });
    return guestBook.save();
  };

  static getPosts = async () => {
    return GuestBook.find({}, { p__v: 0 });
  };

  static deletePost = async (_id) => {
    return GuestBook.deleteOne({
      _id,
    });
  };
}
