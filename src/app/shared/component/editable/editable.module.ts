import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditableInputComponent } from './editable-input/editable-input.component';
import { EditableTextComponent } from './editable-text/editable-text.component';
import { EditableSelectComponent } from './editable-select/editable-select.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    EditableInputComponent,
    EditableTextComponent,
    EditableSelectComponent
  ],
  declarations: [
    EditableInputComponent,
    EditableTextComponent,
    EditableSelectComponent
  ]
})
export class EditableModule {}
