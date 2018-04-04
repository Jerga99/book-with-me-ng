import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  rentalType(isShared) {
    return isShared ? 'shared' : 'whole';
  }
}
