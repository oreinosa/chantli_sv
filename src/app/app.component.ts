import { Component, OnInit } from '@angular/core';
import { Link } from './shared/classes/link';
import { User } from './shared/classes/user';
import { Category } from './shared/classes/category';
import { AuthService } from './auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
// import { Subject } from 'rxjs/Subject';
import { CategoriesService } from './admin/categories/categories.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // private ngUnsubscribe = new Subject();
  appTitle = 'Chantli SV';
  links: Link[];
  actions: Link[];
  user: User;
  refresh: boolean;

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

    this.auth
      .user
      // .takeUntil(this.ngUnsubscribe)
      .do(data => {
        // console.log('User : ', data)
        let role: string = '';
        if (data) {
          role = data.role;
        }
        this.auth.setRouting(role);
      })
      .subscribe(user => this.user = user);

    this.auth
      .actionsSubject
      // .takeUntil(this.ngUnsubscribe)
      .subscribe(actions => this.actions = actions);

    this.auth
      .linksSubject
      // .takeUntil(this.ngUnsubscribe)
      .subscribe(links => this.links = links);
  }

  // ngOnDestroy() {
  //   this.ngUnsubscribe.next();
  //   this.ngUnsubscribe.complete();
  // }

  onSignOut() {
    this.auth.signOut();
  }

}
