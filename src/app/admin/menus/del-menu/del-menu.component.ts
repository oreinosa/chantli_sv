import { NotificationsService } from './../../../notifications/notifications.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MenusService } from './../menus.service';
import { Menu } from './../../../shared/classes/menu';
import { Delete } from './../../../shared/classes/delete';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-del-menu',
  templateUrl: './del-menu.component.html',
  styleUrls: ['./del-menu.component.css']
})
export class DelMenuComponent extends Delete<Menu> {
  constructor(
    public menusService: MenusService,
    public router: Router,
    public route: ActivatedRoute,
    public notificationsService: NotificationsService
  ) {
    super(menusService, router, route, notificationsService);
  }

}
