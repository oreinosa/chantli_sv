import { Component, ViewChild } from '@angular/core';
import { UsersService } from './users.service';
import { Table } from '../../shared/classes/table';
import { User } from '../../shared/classes/user';
import { MatPaginator, MatSort, Sort } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css', '../admin-table.css']
})
export class UsersComponent extends Table<User> {
  public displayedColumns = ['id', 'name', 'email', 'role', 'workplace', 'actions'];

  constructor(
    public usersService: UsersService,
  ) {
    super(usersService);
  }

  ngAfterViewInit() { }

  sortData() {
    // console.log(sort);
    const data = this.data.slice();
    if (!this.sort || !this.sort.active || this.sort.direction == '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      let isAsc = this.sort.direction == 'asc';
      switch (this.sort.active) {
        case 'name': return this.compare(a.name.toLowerCase(), b.name.toLowerCase(), isAsc);
        case 'email': return this.compare(a.email.toLowerCase(), b.email.toLowerCase(), isAsc);
        case 'role': return this.compare(a.role.toLowerCase(), b.role.toLowerCase(), isAsc);
        default: return 0;
      }
    });

  }
}