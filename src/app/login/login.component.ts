import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/shared/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public isRegistered: boolean = false;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['registered']) {
        this.isRegistered = params['registered'];
      }
    });
  }

}
