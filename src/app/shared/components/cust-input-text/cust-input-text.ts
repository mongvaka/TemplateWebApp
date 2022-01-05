import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { AppConst, ColumnType } from 'app/shared/constants';
import { isNullOrUndefined, Uuid } from 'app/shared/functions/value.function';
import {
  InputTextConfigModel,
  TranslateModel,
} from 'app/shared/models/system_model';
import { CustBaseComponent } from '../cust-base/cust-base';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cust-input-text',
  templateUrl: './cust-input-text.html',
  styleUrls: ['./cust-input-text.scss'],
})
export class CustInputTextComponent
  extends CustBaseComponent
  implements OnInit
{
  //#region variable
  bindingModel: string;
  bindingValidation: TranslateModel;
  bindingMaxlength: number;
  bindingConfig: InputTextConfigModel;
  bindingDisabled: boolean;
  //#endregion
  //#region input props
  @Input() set CustModel(param: string) {
    console.log(param);
    this.bindingModel = isNullOrUndefined(param) ? '' : param;
    this.validateModel(this.bindingModel, this.bindingValidation);
  }
  get CustModel(): string {
    return this.bindingModel;
  }
  @Input() set CustValidation(param: TranslateModel) {
    this.bindingValidation = param;
    this.validationNotification(param);
  }
  @Input() set maxlength(param: number) {
    this.bindingMaxlength = isNullOrUndefined(param)
      ? this.bindingConfig.maxlength
      : param;
  }
  @Input() set CustConfig(param: InputTextConfigModel) {
    this.bindingConfig = isNullOrUndefined(param)
      ? new InputTextConfigModel()
      : param;
    this.bindingInputId = isNullOrUndefined(this.bindingInputId)
      ? Uuid.newUuid()
      : this.bindingInputId;
    this.bindingMaxlength = isNullOrUndefined(this.bindingMaxlength)
      ? param.maxlength
      : this.bindingMaxlength;
  }
  @Input() set disabled(param: boolean) {
    this.bindingDisabled = isNullOrUndefined(param) ? false : param;
  }
  //#endregion
  //#region output props
  @Output() CustModelChange = new EventEmitter<string>();
  //#endregion
  constructor(el: ElementRef, renderer: Renderer2) {
    super(el, renderer);

    this.$subscripion.subscribe((data) => {
      if (!AppConst.SYSTEM_FIELD.some((s) => s === this.bindingInputId)) {
        this.validateModel(this.CustModel, this.bindingValidation, true);
      }
    });
  }

  ngOnInit(): void {
    super.setGetwayFieldType(this.bindingInputId, ColumnType.STRING);
  }
}
