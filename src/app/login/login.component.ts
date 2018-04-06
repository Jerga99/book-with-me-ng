import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginData } from '../user/shared/user.service';

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

  public isRegistered: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private auth: UserService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['registered']) {
        this.isRegistered = params['registered'];
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
