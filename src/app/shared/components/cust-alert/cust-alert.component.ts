import { Component, Input, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'app/shared/functions/value.function';

const TEXT = 'text';
const MODAL = 'modal';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cust-alert',
  templateUrl: './cust-alert.component.html',
  styleUrls: ['./cust-alert.component.scss'],
})
export class CustAlertComponent implements OnInit {
  bindingType: string;
  alertText = false;
  alertmodal = false;
  bindingValue: string;
  @Input() set alertType(param: string) {
    this.bindingType = isNullOrUndefined(param) ? '' : param;
    switch (this.bindingType) {
      case TEXT:
        this.alertText = true;
        break;
      case MODAL:
        this.alertmodal = true;
        break;
    }
  }
  @Input() set value(param: string) {
    this.bindingValue = isNullOrUndefined(param) ? '' : param;
  }
  constructor() {}

  ngOnInit(): void {}
}
