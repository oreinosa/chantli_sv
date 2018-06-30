import { takeUntil } from 'rxjs/operators';
import { Unsubscribe } from './../../shared/classes/unsubscribe';
// import { OrdersService } from './../orders.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

interface Mode {
  icon: string;
  action: string;
}

@Component({
  selector: 'app-orders-mode',
  templateUrl: './orders-mode.component.html',
  styleUrls: ['./orders-mode.component.css']
})
export class OrdersModeComponent extends Unsubscribe implements OnInit {
  @Output() selectMode = new EventEmitter<string>();
  actionIndex: number = 0;
  actions: Mode[];

  constructor(
    // private ordersService: OrdersService
  ) { super() }

  ngOnInit() {
    this.actions = [
      { icon: 'assignment_late', action: 'empacar' },
      { icon: 'attach_money', action: 'pagar' },
      { icon: '', action: 'credito' },
    ];

    // this.ordersService.mode.pipe(
    //   takeUntil(this.ngUnsubscribe)
    // )
    //   .subscribe(mode => console.log(mode));
  }

}
