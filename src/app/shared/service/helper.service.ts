import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class HelperService {

  rentalType(isShared) {
    return isShared ? 'shared' : 'whole';
  }

  getRangeOfDates(start_at, end_at) {
    let start = new Date(start_at);
    const end = new Date(end_at);
    const dateArr = [];

    while(start < end){
     dateArr.push(moment(start).format('Y-MM-DD'));
     const newDate = start.setDate(start.getDate() + 1);
     start = new Date(newDate);
    }

    return dateArr;
  }
}
