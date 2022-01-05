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
import {
  datetoString,
  datetoStringCustom,
  getTimeStringToDate,
  stringToDate,
} from 'app/shared/functions/date.function';
import {
  isNullOrUndefined,
  switchClass,
  Uuid,
} from 'app/shared/functions/value.function';
import {
  CalendarConfigModel,
  TranslateModel,
} from 'app/shared/models/system_model';
import { CustBaseComponent } from '../cust-base/cust-base';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cust-calendar',
  templateUrl: './cust-calendar.component.html',
  styleUrls: ['./cust-calendar.component.scss'],
})
export class CustCalendarComponent extends CustBaseComponent implements OnInit {
  //#region variable
  bindingModel: any;
  bindingConfig: CalendarConfigModel;
  bindingDateFormat: string;
  bindingShowIcon: boolean;
  bindingValidation: TranslateModel;
  bindingDataType: string;
  bindingSelectionMode: string;
  bindingHourFormat: string;
  bindingShowTime: boolean;
  bindingShowSeconds: boolean;
  bindingTimeOnly: boolean;
  bindingDisabled: boolean;
  date8: Date;
  //#endregion
  //#region input props
  @Input() set CustModel(param: any) {
    if (this.bindingTimeOnly) {
      this.bindingModel = getTimeStringToDate(param);
    } else {
      this.bindingModel = isNullOrUndefined(param)
        ? null
        : datetoStringCustom(param);
    }
    this.validateModel(this.bindingModel, this.bindingValidation);
  }
  get CustModel(): any {
    return this.bindingModel;
  }

  @Input() set CustValidation(param: TranslateModel) {
    this.bindingValidation = param;
    this.validationNotification(param);
  }

  @Input() set CustConfig(param: CalendarConfigModel) {
    this.bindingConfig = isNullOrUndefined(param)
      ? new CalendarConfigModel()
      : param;
    this.bindingInputId = isNullOrUndefined(this.bindingInputId)
      ? Uuid.newUuid()
      : this.bindingInputId;
    this.bindingDateFormat = isNullOrUndefined(this.bindingConfig.dateFormat)
      ? this.bindingDateFormat
      : this.bindingConfig.dateFormat;
    this.bindingShowIcon = isNullOrUndefined(this.bindingConfig.showIcon)
      ? this.bindingShowIcon
      : this.bindingConfig.showIcon;
    this.bindingDataType = isNullOrUndefined(this.bindingConfig.dataType)
      ? this.bindingDataType
      : this.bindingConfig.dataType;
    this.bindingSelectionMode = isNullOrUndefined(
      this.bindingConfig.selectionMode
    )
      ? this.bindingSelectionMode
      : this.bindingConfig.selectionMode;
    this.bindingShowTime = isNullOrUndefined(this.bindingConfig.showTime)
      ? this.bindingShowTime
      : this.bindingConfig.showTime;
    this.bindingHourFormat = isNullOrUndefined(this.bindingConfig.hourFormat)
      ? this.bindingHourFormat
      : this.bindingConfig.hourFormat;
    this.bindingShowSeconds = isNullOrUndefined(this.bindingConfig.showSeconds)
      ? this.bindingShowSeconds
      : this.bindingConfig.showSeconds;
    this.bindingTimeOnly = isNullOrUndefined(this.bindingConfig.timeOnly)
      ? this.bindingTimeOnly
      : this.bindingConfig.timeOnly;
  }
  @Input() set dateFormat(param: string) {
    this.bindingDateFormat = isNullOrUndefined(param)
      ? this.bindingConfig.dateFormat
      : param;
  }

  @Input() set showIcon(param: boolean) {
    this.bindingShowIcon = isNullOrUndefined(param)
      ? this.bindingConfig.showIcon
      : param;
  }

  @Input() set dataType(param: string) {
    this.bindingDataType = isNullOrUndefined(param)
      ? this.bindingConfig.dataType
      : param;
  }

  @Input() set selectionMode(param: string) {
    this.bindingSelectionMode = isNullOrUndefined(param)
      ? this.bindingConfig.selectionMode
      : param;
  }

  @Input() set showTime(param: boolean) {
    this.bindingShowTime = isNullOrUndefined(param)
      ? this.bindingConfig.showTime
      : param;
  }

  @Input() set hourFormat(param: string) {
    this.bindingHourFormat = isNullOrUndefined(param)
      ? this.bindingConfig.hourFormat
      : param;
  }

  @Input() set showSeconds(param: boolean) {
    this.bindingShowSeconds = isNullOrUndefined(param)
      ? this.bindingConfig.showSeconds
      : param;
  }

  @Input() set timeOnly(param: boolean) {
    this.bindingTimeOnly = isNullOrUndefined(param)
      ? this.bindingConfig.timeOnly
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
    this.$subscripion.subscribe((data) => {
      if (!AppConst.SYSTEM_FIELD.some((s) => s === this.bindingInputId)) {
        this.validateModel(this.CustModel, this.bindingValidation, true);
      }
    });
  }
  ngOnInit(): void {
    super.setGetwayFieldType(this.bindingInputId, ColumnType.DATE);
  }
  onModelChange(CustModel: any) {
    this.bindingTimeOnly
      ? this.CustModelChange.next(
          `${CustModel.getHours()}:${CustModel.getMinutes()}:`
        )
      : this.CustModelChange.next(CustModel);
  }
}
