import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OrdersService } from './../../orders.service';
import { Order } from './../../../shared/classes/order';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.component.html',
  styleUrls: ['./orders-overview.component.css']
})
export class OrdersOverviewComponent implements OnInit {
  private ngUnsubscribe = new Subject();

  @Input() daily: boolean;

  orders: Order[];
  principales: string[] = [];
  acompanamientos: string[] = [];
  bebidas: string[] = [];
  tortillas: number = 0;

  $loading: boolean = true;
  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.ordersService
      .filteredOrders
      .pipe(
      takeUntil(this.ngUnsubscribe),
      tap(orders => {
        this.tortillas = 0;
        this.principales = [];
        this.acompanamientos = [];
        this.bebidas = [];

        if (this.daily) {
          this.$loading = true;
          this.orders = orders;
          // console.log(orders);
          this.generateOverview();
        } else {
          this.orders = [];
 
        }

      }),
    )
      .subscribe(orders => this.$loading = false);
  }

  generateOverview(): void {
    if (this.orders) {
      if (this.orders.length) {

        let products, bebida, bebidaFlag, principal, principalFlag, acompanamientos, acompanamientosFlag;
        for (let order of this.orders) {
          // TORTILLAS SUM  
          this.tortillas += order.tortillas;

          // PRINCIPALES, BEBIDA, AND ACOMPANAMIENTOS LABELS
          products = order.products;
          principal = products.principal as string;

          principalFlag = this.principales.indexOf(principal) < 0;
          if (principalFlag) {
            this.principales.push(principal);
          }

          bebida = products.bebida as string;
          if (bebida) {
            bebidaFlag = this.bebidas.indexOf(bebida) < 0;
            if (bebidaFlag) {
              this.bebidas.push(bebida);
            }
          }

          acompanamientos = products.acompanamientos as string[];
          if (acompanamientos) {
            for (let ac of acompanamientos) {
              acompanamientosFlag = this.acompanamientos.indexOf(ac) < 0;
              if (acompanamientosFlag) {
                this.acompanamientos.push(ac);
              }
            }
          }
        }
      }
    }
  }



}