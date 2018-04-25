import { Component, OnInit } from '@angular/core';
import { SignUp } from '../../shared/classes/sign-up';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { WorkplacesService } from '../../admin/workplaces/workplaces.service';
import { Workplace } from '../../shared/classes/workplace';
import { Observable } from 'rxjs/Observable';
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
    private router: Router
  ) { }

  ngOnInit() {
    this.workplaces = this.workplacesService.getAll();
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
