import { Component, OnInit } from '@angular/core';
import { SignIn } from '../../shared/classes/sign-in';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
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

  onSubmit(signIn: SignIn) {
    console.log(signIn);
    this.authService
    .signInEmail(signIn)
    .then(f => f ? this.router.navigate(['home']) : false);
  }

  onSignInSocial(provider: string){
    this.authService
    .signInSocial(provider)
    .then(f => f ? this.router.navigate(['home']) : false);
  }

}
