import { Component, OnInit } from '@angular/core';
import { Delete } from '../../../shared/classes/delete';
import { Product } from '../../../shared/classes/product';
import { ProductsService } from '../products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../../../notifications/notifications.service';

@Component({
  selector: 'app-del-product',
  templateUrl: './del-product.component.html',
  styleUrls: ['./del-product.component.css']
})
export class DelProductComponent extends Delete<Product> {
  constructor(
    public productsService: ProductsService,
    public router: Router,
    public route: ActivatedRoute,
    public notificationsService: NotificationsService
  ) {
    super(productsService, router, route, notificationsService);
  }
}
