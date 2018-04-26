import * as firebase from 'firebase';
import { Product } from "./product";
import { User } from "firebase";

export class Order {
  constructor(
    public id?: string,
    public products?: Product[],
    public tortillas?: number,
    public cost?: number,
    public status?: string,
    public user?: User,
    public date?: {
      for?: firebase.firestore.Timestamp,
      by?: firebase.firestore.Timestamp
    },
    public paid?: {
      flag: boolean,
      date: firebase.firestore.Timestamp
    },
  ) { }
}
