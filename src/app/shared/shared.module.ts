import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelperService } from '../shared/service/helper.service';
import { NgPipesModule } from 'ngx-pipes';
import { CamelizePipe } from 'ngx-pipes';
import { FormsModule } from '@angular/forms';

@NgModule({
  exports: [
    CommonModule,
    NgPipesModule,
    FormsModule
  ],
  providers: [HelperService, CamelizePipe]
})
export class SharedModule {}
