import { Component, OnInit } from '@angular/core';
import { Table } from '../../shared/classes/table';
import { Menu } from '../../shared/classes/menu';
import { MenusService } from './menus.service';
import { takeUntil, tap, filter, map, switchMap, startWith } from 'rxjs/operators';
import { Router, ChildActivationEnd, ActivatedRoute, } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css', '../admin-table.css']
})
export class MenusComponent extends Table<Menu>  {
  public displayedColumns = ['date', 'products', 'price', 'actions'];

  constructor(
    public menusService: MenusService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(menusService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.dataSource.sort.active = 'date';
    this.dataSource.sort.direction = 'desc';
  }

  toggleMenuAvailability(id: string, flag: boolean) {
    return this.menusService.toggleMenuAvailability(id, flag);
  }

}
