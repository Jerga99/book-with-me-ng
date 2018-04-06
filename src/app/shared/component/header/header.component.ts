import { Component } from '@angular/core';
import { UserService } from '../../../user/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bwm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private auth: UserService,
              private router: Router) {}

  public logout(): void {
    this.auth.logout().subscribe(
      () => {
        this.router.navigate(['login']);
      })
  }
}
