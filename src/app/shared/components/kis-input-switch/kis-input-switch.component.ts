import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { KisBaseComponent } from '../cust-base/cust-base';
import { InputSwitchConfigModel } from './../../models/system_model/kis_component_model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cust-input-switch',
  templateUrl: './cust-input-switch.component.html',
  styleUrls: ['./cust-input-switch.component.scss'],
})
export class KisInputSwitchComponent
  extends KisBaseComponent
  implements OnInit
{
  bindingInputId: any;
  bindingModel: boolean;
  bindingReadonly: string;
  bindingConfig: InputSwitchConfigModel;

  @Output() kisModelChange = new EventEmitter<boolean>();

  get kisModel(): boolean {
    return this.bindingModel;
  }

  @Input() set kisModel(param: boolean) {
    this.bindingModel = param;
  }

  @Input() set readonly(param: string) {
    this.bindingReadonly = param;
  }

  ngOnInit(): void {}
}
