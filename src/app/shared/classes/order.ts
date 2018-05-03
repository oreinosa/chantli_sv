import * as firebase from 'firebase';
import { Product } from "./product";
import { User } from "firebase";

export class Order {
  constructor(
    public id?: string,
    public products?: {
      principal: string,
      acompanamiento: string,
      bebida: string
    },
    public tortillas?: number,
    public price?: number,
    public status?: string,
    public user?: User,
    public date?: {
      for?: Date,
      by?: Date
    },
    public paid?: Date
  ) { }
}
