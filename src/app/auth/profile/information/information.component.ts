import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/classes/user';
import { AuthService } from '../../../auth/auth.service';
import { Observable } from 'rxjs';
import { Workplace } from '../../../shared/classes/workplace';
import { WorkplacesService } from '../../../admin/workplaces/workplaces.service';
import { NotificationsService } from '../../../notifications/notifications.service';
@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  user: Observable<User>;
  workplace: string;
  workplaces: Observable<Workplace[]>;
  constructor(
    private authService: AuthService,
    private workplacesService: WorkplacesService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.user = this.authService.user;
    this.workplaces = this.workplacesService.getAll();
  }

  onUpdateWorkplace(workplace: string, user: User) {
    this.authService.updateWorkplace(workplace, user)
      .then(() => this.notificationsService.show('Lugar de trabajo actualizado!', 'Perfil', 'success'));
  }

}