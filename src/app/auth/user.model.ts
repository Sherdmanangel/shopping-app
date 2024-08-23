export class User {
  constructor(
    public username: string,
    private _jwt: string,
    private _jwtExpirationDate: Date
  ) {}

  get jwt() {
    if (!this._jwtExpirationDate || new Date() > this._jwtExpirationDate) {
      return null;
    }
    return this._jwt;
  }
}
