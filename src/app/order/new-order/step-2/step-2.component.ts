import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../../../shared/classes/menu';

@Component({
  selector: 'app-step-2',
  templateUrl: './step-2.component.html',
  styleUrls: ['./step-2.component.css']
})
export class Step2Component implements OnInit {
  @Input() menu: Menu;
  constructor() { }

  ngOnInit() {
  }

}
