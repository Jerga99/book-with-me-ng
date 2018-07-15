import { Component, Input, Output, EventEmitter, OnChanges, ViewEncapsulation } from '@angular/core';
import { EditableComponent } from '../editable.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'bwm-editable-input',
  templateUrl: 'editable-input.component.html'
})
export class EditableInputComponent extends EditableComponent implements OnChanges {

  @Input() public type = 'text';
}
