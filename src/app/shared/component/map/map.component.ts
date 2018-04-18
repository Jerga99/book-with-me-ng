import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MapService } from './service/map.service';
import { AgmMap } from '@agm/core';

@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  public isPositionFound: boolean = false;
  public isMapLoaded: boolean = false;

  public lat: number = 0;
  public lng: number = 0;

  @Input() location: string;

  @ViewChild(AgmMap)
  set mapReady(directive: AgmMap) {
    directive.mapReady.subscribe((data) => {
      if (this.location) {
        this.getPosition(this.location);
      }
    })
  };

  constructor(public mapService: MapService) {}

  private getPosition(location: string) {
    this.isMapLoaded = false;

    this.mapService.getLatLng(this.location).then(
       (position: any) => {
         this.lat = position.lat;
         this.lng = position.lng;
         this.isPositionFound = true;
         this.isMapLoaded = true;
      }).catch((err) => {
        this.isPositionFound = false;
        this.isMapLoaded = true;
      });
    }

}
