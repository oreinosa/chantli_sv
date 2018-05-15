import { MenusService } from './../../admin/menus/menus.service';
import { Product } from './../classes/product';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getMenuProducts'
})
export class GetMenuProductsPipe implements PipeTransform {
  constructor(private menusService: MenusService) { }

  transform(id: string): Observable<Product[]> {
    return this.menusService.getSubcollection(id);
  }

}
