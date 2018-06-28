import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';

import { UsersComponent } from './users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DelUserComponent } from './del-user/del-user.component';
import { UsersService } from 'src/app/admin/users/users.service';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
    DelUserComponent,
  ],
  providers: [UsersService]
})
export class UsersModule { }
