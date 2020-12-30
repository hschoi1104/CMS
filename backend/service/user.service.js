import { UserDao } from './../dao/user.dao';
import { RefreshTokenDao } from './../dao/refreshToken.dao';
import { handleError } from './../model/Error';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();
export class UserService {
  static createUser = async (req) => {
    let { id, password, name } = req;

    const salt = await bcrypt.genSalt(12);
    password = await bcrypt.hash(password, salt);

    const exsited = await UserDao.getUser(id);

    if (exsited != null) {
      throw new handleError(409, 'User already existed');
    }

    try {
      await UserDao.createUser(id, password, salt, name);
      const result = await UserDao.getUser(id);
      return result;
    } catch (err) {
      throw new handleError(500, 'Create user fail');
    }
  };

  static getUser = async (req) => {
    const { id } = req;
    const result = await UserDao.getUser(id);

    if (result == null) {
      throw new handleError(404, 'User not exsited');
    }
    return result;
  };

  static getUsers = async () => {
    const result = await UserDao.getUsers();

    if (result == null) {
      throw new handleError(404, 'User not exsited');
    }
    return result;
  };

  static updateUser = async (params, body) => {
    const { id } = params;
    const { isManager } = body;
    const result = await UserDao.updateUser(id, isManager);

    if (result == null) {
      throw new handleError(404, 'User not exsited');
    }
    const findResult = await UserDao.getUser(id);
    return findResult;
  };

  static deleteUser = async (params) => {
    const { id } = params;

    const result = await UserDao.deleteUser(id);

    if (result.n == 0) {
      throw new handleError(404, 'User not exsited');
    } else if (result.ok == 1) {
      return result;
    } else {
      throw new handleError(500, 'Delete error');
    }
  };

  static authenticate = async (body) => {
    const { id, password } = body;

    const user = await UserDao.getUserforAuth(id);

    const compareResult = await bcrypt.compareSync(password, user.password);

    if (compareResult === false) throw new handleError(401, 'Auth Error');

    //JWT 생성
    const accessToken = jwt.sign(
      { id: user.id, auth: user.isManager, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    //refresh 생성 및 저장
    const token = crypto.randomBytes(40).toString('hex');
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const refreshToken = await RefreshTokenDao.createRefreshToken(
      user,
      token,
      expires
    );
    //결과 반환

    return {
      id: user.id,
      name: user.name,
      auth: user.isManager,
      accessToken,
      refreshToken: refreshToken.token,
    };
  };
}
