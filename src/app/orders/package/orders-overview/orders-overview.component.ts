import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OrdersService } from './../../orders.service';
import { Order } from './../../../shared/classes/order';
import { Component, OnInit, Input } from '@angular/core';

interface ProductCount {
  label?: string;
  count?: number;
}

@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.component.html',
  styleUrls: ['./orders-overview.component.css']
})
export class OrdersOverviewComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  orders: Order[];
  principales: ProductCount[] = [];
  acompanamientos: ProductCount[] = [];
  bebidas: ProductCount[] = [];
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
          this.$loading = true;
          this.tortillas = 0;
          this.principales = [];
          this.acompanamientos = [];
          this.bebidas = [];
          this.orders = orders;
          // console.log(orders);
          this.generateOverview();
        }),
    )
      .subscribe(orders => this.$loading = false);
  }

  generateOverview(): void {
    if (this.orders) {
      if (this.orders.length) {

        let products, bebida: string, principal: string, acompanamientos: string[], bebidaIndex: number, principalIndex: number, acompanamientosIndex: number;
        for (let order of this.orders) {
          // TORTILLAS SUM  
          this.tortillas += order.tortillas ? order.tortillas : 0;

          // PRINCIPALES, BEBIDA, AND ACOMPANAMIENTOS LABELS
          products = order.products;
          principal = products.principal as string;

          principalIndex = this.principales.findIndex((productCount: ProductCount) => productCount.label === principal);
          if (principalIndex < 0) {
            this.principales.push({
              label: principal,
              count: 1
            });
          } else {
            this.principales[principalIndex].count = ++this.principales[principalIndex].count;
          }

          bebida = products.bebida as string;
          bebidaIndex = this.bebidas.findIndex((productCount: ProductCount) => productCount.label === bebida);
          if (bebidaIndex < 0) {
            this.bebidas.push({
              label: bebida,
              count: 1
            });
          } else {
            this.bebidas[bebidaIndex].count = ++this.bebidas[bebidaIndex].count;
          }


          acompanamientos = products.acompanamientos as string[];
          if (acompanamientos) {
            for (let ac of acompanamientos) {
              acompanamientosIndex = this.acompanamientos.findIndex((productCount: ProductCount) => productCount.label === ac);
              if (acompanamientosIndex < 0) {
                this.acompanamientos.push({
                  label: ac,
                  count: 1
                });
              } else {
                this.acompanamientos[acompanamientosIndex].count = ++this.acompanamientos[acompanamientosIndex].count;
              }
            }
          }
        }
      }
    }
  }



}