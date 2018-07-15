import { Component, Input, Output, EventEmitter, OnChanges, ViewEncapsulation } from '@angular/core';

@Component({

})
export class EditableComponent implements OnChanges {

  @Input() public entity: any;

  @Input() public style: any;

  @Input() public className: any;

  @Output() public entityUpdated = new EventEmitter();

  @Input()
  public set field(entityField: string) {
    this.entityField = entityField;
    this.setEntityOriginValue();
  }

  public isActiveInput = false;

  public originEntityValue: any;

  public entityField: string;

  public ngOnChanges() {
    this.setEntityOriginValue();
    this.isActiveInput = false;
  }

  public updateEntity(): void {
    if (this.entity[this.entityField] !== this.originEntityValue) {
      this.entityUpdated.emit({[this.entityField]: this.entity[this.entityField]});
      this.setEntityOriginValue();
    }

    this.isActiveInput = false;
  }

  public cancelUpdate(): void {
    this.isActiveInput = false;
    this.entity[this.entityField] = this.originEntityValue;
  }

  public setEntityOriginValue(): void {
    this.originEntityValue = this.entity[this.entityField];
  }
}
