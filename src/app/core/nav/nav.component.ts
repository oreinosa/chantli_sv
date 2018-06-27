import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { Link } from '../../shared/classes/link';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  user: any;
  links: Link[];
  actions: Link[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AuthService
  ) {
    this.auth.user
      .subscribe(user => {
        console.log(user);
        let links: Link[] = [], actions: Link[] = [];

        links.push(
          { route: 'menu', label: 'Menu', icon: 'restaurant' },
        );

        if (user) {
          switch (user.role) {
            case 'Admin':
              actions.push(
                { route: 'admin', label: 'Admin', icon: 'build' },
              );
            case 'Cliente':
              actions.push(
                { route: 'mis-pedidos', label: 'Mis pedidos', icon: 'shopping_cart' },
              );
            default:
              actions.push(
                { route: 'perfil', label: 'Perfil', icon: 'person' },
              );
          }
        } else {
          actions.push(
            { route: 'ingresar', label: 'Ingresar', icon: 'person' },
            { route: 'registrarse', label: 'Registrarse', icon: 'person_add' },
          );
        }

        this.links = links;
        this.actions = actions;
        this.user = user;
      });
  }

  signOut() {
    this.auth.signOut();
  }

}
