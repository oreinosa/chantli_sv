import { Component, OnInit } from '@angular/core';
import { Table } from '../../shared/classes/table';
import { Menu } from '../../shared/classes/menu';
import { MenusService } from './menus.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent extends Table<Menu>  {
  public displayedColumns = ['date', 'products', 'price', 'actions'];

  constructor(
    public menusService: MenusService,
  ) {
    super(menusService);
  }

  toggleMenuAvailability(id: string, flag: boolean) {
    return this.menusService.toggleMenuAvailability(id, flag);
  }

}
