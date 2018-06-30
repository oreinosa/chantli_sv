import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntil, tap, switchMap, map, share } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from './order.service';
import { Menu } from './../shared/classes/menu';
import { Component, OnInit } from '@angular/core';
import { DOW } from '../shared/classes/daysOfTheWeek';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  menus: Menu[];
  selectedMenus: Menu[];
  DOW: string[];
  dow: number;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
    map(result => result.matches),
    share()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
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
      // tap(menus => console.log(menus)),
      tap(menus => this.menus = menus),
    )
      .subscribe(data => {
        const date = new Date();
        this.dow = date.getDay();
        this.selectedMenus = this.menus.filter(menu => menu.date.toDate().getDay() === this.dow);
      });
  }

  onSelectDay(dow: number) {
    this.dow = dow;
    this.selectedMenus = this.menus.filter(menu => menu.date.toDate().getDay() === this.dow);
  }

  onOrderMenu(menu: Menu) {
    this.orderService.selectMenu(menu);
    const day = this.DOW[this.dow - 1];
    this.router.navigate(['menu', 'nueva-orden', menu.id, 'paso', 1]);
  }
}
