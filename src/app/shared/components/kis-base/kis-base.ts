import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppInjector } from 'app/app-injector';
import { GatewayService } from 'app/core/services/gateway.service';
import { UIControllerService } from 'app/core/services/uiController.service';
import { ValidationService } from 'app/core/services/validation.service';
import { AppConst, ColumnType, ElementType } from 'app/shared/constants';
import {
  isNullOrUndefined,
  isNullOrUndefOrEmpty,
  isUndefinedOrZeroLength,
  popIfExist,
  pushIfNotExist,
  replaceFormat,
  switchClass,
  Uuid,
} from 'app/shared/functions/value.function';
import {
  FieldAccessing,
  OrdinalModel,
  TranslateModel,
} from 'app/shared/models/system_model';

@Component({
  selector: 'cust-base',
  templateUrl: './cust-base.html',
  styleUrls: ['./cust-base.scss'],
})
export class KisBaseComponent implements OnInit, OnDestroy {
  public uiService: UIControllerService;
  public translate: TranslateService;
  public validateService: ValidationService;
  private getwayService: GatewayService;
  $subscripion: EventEmitter<any>;
  groups: OrdinalModel[] = [];
  divMessage;
  divParent;
  messageFn: string;
  elementText: string;
  readonlyFields: string[] = [];
  allowFields: string[] = [];
  bindingRequired: boolean;
  isView: boolean = false;
  @Input() set required(param: boolean) {
    if (isNullOrUndefOrEmpty(param)) {
      this.bindingRequired = true;
    } else {
      this.bindingRequired = param ? true : false;
    }
  }

  bindingInputId: string;
  @Input() set inputId(param: string) {
    this.bindingInputId = isNullOrUndefined(param) ? Uuid.newUuid() : param;
  }
  // private el: ElementRef, private renderer: Renderer2,
  //   private translate: TranslateService
  constructor(public el: ElementRef, public renderer: Renderer2) {
    this.uiService = AppInjector.get(UIControllerService);
    this.validateService = AppInjector.get(ValidationService);
    this.translate = AppInjector.get(TranslateService);
    this.getwayService = AppInjector.get(GatewayService);
    // this.fields = [];
    this.$subscripion = this.validateService.$formValidate;
    this.uiService.fieldsAccSubject.subscribe((data: FieldAccessing[]) => {
      this.setBaseReadonly(data);
    });
  }
  ngOnDestroy(): void {
    if (
      this.$subscripion.observers !== null &&
      this.$subscripion.observers.length > 0
    ) {
      this.$subscripion.observers = [];
    }

    this.getwayService.setDataType(
      this.bindingInputId === undefined ? 'NONE' : this.bindingInputId
    );
  }
  ngOnInit(): void {}
  setBaseReadonly(param: FieldAccessing[]): void {
    param.forEach((group) => {
      const clearIndex = group.filedIds.findIndex(
        (f) => f === AppConst.CLEAR_ID
      );
      const allIndex = group.filedIds.findIndex((f) => f === AppConst.ALL_ID);
      const viewIndex = group.filedIds.findIndex(
        (f) => f === AppConst.VIEWMODE_ID
      );
      if (viewIndex === -1 && clearIndex > -1 && !group.readonly) {
        this.readonlyFields = [];
      } else if (viewIndex === -1 && allIndex > -1) {
        if (group.readonly) {
          if (this.readonlyFields.some((f) => f === AppConst.ALL_ID)) {
            this.allowFields = [];
          }
          pushIfNotExist(this.readonlyFields, AppConst.ALL_ID);
        } else {
          this.readonlyFields = [];
        }
      } else if (this.readonlyFields.length > 0) {
        if (group.readonly) {
          group.filedIds.forEach((field) => {
            pushIfNotExist(this.readonlyFields, field);
          });
        } else {
          group.filedIds.forEach((field) => {
            popIfExist(this.readonlyFields, field);
          });
        }
      } else {
        if (group.readonly) {
          this.readonlyFields = this.readonlyFields.concat(group.filedIds);
        }
      }
      if (this.readonlyFields.some((f) => f === AppConst.ALL_ID)) {
        group.filedIds.forEach((field) => {
          if (!group.readonly) {
            pushIfNotExist(this.allowFields, field);
          }
        });
      } else {
        this.allowFields = [];
      }
    });
    if (this.readonlyFields.some((f) => f === AppConst.VIEWMODE_ID)) {
      this.isView = true;
    } else {
      this.isView = false;
    }
    const panel = document.querySelector('p-panel.cust-panel');
    if (!isNullOrUndefined(panel)) {
      switchClass(panel, 'view-only', this.isView);
    }
  }

