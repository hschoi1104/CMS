import { UserDao } from './../dao/user.dao';
import { RefreshTokenDao } from './../dao/refreshToken.dao';
import { handleError } from './../model/Error';
import { TokenResponse } from './../model/TokenResponse';
import bcrypt from 'bcrypt';
import { JWT } from './../util/jwt';
export class UserService {
  //User
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

  //Auth
  static authenticate = async (body) => {
    const { id, password } = body;

    const user = await UserDao.getUserforAuth(id);

    if (user == null) {
      throw new handleError(404, 'User not exsited');
    }

    const compareResult = await bcrypt.compareSync(password, user.password);

    if (compareResult === false) {
      throw new handleError(401, 'Auth Error');
    }

    const accessToken = await JWT.generateAccessToken(user);

    const refreshToken = await RefreshTokenDao.createRefreshToken(user);

    return new TokenResponse(user, accessToken, refreshToken.token);
  };

  static refreshToken = async (body, cookies) => {
    const token = body.refreshToken || cookies.refreshToken;
    const refreshToken = await RefreshTokenDao.getRefreshToken(token);
    if (refreshToken == null || refreshToken == 'Invalid token') {
      throw new handleError(401, 'Auth Error');
    }
    console.log(token);
    const { user } = refreshToken;
    console.log(user);
    const newRefreshToken = await RefreshTokenDao.createRefreshToken(user);

    await RefreshTokenDao.updateRefreshToken(
      refreshToken.token,
      Date.now(),
      newRefreshToken.token
    );

    const accessToken = await JWT.generateAccessToken(user);

    return new TokenResponse(user, accessToken, newRefreshToken.token);
  };

  static revokeToken = async (body, cookies) => {
    const token = body.refreshToken || cookies.refreshToken;

    const result = await RefreshTokenDao.updateRefreshToken(
      token,
      Date.now(),
      null
    );
    if (result == null) {
      throw new handleError(401, 'Auth Error');
    }
  };
}
