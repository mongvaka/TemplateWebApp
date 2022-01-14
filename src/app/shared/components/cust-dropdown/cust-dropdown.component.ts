import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppConst, ColumnType } from 'app/shared/constants';
import {
  isNullOrUndefined,
  isUndefinedOrZeroLength,
  switchClass,
  Uuid,
} from 'app/shared/functions/value.function';
import {
  DropdownConfigModel,
  TranslateModel,
} from 'app/shared/models/system_model';
import { interval } from 'rxjs';
import { CustBaseComponent } from '../cust-base/cust-base';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cust-dropdown',
  templateUrl: './cust-dropdown.component.html',
  styleUrls: ['./cust-dropdown.component.scss'],
})
export class CustDropdownComponent extends CustBaseComponent implements OnInit {
  //#region variable
  bindingConfig: DropdownConfigModel;
  bindingModel: any;
  bindingValidation: TranslateModel;
  bindingVirtualScroll: boolean;
  bindingItemSize: number;
  bindingFilter: boolean;
  bindingPlaceholder: string;
  bindingShowClear: boolean;
  bindingAutoDisplayFirst: boolean;
  bindingOptions: any[];
  bindingDisabled: boolean;
  url = '';
  //#endregion
  //#region input props
  @Input() set CustModel(param: any) {
    if (this.bindingModel === undefined && param !== undefined) {
      this.getBindingEmitter(param);
    } else {
      this.bindingModel = param;
    }
    this.getRequiredValidation(param);
  }
  get CustModel(): any {
    return this.bindingModel;
  }
  @Input() set CustValidation(param: TranslateModel) {
    this.bindingValidation = param;
    this.validationNotification(param);
  }
  @Input() set CustConfig(param: DropdownConfigModel) {
    this.bindingConfig = isNullOrUndefined(param)
      ? new DropdownConfigModel()
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
    this.bindingFilter = isNullOrUndefined(this.bindingConfig.filter)
      ? this.bindingFilter
      : this.bindingConfig.filter;
    this.bindingShowClear = isNullOrUndefined(this.bindingConfig.showClear)
      ? this.bindingShowClear
      : this.bindingConfig.virtualScroll;
    this.bindingOptions = isNullOrUndefined(this.bindingConfig.options)
      ? this.bindingOptions
      : this.bindingConfig.options;
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
    this.bindingOptions = isNullOrUndefined(param)
      ? this.bindingConfig.options
      : param;
  }
  @Input() set disabled(param: boolean) {
    this.bindingDisabled = isNullOrUndefined(param) ? false : param;
    let disabled = document.getElementsByClassName('cust-dropdown')[0];
    if (this.bindingDisabled && this.url !== 'setup') {
      disabled.classList.add('no-click');
      switchClass(this.el.nativeElement, 'no-click', this.bindingDisabled);
    } else {
      disabled.classList.remove('no-click');
      switchClass(this.el.nativeElement, 'no-click', false);
    }
  }
  //#endregion
  //#region output props
  @Output() CustModelChange = new EventEmitter<any>();
  @Output() CustBindingChange = new EventEmitter<any>();
  //#endregion
  constructor(el: ElementRef, renderer: Renderer2, private router: Router) {
    super(el, renderer);
    this.$subscripion.subscribe((data) => {
      if (!AppConst.SYSTEM_FIELD.some((s) => s === this.bindingInputId)) {
        this.validateModel(this.CustModel, this.bindingValidation, true);
      }
    });
  }
  ngOnInit(): void {
    super.setGetwayFieldType(this.bindingInputId, ColumnType.MASTER);
  }
  private getBindingEmitter(param: any): void {
    const $interval = interval(500).subscribe((val) => {
      if (!isUndefinedOrZeroLength(this.bindingOptions)) {
        if (this.bindingOptions.some((s) => s.value === param)) {
          this.CustBindingChange.next(param);
          this.bindingModel = null;
          setTimeout(() => {
            this.bindingModel = param;
          }, 0);
          $interval.unsubscribe();
        }
      }
    });
  }
  onFocus(): void {
    // const emitValue: CustDropdownOnFocusModel = {
    //   inputId: this.bindingInputId,
    //   custModel: this.bindingModel,
    //   readonly: this.getReadonly(this.bindingInputId),
    //   isLoadedOnFirstFocus: this.isLoadedOnFirstFocus,
    //   options: this.bindingOptions
    // };
    // this.custOnFocus.next(emitValue);
  }
}