  getReadonly(fieldId: string): boolean {
    let result = false;
    const systemGroup = AppConst.SYSTEM_FIELD;
    if (systemGroup.some((s) => s === fieldId)) {
      result = true;
    } else if (this.readonlyFields.some((s) => s === AppConst.VIEWMODE_ID)) {
      const ele = document.getElementById(fieldId);
      if (
        !isNullOrUndefined(ele) &&
        !isNullOrUndefined(ele.closest('p-panel.view-only'))
      ) {
        if (!isNullOrUndefined(ele.closest('p-footer.cust-panel-footer'))) {
          result = false;
        } else {
          result = true;
        }
      } else {
        if (fieldId === AppConst.VIEWMODE_ID) {
          result = false;
        } else {
          if (this.readonlyFields.some((f) => f === fieldId)) {
            result = true;
          } else {
            result = false;
          }
        }
      }
    } else if (this.readonlyFields.some((s) => s === AppConst.ALL_ID)) {
      const ele = document.getElementById(fieldId);
      if (isNullOrUndefined(ele)) {
        result = true;
        return result;
      }
      if (this.allowFields.some((f) => f === fieldId)) {
        result = false;
      } else {
        if (!isNullOrUndefined(ele.closest('p-footer.cust-panel-footer'))) {
          result = false;
        } else {
          result = true;
        }
      }
    } else {
      if (this.readonlyFields.some((f) => f === fieldId)) {
        result = true;
      } else {
        result = false;
      }
    }
    return result;
  }
  validationNotification(label?: TranslateModel): boolean {
    if (this.el.nativeElement.firstChild.classList.contains('ng-touched')) {
      this.divParent = this.el.nativeElement.parentNode;
      if (this.divParent.querySelector('div.validated-tooltip') === null) {
        this.divMessage = this.renderer.createElement('div');
        this.renderer.addClass(this.divMessage, 'validated-tooltip');
      }
      if (!isNullOrUndefined(label)) {
        this.messageFn = this.translate.instant(`${label.code}`);
        if (!isUndefinedOrZeroLength(label.parameters)) {
          this.messageFn = replaceFormat(this.messageFn, label.parameters);
        }

        if (
          this.divParent.querySelector('div.validated-tooltip-error') === null
        ) {
          const message = this.renderer.createText(this.messageFn);
          this.renderer.appendChild(this.divMessage, message);
          this.renderer.appendChild(this.divParent, this.divMessage);
          this.renderer.addClass(this.divMessage, 'validated-tooltip-error');
          if (this.el.nativeElement.tagName === ElementType.P_DROPDOWN) {
            this.renderer.addClass(
              this.divParent.querySelector('p-dropdown'),
              'input-rerender'
            );
          } else if (
            this.el.nativeElement.tagName === ElementType.P_MULTISELECT
          ) {
            this.renderer.addClass(
              this.divParent.querySelector('p-multiselect'),
              'input-rerender'
            );
          } else if (
            this.el.nativeElement.tagName === ElementType.P_INPUTSWITCH
          ) {
            this.renderer.addClass(
              this.divParent.querySelector('p-inputSwitch'),
              'input-rerender'
            );
          } else if (
            this.el.nativeElement.tagName === ElementType.P_SELECTBUTTON
          ) {
            this.renderer.addClass(
              this.divParent.querySelector('p-selectbutton'),
              'input-rerender'
            );
          }
        }
        this.renderer.addClass(this.el.nativeElement, 'invalidated');
        this.renderer.removeClass(this.el.nativeElement, 'validated');
        return true;
      } else {
        if (this.el.nativeElement.tagName === ElementType.P_DROPDOWN) {
          this.renderer.removeClass(
            this.divParent.querySelector('p-dropdown'),
            'input-rerender'
          );
        } else if (
          this.el.nativeElement.tagName === ElementType.P_MULTISELECT
        ) {
          this.renderer.removeClass(
            this.divParent.querySelector('p-multiselect'),
            'input-rerender'
          );
        } else if (
          this.el.nativeElement.tagName === ElementType.P_INPUTSWITCH
        ) {
          this.renderer.removeClass(
            this.divParent.querySelector('p-inputSwitch'),
            'input-rerender'
          );
        } else if (
          this.el.nativeElement.tagName === ElementType.P_SELECTBUTTON
        ) {
          this.renderer.removeClass(
            this.divParent.querySelector('p-selectbutton'),
            'input-rerender'
          );
        }
        this.renderer.removeChild(this.divParent, this.divMessage);
        this.renderer.removeClass(this.el.nativeElement, 'invalidated');
        this.renderer.addClass(this.el.nativeElement, 'validated');
        return false;
      }
    } else {
      return true;
    }
  }
  getRequiredValidation(model: any): boolean {
    if (this.el.nativeElement.firstChild.classList.contains('ng-touched')) {
      if (
        this.bindingRequired &&
        isNullOrUndefOrEmpty(model) &&
        !this.getReadonly(this.bindingInputId)
      ) {
        const label: TranslateModel = { code: 'ERROR.MANDATORY_FIELD' };
        return this.validationNotification(label);
      } else {
        return this.validationNotification();
      }
    } else {
      return false;
    }
  }
  validateModel(
    model: any,
    label: TranslateModel,
    isForm: boolean = false
  ): void {
    if (isForm) {
      switchClass(this.el.nativeElement.firstChild, 'ng-untouched', false);
      switchClass(this.el.nativeElement.firstChild, 'ng-touched', true);
    }
    if (isForm && !isNullOrUndefined(label)) {
      this.validateService.addInvalidFiled(
        this.el.nativeElement.attributes['inputid'].value
      );
    } else {
      if (this.getRequiredValidation(model)) {
        this.validateService.addInvalidFiled(
          this.el.nativeElement.attributes['inputid'].value
        );
      }
    }
  }
  setGetwayFieldType(id: string, type: ColumnType) {
    this.getwayService.setDataType(id, type);
  }
}
