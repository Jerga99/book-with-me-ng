import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelperService } from '../shared/service/helper.service';
import { NgPipesModule } from 'ngx-pipes';
import { CamelizePipe } from 'ngx-pipes';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user/shared/user.service';
import {ToastModule} from 'ng2-toastr/ng2-toastr';


@NgModule({
  imports: [],
  exports: [
    CommonModule,
    NgPipesModule,
    FormsModule
  ],
  providers: [HelperService, CamelizePipe, UserService]
})
export class SharedModule {}
