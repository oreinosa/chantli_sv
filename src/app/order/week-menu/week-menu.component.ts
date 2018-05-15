import { Component, OnInit, ViewChildren } from '@angular/core';
// import { MenusService } from '../../admin/menus/menus.service';
import { Menu } from '../../shared/classes/menu';
import { Observable } from 'rxjs';
import { OrderService } from '../order.service';
import { Product } from '../../shared/classes/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-week-menu',
  templateUrl: './week-menu.component.html',
  styleUrls: ['./week-menu.component.css']
})
export class WeekMenuComponent implements OnInit {
  _menus: Observable<Menu[]>;
  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this._menus = this.orderService.getWeekMenus();
  }

  onSelectMenu(menu: Menu) {
    this.orderService.selectMenu(menu);
    this.router.navigate(['nueva-orden', menu.id, 1]);
  }

}
