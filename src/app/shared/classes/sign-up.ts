export interface SignUp {
  name?: string;
  email?: string;
  password?: string;
}

export class SignUp {
  constructor(
    public name?: string,
    public email?: string,
    public password?: string,
  ) { }
}
