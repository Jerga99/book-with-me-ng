import { Component, OnInit, Input } from '@angular/core';
import { Rental } from '../shared/rental.model';
import { HelperService } from '../../shared/service/helper.service';

@Component({
  selector: 'bwm-rental-list-detail',
  templateUrl: './rental-list-detail.component.html',
  styleUrls: ['rental-list-detail.component.scss']
})
export class RentalListDetailComponent {
  @Input() rental: Rental;

  constructor(public helper: HelperService){}
}
