import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { MapComponent} from './map.component';
import { MapService } from './service/map.service';

import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
       apiKey: 'AIzaSyD45ayA4i3TfW0DPHfYPOIj-V1UxBC5bGA'
    }),
    SharedModule
  ],
  exports: [
    MapComponent,
  ],
  declarations: [
    MapComponent,
  ],
  providers: [MapService]
})
export class MapModule {}
