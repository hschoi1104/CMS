import RefreshToken from '../model/RefreshToken';

export class RefreshTokenDao {
  static createRefreshToken = async (user, token, expires) => {
    const refreshToken = new RefreshToken({
      user: user._id,
      token,
      expires,
    });
    return refreshToken.save();
  };
}
