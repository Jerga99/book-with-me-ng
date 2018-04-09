import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelperService } from '../shared/service/helper.service';
import { NgPipesModule } from 'ngx-pipes';
import { CamelizePipe } from 'ngx-pipes';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user/shared/user.service';
import { DateFormatPipe } from './pipe/date-format.pipe';

@NgModule({
  imports: [],
  declarations: [DateFormatPipe],
  exports: [
    CommonModule,
    NgPipesModule,
    FormsModule,
    DateFormatPipe
  ],
  providers: [HelperService, CamelizePipe, UserService]
})
export class SharedModule {}
