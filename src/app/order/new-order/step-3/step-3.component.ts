import { fadeIn } from './../../../shared/animations';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OrderService } from '../../order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/classes/product';
import { Menu } from '../../../shared/classes/menu';

@Component({
  selector: 'app-step-3',
  templateUrl: './step-3.component.html',
  styleUrls: ['./step-3.component.css'],
  animations: [fadeIn]
})
export class Step3Component implements OnInit {
  @Input() editing: boolean = false;
  @Input() previousPrice: number;
  @Input() paid: boolean;

  @Output() confirm = new EventEmitter<{ tortillas: number, total: number }>();
  @Input() menu: Menu;
  @Input() principal: Product;
  @Input() acompanamientos: Product[];
  @Input() bebida: Product;
  tortillas: number = 2;
  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  onBack(step: number) {
    this.router.navigate(['../', step], { relativeTo: this.route });
  }

  onConfirm(total: number) {
    this.confirm.emit({
      total: total,
      tortillas: this.tortillas
    });
    this.onBack(4);
  }

}
