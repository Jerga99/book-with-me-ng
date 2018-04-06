import { Component } from '@angular/core';
import { UserService } from '../../../user/shared/user.service';

@Component({
  selector: 'bwm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private auth: UserService) {}
}
