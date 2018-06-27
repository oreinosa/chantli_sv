import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Link } from '../shared/classes/link';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, share } from 'rxjs/operators';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  links: Link[];
  menuExtended: boolean = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Medium)
    .pipe(
      map(result => result.matches),
      share()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit() {
    this.links = [
      { label: 'Usuarios', route: 'usuarios', icon: 'people' },
      { label: 'Categorías', route: 'categorias', icon: 'assignment' },
      { label: 'Lugares de trabajo', route: 'lugares-de-trabajo', icon: 'business' },
      { label: 'Productos', route: 'productos', icon: 'fastfood' },
      { label: 'Menus', route: 'menus', icon: 'restaurant_menu' },
    ];

  }



}