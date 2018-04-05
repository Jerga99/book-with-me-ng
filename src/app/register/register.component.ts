import { Component, OnInit } from '@angular/core';
import { User, userFactory } from '../user/shared/user.model';
import { UserService } from '../user/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bwm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public user: User;
  public errors = [];

  constructor(private userService: UserService,
              private router: Router){}

  ngOnInit() {
    this.user = userFactory();
  }

  register() {
    this.userService.register(this.user).subscribe(
      (data) => {
        this.router.navigate(['/login', {registered: true}]);
      },
      (invalidResponse: any) => {
        this.errors = invalidResponse.error.errors;
      })
  }
}
