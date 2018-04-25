import { Component, ViewChild } from '@angular/core';
import { UsersService } from './users.service';
import { Table } from '../../shared/classes/table';
import { User } from '../../shared/classes/user';
import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends Table<User> {
  public displayedColumns = ['id','name', 'email', 'role', 'workplace', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private usersService: UsersService,
  ) {
    super(usersService);
  }
}