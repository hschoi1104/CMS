import RefreshToken from '../model/RefreshToken';
import crypto from 'crypto';
export class RefreshTokenDao {
  static createRefreshToken = async (user) => {
    const token = crypto.randomBytes(40).toString('hex');
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const refreshToken = new RefreshToken({
      user: user._id,
      token,
      expires,
    });
    return await refreshToken.save();
  };

  static getRefreshToken = async (token) => {
    return await RefreshToken.find({ token });
  };

  static updateRefreshToken = async (token, revoked, replacedToken) => {
    return await RefreshToken.findOneAndUpdate(
      {
        token,
      },
      {
        revoked,
        replacedToken,
      },
      { new: true }
    );
  };
}
