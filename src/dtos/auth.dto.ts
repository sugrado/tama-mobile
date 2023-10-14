export class LoginDto {
  private _username: string;
  private _password: string;
  constructor(username: string, password: string) {
    this._username = username;
    this._password = password;
  }
}

export class UserInfoDto {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  consentAccepted: boolean;
}
