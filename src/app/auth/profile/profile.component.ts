import { Component, OnInit } from '@angular/core';
import { Link } from '../../shared/classes/link';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  links: Link[];
  constructor() { }

  ngOnInit() {
    this.links = [
      { label: 'Información de usuario', route: 'info', icon: 'book' }
    ];
  }

}