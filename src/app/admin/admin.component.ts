import { Component, OnInit } from '@angular/core';
import { Link } from '../shared/classes/link';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  links: Link[];
  constructor(
  ) { }

  ngOnInit() {
    this.links = [
      { label: 'Usuarios', route: 'usuarios', icon: 'people' },
      { label: 'Categorías', route: 'categorias', icon: 'assignment' },
      { label: 'Lugares de trabajo', route: 'lugares-de-trabajo', icon: '' },
      { label: 'Productos', route: 'productos', icon: '' },
      { label: 'Menus', route: 'menus', icon: '' },
    ];

  }



}