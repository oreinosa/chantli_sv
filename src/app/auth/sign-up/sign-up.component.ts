import { Component, OnInit } from '@angular/core';
import { SignUp } from '../../shared/classes/sign-up';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUp: SignUp;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signUp = new SignUp();
  }

  onSubmit(signUp: SignUp) {
    console.log(signUp);
    this.authService
      .signUp(signUp)
      .then(f => f ? this.router.navigate(['home']) : false);
  }


}
