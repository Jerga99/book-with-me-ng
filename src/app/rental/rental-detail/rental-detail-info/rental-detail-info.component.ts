import { Component, OnInit, Input } from '@angular/core';
import { Rental } from '../../shared/rental.model';
import { HelperService } from '../../../shared/service/helper.service';

@Component({
  selector: 'bwm-rental-detail-info',
  templateUrl: './rental-detail-info.component.html',
  styleUrls: ['./rental-detail-info.component.scss']
})
export class RentalDetailInfoComponent {

  @Input() public rental: Rental;

  constructor(public helper: HelperService) {}
}
