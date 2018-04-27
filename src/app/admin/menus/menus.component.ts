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
  public displayedColumns = ['name', 'description', 'actions'];

  constructor(
    private menusService: MenusService,
  ) {
    super(menusService);
  }

}
