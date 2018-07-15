import { Component, Input, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { MapService } from './service/map.service';
import { AgmMap } from '@agm/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  public isPositionFound: boolean = false;
  public isMapLoaded: boolean = false;

  public lat: number = 0;
  public lng: number = 0;
  public chosenLocation: String;

  @Input() location: string;
  @Input() locationObservable: Subject<any>;


  @ViewChild(AgmMap)
  set mapReady(directive: AgmMap) {
    directive.mapReady.subscribe((data) => {
      if (this.location) {
        this.getPosition(this.location);
      }
    })
  };

  constructor(public mapService: MapService) {}

  ngOnInit() {
    if (this.locationObservable) {
        this.locationObservable.subscribe((location) => {
        this.getPosition(location);
      })
    }
  }

  ngOnDestroy() {
    if (this.locationObservable) {
      this.locationObservable.unsubscribe();
    }
  }

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
