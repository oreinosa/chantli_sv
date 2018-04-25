export interface SignIn {
  email?: string;
  password?: string;
  rememberMe?: boolean;
}

export class SignIn {
  constructor(
    public email?: string,
    public password?: string,
    public rememberMe?: boolean,
  ) { }
}
