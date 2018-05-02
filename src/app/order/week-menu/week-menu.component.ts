import { Component, OnInit } from '@angular/core';
// import { MenusService } from '../../admin/menus/menus.service';
import { Menu } from '../../shared/classes/menu';
import { Observable } from 'rxjs/Observable';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-week-menu',
  templateUrl: './week-menu.component.html',
  styleUrls: ['./week-menu.component.css']
})
export class WeekMenuComponent implements OnInit {
  _menus: Observable<Menu[]>;
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this._menus = this.orderService.getWeekMenus().do(a => console.log(a));
  }

}
