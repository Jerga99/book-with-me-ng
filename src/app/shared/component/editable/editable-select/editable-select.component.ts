import { Component, Input, Output, EventEmitter, OnChanges, ViewEncapsulation } from '@angular/core';
import { EditableComponent } from '../editable.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'bwm-editable-select',
  templateUrl: 'editable-select.component.html'
})
export class EditableSelectComponent extends EditableComponent implements OnChanges {

  @Input() public options = [];
}
