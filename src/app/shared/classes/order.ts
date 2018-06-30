import { User } from './user';
import * as firebase from 'firebase';

export class Order {
  constructor(
    public id?: string,
    public products?: {
      principal: string,
      acompanamientos: string[],
      bebida: string
    },
    public tortillas?: number,
    public price?: number,
    public status?: string,
    public user?: User,
    public date?: {
      for?: firebase.firestore.Timestamp,
      by?: firebase.firestore.Timestamp
    },
    public paid?: {
      by: firebase.firestore.Timestamp,
      flag: false
    }
  ) { }
}
