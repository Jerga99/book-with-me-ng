import { Component } from '@angular/core';
import { UserService } from '../../../user/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bwm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public auth: UserService,
              public router: Router) {}

  public logout(): void {
    this.auth.logout().subscribe(
      () => {
        this.router.navigate(['login']);
      })
  }

  public search(city: string): void {
    city ? this.router.navigate([`rentals/${city}/homes`]) : this.router.navigate(['rentals'])
  }
}
