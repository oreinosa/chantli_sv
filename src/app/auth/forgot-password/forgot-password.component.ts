import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string;
  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.auth.forgotPassword(this.email)
      .then(a => a ? this.router.navigate(['sign-in']) : false)
      .catch(e => console.log(e));
  }

}