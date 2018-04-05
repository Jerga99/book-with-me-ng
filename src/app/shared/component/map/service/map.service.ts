import { Injectable } from '@angular/core';
import { CamelizePipe } from 'ngx-pipes';

// interface Window {
//    google: any
// }

// declare const window: Window;

@Injectable()
export class MapService {
  private geoCoder: any;
  private positionCache: any = {};

  constructor(private camelizePipe: CamelizePipe ) {}

  private geoCodeAddress(address: string): Promise<any> {
    let position: any = {};

    return new Promise((resolve, reject) => {
      this.geoCoder.geocode({address}, (result, status) => {
        if (status === (<any>window).google.maps.GeocoderStatus.OK) {
          const geometry = result[0].geometry.location;
          position = { lat: geometry.lat(), lng: geometry.lng() };
          this.cacheAddress(address, position);
          return resolve(position);
        } else {

          return reject("Not found");
        }
      });
    });
  }

  private isAddressCached(cacheKey) {
    return this.positionCache[cacheKey];
  }

  private camelize(address: string) {
    return this.camelizePipe.transform(address);
  }

  private cacheAddress(address: string, position: any) {
    this.positionCache[this.camelize(address)] = position;
  }

  public getLatLng(address: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.geoCoder = new (<any>window).google.maps.Geocoder();
      const cacheKey = this.camelize(address);

      if (this.isAddressCached(cacheKey)) return resolve(this.positionCache[cacheKey]);

      this.geoCodeAddress(address).then((position: any) => {
        return resolve(position);
      }).catch(err => reject(err));
    })
  }
}
