import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputSwitchConfigModel } from 'app/shared/models/system_model/cust_component_model';
import { isNullOrUndefined } from 'util';
import { CustBaseComponent } from '../cust-base/cust-base';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cust-input-switch',
  templateUrl: './cust-input-switch.component.html',
  styleUrls: ['./cust-input-switch.component.scss'],
})
export class CustInputSwitchComponent
  extends CustBaseComponent
  implements OnInit
{
  bindingInputId: any;
  bindingModel: boolean;
  bindingReadonly: string;
  bindingConfig: InputSwitchConfigModel;

  @Output() CustModelChange = new EventEmitter<boolean>();

  get CustModel(): boolean {
    return this.bindingModel;
  }

  @Input() set CustModel(param: boolean) {
    this.bindingModel = param;
  }

  @Input() set readonly(param: string) {
    this.bindingReadonly = param;
  }

  ngOnInit(): void {}
}
