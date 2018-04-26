import { Component, ViewChild } from '@angular/core';
import { UsersService } from './users.service';
import { Table } from '../../shared/classes/table';
import { User } from '../../shared/classes/user';
import { MatPaginator, MatSort, Sort } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends Table<User> {
  public displayedColumns = ['id', 'name', 'email', 'role', 'workplace', 'actions'];

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  constructor(
    private usersService: UsersService,
  ) {
    super(usersService);
  }

  ngAfterViewInit() { }

  sortData(sort: Sort) {
    // console.log(sort);
    const data = this.data.slice();
    if (!sort || !sort.active || sort.direction == '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'email': return this.compare(a.email.toLowerCase(), b.email.toLowerCase(), isAsc);
        case 'role': return this.compare(a.role.toLowerCase(), b.role.toLowerCase(), isAsc);
        default: return 0;
      }
    });

  }
}