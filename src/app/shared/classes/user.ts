import { Workplace } from "./workplace";

export interface User {
  id?: string;
  name?: string;
  email?: string;
  photoURL?: string;
  role?: string;
  workplace?: string,
  debit?: number;
  credit?: number;
  fcmTokens?: { [token: string]: true };
}
export class User {
  constructor(
    public id?: string,
    public name?: string,
    public email?: string,
    public photoURL?: string,
    public role?: string,
    public workplace?: string,
    public debit?: number,
    public credit?: number,
    public fcmTokens?: { [token: string]: true }
  ) { }
}