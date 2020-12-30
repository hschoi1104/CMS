class TokenResponse {
  constructor(user, accessToken, refreshToken) {
    this.id = user.id;
    this.name = user.name;
    this.auth = user.isManager;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
module.exports = { TokenResponse };
