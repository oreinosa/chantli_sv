import { Router, ActivatedRoute } from '@angular/router';
import { MenusService } from './../menus.service';
import { Menu } from './../../../shared/classes/menu';
import { Component } from '@angular/core';
import { Product } from '../../../shared/classes/product';
import { DeleteSubcollection } from '../../../shared/classes/delete-subcollection';

@Component({
  selector: 'app-del-menu',
  templateUrl: './del-menu.component.html',
  styleUrls: ['./del-menu.component.css']
})
export class DelMenuComponent extends DeleteSubcollection<Menu, Product> {
  constructor(
    public menusService: MenusService,
    public router: Router,
    public route: ActivatedRoute,
  ) {
    super(menusService, router, route);
  }

}
