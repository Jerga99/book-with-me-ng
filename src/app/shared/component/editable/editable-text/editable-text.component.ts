import { Component, Input, Output, EventEmitter, OnChanges, ViewEncapsulation } from '@angular/core';
import { EditableComponent } from '../editable.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'bwm-editable-text',
  templateUrl: 'editable-text.component.html'
})
export class EditableTextComponent extends EditableComponent implements OnChanges {

}
