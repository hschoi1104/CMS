import bcrypt from 'bcrypt';
const saltRounds = 12;

export class Secure {
  static genSalt = async () => {
    return bcrypt.genSalt(saltRounds);
  };

  static hash = async (plainPassword, salt) => {
    return bcrypt.hash(plainPassword, salt);
  };
}
