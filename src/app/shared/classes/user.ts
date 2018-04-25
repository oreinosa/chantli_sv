import { Workplace } from "./workplace";

export interface User {
  id?: string;
  name?: string;
  email?: string;
  photoURL?: string;
  role?: string;
  workplace?: string
}
export class User {
  constructor(
    public id?: string,
    public name?: string,
    public email?: string,
    public photoURL?: string,
    public role?: string,
    public workplace?: string
  ) { }
}