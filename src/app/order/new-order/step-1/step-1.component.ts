import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../../../shared/classes/menu';

@Component({
  selector: 'app-step-1',
  templateUrl: './step-1.component.html',
  styleUrls: ['./step-1.component.css']
})
export class Step1Component implements OnInit {
  @Input() menu: Menu;
  constructor() { }

  ngOnInit() {
  }

}
