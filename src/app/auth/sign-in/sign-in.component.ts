import { Component, OnInit } from '@angular/core';
import { SignIn } from '../../shared/classes/sign-in';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NotificationsService } from '../../notifications/notifications.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signIn: SignIn;
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signIn = new SignIn();
  }

  onSubmit(form: NgForm) {
    const signIn = form.value;
    console.log(signIn);
    this.authService
      .signInEmail(signIn)
      .then(credential => {
        this.notificationsService.show(`Hola, ${credential.user.displayName}`, 'Autenticación', 'info');
        this.router.navigate(['menu'])
      })
      .catch(() => {
        this.notificationsService.show('Correo electrónico o contraseaña incorrecta', 'Error', 'danger');
        form.resetForm();
      });
  }

  onSignInSocial(provider: string) {
    this.authService
      .signInSocial(provider)
      .then(credential => {
        this.notificationsService.show(`Hola, ${credential.displayName}`, 'Autenticación', 'info');
        this.router.navigate(['menu']);
      })
  }

}
