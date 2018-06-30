import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/shared/classes/order';

@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.component.html',
  styleUrls: ['./orders-overview.component.css']
})
export class OrdersOverviewComponent implements OnInit {
  @Input() orders: Order[];

  

  constructor() { }

  ngOnInit() {
    this.generateOverview();
  }

  generateOverview(){

  }



}
