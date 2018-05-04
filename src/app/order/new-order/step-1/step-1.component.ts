import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Menu } from '../../../shared/classes/menu';
import { Product } from '../../../shared/classes/product';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { fadeIn } from '../../../shared/animations';

@Component({
  selector: 'app-step-1',
  templateUrl: './step-1.component.html',
  styleUrls: ['./step-1.component.css'],
  animations: [fadeIn]
})
export class Step1Component implements OnInit {
  @Input() menu: Menu;
  @Output() select = new EventEmitter<{ principal: Product, acompanamientos?: Product[] }>();
  @Input() principal: Product;
  @Input() acompanamientos: Product[];
  refresh: boolean;

  // doubleFlag: boolean = false;
  doubleFlag: FormControl = new FormControl(false);
  // noSides: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.menu) {
      let acompanamientos = this.menu.products.filter(product => product.category === "Acompañamiento");
      if (!acompanamientos.length) {
        this.doubleFlag.disable();
      }
    }
  }

  // onSelectPrincipal(principal: Product) {
  //   this.principal = principal;
  //   if(principal.noSides){
  //     this.nosi
  //   }
  // }

  onDoubleAcompanamiento() {
    if (this.doubleFlag.value) {
      this.acompanamientos = [];
    }
  }

  onSelectAcompanamiento(acompanamiento: Product) {
    let position = -1, lastPos;
    if (this.doubleFlag.value) {
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
        if (this.doubleFlag.value) {
          this.acompanamientos.push(acompanamiento);
        }
      } else {
        action = 'Replaced ' + this.acompanamientos[lastPos].name + ' with ';
        this.acompanamientos[lastPos] = acompanamiento;
      }
    }

    // console.log(action + side.name);
    this.refresh = !this.refresh;
    console.log('Selected order.sides : ', this.acompanamientos);
  }

  onCancel() {
    this.router.navigate(['menu']);
  }

  onSelect() {
    this.select.emit({ principal: this.principal, acompanamientos: this.acompanamientos });
  }

}
