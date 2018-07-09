import { Component, OnInit } from '@angular/core';
import { SignUp } from '../../shared/classes/sign-up';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { WorkplacesService } from '../../admin/workplaces/workplaces.service';
import { Workplace } from '../../shared/classes/workplace';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { NotificationsService } from '../../notifications/notifications.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUp: SignUp;
  workplaces: Observable<Workplace[]>;
  constructor(
    private workplacesService: WorkplacesService,
    private authService: AuthService,
    private router: Router,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.workplaces = this.workplacesService.getAll();
    this.initForm();
  }

  initForm() {
    this.signUp = new SignUp();
  }

  onSubmit(form: NgForm) {
    const signUp = form.value;
    this.authService
      .signUp(signUp)
      .then(
        a => {
          console.log(a);
          this.notificationsService.show(`Bienvenido, ${signUp.name}`, 'Autenticación', 'success');
          this.router.navigate(['menu']);
        },
        e => {
          console.log(e);
          this.notificationsService.show('Correo electrónico ya esta en uso', 'Error', 'danger');
          form.resetForm();
        })
    // .catch();
  }


}
