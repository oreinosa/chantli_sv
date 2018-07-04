import { Observable } from 'rxjs';
import { WorkplacesService } from 'src/app/admin/workplaces/workplaces.service';
import { UsersService } from 'src/app/admin/users/users.service';
import { Component } from '@angular/core';
import { User } from '../../../shared/classes/user';
import { Edit } from '../../../shared/classes/edit';
import { Router, ActivatedRoute } from '@angular/router';
import { Workplace } from '../../../shared/classes/workplace';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent extends Edit<User> {
  workplaces: Observable<Workplace[]>;

  constructor(
    public usersService: UsersService,
    public router: Router,
    public route: ActivatedRoute,
    private workplacesService: WorkplacesService,
  ) {
    super(usersService, router, route);
  }

  ngOnInit() {
    super.ngOnInit();
    this.workplaces = this.workplacesService.getAll();
  }
}