import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginData } from '../user/shared/user.service';
import { MESSAGES } from '../shared/message-types';

@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public loginData: LoginData = {
    email: '',
    password: ''
  }

  public errors: any = [];

  public notifyMessage: string = "";

  constructor(private route: ActivatedRoute,
              private router: Router,
              private auth: UserService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['M']) {
        this.notifyMessage = MESSAGES[params['M']];
      }
    });
  }

  login(data) {
    this.auth.login(this.loginData).subscribe((data) => {
      this.router.navigate(['/']);
    }, (invalidResponse: any) => {
      this.errors = invalidResponse.error.errors;
    })
  }



}
