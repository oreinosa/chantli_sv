import { takeUntil, tap, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from './order.service';
import { Menu } from './../shared/classes/menu';
import { Component, OnInit } from '@angular/core';
import { DOW } from '../shared/classes/daysOfTheWeek';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  menus: Menu[];
  selectedMenus: Menu[];
  DOW: string[];
  dow: number;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.DOW = DOW.map(dow => dow.toLowerCase()).filter(dow => !(dow == "domingo" || dow == "sábado"))
  }

  ngOnInit() {
    this.orderService
      .getWeekMenus().pipe(
      takeUntil(this.ngUnsubscribe),
      tap(menus => console.log(menus)),
      tap(menus => this.menus = menus),
      switchMap(() => this.route.paramMap),
      takeUntil(this.ngUnsubscribe),
    )
      .subscribe(data => {
        const day = data.get('day');
        console.log(day);
        switch (day) {
          case 'lunes':
            this.dow = 1;
            break;
          case 'martes':
            this.dow = 2;
            break;
          case 'miercoles':
          case 'miércoles':
            this.dow = 3;
            break;
          case 'jueves':
            this.dow = 4;
            break;
          case 'viernes':
            this.dow = 5;
            break;
        }
        this.selectedMenus = this.menus.filter(menu => menu.date.getDay() === this.dow);
      });
  }

  onOrderMenu(menu: Menu) {
    this.orderService.selectMenu(menu);
    this.router.navigate(['nueva-orden', menu.id, 'paso', 1]);
  }
}
