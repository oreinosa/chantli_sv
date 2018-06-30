import { User } from './user';
import { Timestamp } from '@firebase/firestore-types';

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
      for?: Timestamp,
      by?: Timestamp
    },
    public paid?: any
  ) { }
}
