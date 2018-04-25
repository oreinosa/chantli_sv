import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Link } from '../../shared/classes/link';
import { User } from '../../shared/classes/user';
// import { Category } from '../../shared/classes/category';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() appTitle: string = 'App Title';
  @Input() links: Link[];
  @Input() actions: Link[];
  @Input() user: User;
  @Output() opened = new EventEmitter();
  @Output('signedOut') signOut = new EventEmitter();

  constructor() { }

  ngOnInit() {
    // console.log(this.categoryLinks);
    // this.categories.forEach(category => this.links.push({label : category.name, route: category.name.toLowerCase()}))
  }
}
