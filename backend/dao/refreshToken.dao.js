import RefreshToken from '../model/RefreshToken';

export class RefreshTokenDao {
  static createRefreshToken = async (user, token, expires) => {
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
