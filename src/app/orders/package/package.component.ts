import { Order } from './../../shared/classes/order';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  @Input() dataSource: Order[];

  public displayedColumns = ['user', 'principal', 'acompanamientos', 'bebida', "date", 'actions'];

  constructor() {

  }

  ngOnInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

  // ngOnDestroy() {
  //   this.ngUnsubscribe.next();
  //   this.ngUnsubscribe.complete();
  // }

}
