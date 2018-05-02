import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../../shared/classes/menu';

@Component({
  selector: 'app-day-menu',
  templateUrl: './day-menu.component.html',
  styleUrls: ['./day-menu.component.scss']
})
export class DayMenuComponent implements OnInit {
  @Input() menu: Menu;
  constructor() { }

  ngOnInit() {
  }

}
