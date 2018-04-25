import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Link } from '../../shared/classes/link';
import { User } from '../../shared/classes/user';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() links: Link[];
  @Input() actions: Link[];
  @Input() user: User;
  @Output() navigated = new EventEmitter();
  @Output('signedOut') signOut = new EventEmitter();
  categoriesLinkFlag: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
