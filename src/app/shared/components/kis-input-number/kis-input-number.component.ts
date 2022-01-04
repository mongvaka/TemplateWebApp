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
  InputNumberConfigModel,
  TranslateModel,
} from 'app/shared/models/system_model';
import { KisBaseComponent } from '../cust-base/cust-base';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cust-input-number',
  templateUrl: './cust-input-number.component.html',
  styleUrls: ['./cust-input-number.component.scss'],
})
export class KisInputNumberComponent
  extends KisBaseComponent
  implements OnInit
{
  //#region variable
  bindingModel: number;
  bindingValidation: TranslateModel;
  bindingConfig: InputNumberConfigModel;
  bindingMode: string;
  bindingMax: number;
  bindingMin: number;
  bindingMinFractionDigits: number;
  bindingMaxFractionDigits: number;
  bindingUseGrouping: boolean;
  bindingSuffix: string;
  bindingDisabled: boolean;
  //#endregion
  //#region input props
  @Input() set kisModel(param: string) {
    // tslint:disable-next-line: radix
    this.bindingModel = isNullOrUndefined(param) ? 0 : parseInt(param);
    this.validateModel(this.bindingModel, this.bindingValidation);
  }
  get kisModel(): string {
    return this.bindingModel.toString();
  }
  @Input() set kisValidation(param: TranslateModel) {
    this.bindingValidation = param;
    this.validationNotification(param);
  }
  @Input() set kisConfig(param: InputNumberConfigModel) {
    this.bindingConfig = isNullOrUndefined(param)
      ? new InputNumberConfigModel()
      : param;
    this.bindingInputId = isNullOrUndefined(this.bindingInputId)
      ? Uuid.newUuid()
      : this.bindingInputId;
    this.bindingMode = isNullOrUndefined(this.bindingConfig.mode)
      ? this.bindingMode
      : this.bindingConfig.mode;
    this.bindingMax = isNullOrUndefined(this.bindingConfig.max)
      ? this.bindingMax
      : this.bindingConfig.max;
    this.bindingMin = isNullOrUndefined(this.bindingConfig.min)
      ? this.bindingMin
      : this.bindingConfig.min;
    this.bindingMaxFractionDigits = isNullOrUndefined(
      this.bindingConfig.fractionDigits
    )
      ? this.bindingMaxFractionDigits
      : this.bindingConfig.fractionDigits;
    this.bindingMinFractionDigits = isNullOrUndefined(
      this.bindingConfig.fractionDigits
    )
      ? this.bindingMinFractionDigits
      : this.bindingConfig.fractionDigits;
    this.bindingUseGrouping = isNullOrUndefined(this.bindingConfig.grouping)
      ? this.bindingUseGrouping
      : this.bindingConfig.grouping;
    this.bindingSuffix = isNullOrUndefined(this.bindingConfig.suffix)
      ? this.bindingSuffix
      : this.bindingConfig.suffix;
  }
  @Input() set mode(param: string) {
    this.bindingMode = isNullOrUndefined(param)
      ? this.bindingConfig.mode
      : param;
  }
  @Input() set max(param: number) {
    this.bindingMax = isNullOrUndefined(param) ? this.bindingConfig.max : param;
  }
  @Input() set min(param: number) {
    this.bindingMin = isNullOrUndefined(param) ? this.bindingConfig.min : param;
  }
  @Input() set minFractionDigits(param: number) {
    this.bindingMinFractionDigits = isNullOrUndefined(param)
      ? this.bindingConfig.fractionDigits
      : param;
  }
  @Input() set maxFractionDigits(param: number) {
    this.bindingMaxFractionDigits = isNullOrUndefined(param)
      ? this.bindingConfig.fractionDigits
      : param;
  }
  @Input() set useGrouping(param: boolean) {
    this.bindingUseGrouping = isNullOrUndefined(param)
      ? this.bindingConfig.grouping
      : param;
  }
  @Input() set suffix(param: string) {
    this.bindingSuffix = isNullOrUndefined(param)
      ? this.bindingConfig.suffix
      : param;
  }
  @Input() set disabled(param: boolean) {
    this.bindingDisabled = isNullOrUndefined(param) ? false : param;
  }
  //#endregion
  //#region output props
  @Output() kisModelChange = new EventEmitter<string>();
  //#endregion
  constructor(el: ElementRef, renderer: Renderer2) {
    super(el, renderer);
    this.$subscripion.subscribe((data) => {
      if (!AppConst.SYSTEM_FIELD.some((s) => s === this.bindingInputId)) {
        this.validateModel(this.kisModel, this.bindingValidation, true);
      }
    });
  }

  ngOnInit(): void {
    super.setGetwayFieldType(this.bindingInputId, ColumnType.INT);
  }
}
