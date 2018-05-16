import { User } from './user';

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
      for?: any,
      by?: any
    },
    public paid?: any
  ) { }
}
