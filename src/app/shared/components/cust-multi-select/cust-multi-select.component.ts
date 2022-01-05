import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { ColumnType } from 'app/shared/constants';
import {
  isNullOrUndefined,
  switchClass,
  Uuid,
} from 'app/shared/functions/value.function';
import {
  MultipleSelectConfigModel,
  TranslateModel,
} from 'app/shared/models/system_model';
import { CustBaseComponent } from '../cust-base/cust-base';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cust-multi-select',
  templateUrl: './cust-multi-select.component.html',
  styleUrls: ['./cust-multi-select.component.scss'],
})
export class CustMultiSelectComponent
  extends CustBaseComponent
  implements OnInit
{
  //#region variable
  bindingModel: any[];
  bindingValidation: TranslateModel;
  bindingConfig: MultipleSelectConfigModel;
  bindingVirtualScroll: boolean;
  bindingItemSize: number;
  bindingFilter: boolean;
  bindingPlaceholder: string;
  bindingAutoDisplayFirst: boolean;
  bindingShowClear: boolean;
  bindingOptions: any[];
  bindingDefaultLabel: string;
  bindingPanelStyle: string;
  bindingMaxSelectedLabels: number;
  bindingDisabled: boolean;
  //#endregion
  //#region input props
  @Input() set CustModel(param: any[]) {
    console.log('thisSelectOptionparam : ', param);
    this.bindingModel = isNullOrUndefined(param) ? null : param;
    this.validateModel(this.bindingModel, this.bindingValidation);
  }
  get CustModel(): any[] {
    return this.bindingModel;
  }
  @Input() set CustValidation(param: TranslateModel) {
    this.bindingValidation = param;
    this.validationNotification(param);
  }
  @Input() set CustConfig(param: MultipleSelectConfigModel) {
    this.bindingConfig = isNullOrUndefined(param)
      ? new MultipleSelectConfigModel()
      : param;
    this.bindingInputId = isNullOrUndefined(this.bindingInputId)
      ? Uuid.newUuid()
      : this.bindingInputId;
    this.bindingVirtualScroll = isNullOrUndefined(
      this.bindingConfig.virtualScroll
    )
      ? this.bindingVirtualScroll
      : this.bindingConfig.virtualScroll;
    this.bindingItemSize = isNullOrUndefined(this.bindingConfig.itemSize)
      ? this.bindingItemSize
      : this.bindingConfig.itemSize;
    this.bindingPlaceholder = isNullOrUndefined(this.bindingConfig.placeholder)
      ? this.bindingPlaceholder
      : this.bindingConfig.placeholder;
    this.bindingAutoDisplayFirst = isNullOrUndefined(
      this.bindingConfig.autoDisplayFirst
    )
      ? this.bindingAutoDisplayFirst
      : this.bindingConfig.autoDisplayFirst;
    this.bindingShowClear = isNullOrUndefined(this.bindingConfig.showClear)
      ? this.bindingShowClear
      : this.bindingConfig.showClear;
    this.bindingOptions = isNullOrUndefined(this.bindingConfig.options)
      ? this.bindingOptions
      : this.bindingConfig.options;
    this.bindingDefaultLabel = isNullOrUndefined(
      this.bindingConfig.defaultLabel
    )
      ? this.bindingDefaultLabel
      : this.bindingConfig.defaultLabel;
    this.bindingPanelStyle = isNullOrUndefined(this.bindingConfig.panelStyle)
      ? this.bindingPanelStyle
      : this.bindingConfig.panelStyle;
    this.bindingMaxSelectedLabels = isNullOrUndefined(
      this.bindingConfig.maxSelectedLabels
    )
      ? this.bindingMaxSelectedLabels
      : this.bindingConfig.maxSelectedLabels;
    this.bindingFilter = isNullOrUndefined(this.bindingConfig.filter)
      ? this.bindingFilter
      : this.bindingConfig.filter;
  }
  @Input() set virtualScroll(param: boolean) {
    this.bindingVirtualScroll = isNullOrUndefined(param)
      ? this.bindingConfig.virtualScroll
      : param;
  }
  @Input() set itemSize(param: number) {
    this.bindingItemSize = isNullOrUndefined(param)
      ? this.bindingConfig.itemSize
      : param;
  }
  @Input() set filter(param: boolean) {
    this.bindingFilter = isNullOrUndefined(param)
      ? this.bindingConfig.filter
      : param;
  }
  @Input() set placeholder(param: string) {
    this.bindingPlaceholder = isNullOrUndefined(param)
      ? this.bindingConfig.placeholder
      : param;
  }
  @Input() set autoDisplayFirst(param: boolean) {
    this.bindingAutoDisplayFirst = isNullOrUndefined(param)
      ? this.bindingConfig.autoDisplayFirst
      : param;
  }
  @Input() set showClear(param: boolean) {
    this.bindingShowClear = isNullOrUndefined(param)
      ? this.bindingConfig.showClear
      : param;
  }
  @Input() set options(param: any[]) {
    console.log('thisOption : ', param);

    this.bindingOptions = isNullOrUndefined(param)
      ? this.bindingConfig.options
      : param;
  }
  @Input() set defaultLabel(param: string) {
    this.bindingDefaultLabel = isNullOrUndefined(param)
      ? this.bindingConfig.defaultLabel
      : param;
  }
  @Input() set panelStyle(param: string) {
    this.bindingPanelStyle = isNullOrUndefined(param)
      ? this.bindingConfig.panelStyle
      : param;
  }
  @Input() set maxSelectedLabels(param: number) {
    this.bindingMaxSelectedLabels = isNullOrUndefined(param)
      ? this.bindingConfig.maxSelectedLabels
      : param;
  }
  @Input() set disabled(param: boolean) {
    this.bindingDisabled = isNullOrUndefined(param) ? false : param;
    if (this.bindingDisabled) {
      switchClass(this.el.nativeElement, 'no-click', this.bindingDisabled);
    } else {
      switchClass(this.el.nativeElement, 'no-click', false);
    }
  }
  //#endregion
  //#region output props
  @Output() CustModelChange = new EventEmitter<any>();
  //#endregion
  constructor(el: ElementRef, renderer: Renderer2) {
    super(el, renderer);
    this.validateService.$formValidate.subscribe((data) => {
      this.validateModel(this.bindingModel, this.bindingValidation, true);
    });
  }
  ngOnInit(): void {
    super.setGetwayFieldType(this.bindingInputId, ColumnType.MASTER);
  }
}
