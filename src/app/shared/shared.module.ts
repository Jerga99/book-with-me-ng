import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelperService } from '../shared/service/helper.service';
import { NgPipesModule } from 'ngx-pipes';
import { CamelizePipe } from 'ngx-pipes';

@NgModule({
  exports: [
    CommonModule,
    NgPipesModule
  ],
  providers: [HelperService, CamelizePipe]
})
export class SharedModule {}
