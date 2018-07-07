import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { NotificationsService } from './notifications/notifications.service';
import { UpdateService } from './update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  appTitle = 'Chantli SV';

  constructor(
    private router: Router,
    private auth: AuthService,
    private notifications: NotificationsService,
    private updateService: UpdateService
  ) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    });
  }

}
