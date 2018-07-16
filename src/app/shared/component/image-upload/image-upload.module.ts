import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageUploadComponent } from './image-upload.component';
import { HttpModule } from '@angular/http';

import { ImageService } from './image.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
  ],
  providers: [
    ImageService
  ],
  exports: [
    ImageUploadComponent
  ],
  declarations: [
    ImageUploadComponent
  ]
})
export class ImageUploadModule {}
