import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Menu } from '../../../shared/classes/menu';
import { Product } from '../../../shared/classes/product';

@Component({
  selector: 'app-step-1',
  templateUrl: './step-1.component.html',
  styleUrls: ['./step-1.component.css']
})
export class Step1Component implements OnInit {
  @Input() menu: Menu;
  principal: Product;
  acompanamientos: Product[] = [];
  @Output() select = new EventEmitter<{ principal: Product, acompanamientos: Product[] }>();
  doubleSide: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onDobleAcompanamiento() {
    if (this.doubleSide) {
      this.acompanamientos = [];
    }
  }

  onSelectAcompanamiento(acompanamiento: Product) {
    let position = -1, lastPos;
    if (this.doubleSide) {
      this.acompanamientos = [];
    } else {
      if (this.acompanamientos.length) {
        position = this.acompanamientos.findIndex(_acompanamiento => _acompanamiento.name == acompanamiento.name);
        lastPos = this.acompanamientos.length - 1;
      }
    }
    let action;
    if (position >= 0) {
      action = 'Removed ';
      this.acompanamientos.splice(position, 1);
    } else {
      if (this.acompanamientos.length < 2) {
        action = 'Added ';
        this.acompanamientos.push(acompanamiento);
        if (this.doubleSide) {
          this.acompanamientos.push(acompanamiento);
        }
      } else {
        action = 'Replaced ' + this.acompanamientos[lastPos].name + ' with ';
        this.acompanamientos[lastPos] = acompanamiento;
      }
    }

    // console.log(action + side.name);
    console.log('Selected order.sides : ', this.acompanamientos);
  }

}
