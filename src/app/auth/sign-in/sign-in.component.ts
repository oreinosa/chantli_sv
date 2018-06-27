import { Component, OnInit } from '@angular/core';
import { SignIn } from '../../shared/classes/sign-in';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signIn: SignIn;
  constructor(
    private authService: AuthService,
    private router: Router
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
      .then(() => { this.router.navigate(['menu']) })
      .catch(() => form.resetForm());
  }

  onSignInSocial(provider: string) {
    this.authService
      .signInSocial(provider)
      .then(() => this.router.navigate(['menu']))
  }

}
