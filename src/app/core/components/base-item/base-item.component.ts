import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { DatePipe } from '@angular/common';
import {
  BaseOption,
  DataServiceModel,
  FieldAccessing,
  FormValidationModel,
  NotificationResponse,
  OptionModel,
  Paginator,
  PathParamModel,
  ResponseModel,
  SearchParameter,
  SelectItems,
  TranslateModel,
} from '../../../shared/models/system_model';
import {
  ButtonConfig,
  CalendarConfig,
  DropdownConfig,
  FormatConfig,
  InputSwitchConfig,
  InputTextConfig,
} from '../../../shared/config/format.config';
import { ACTION_PATH } from '../../../shared/constants';
import { AccessLevelModel } from '../../../models';
import { AccessLevel } from '../../../shared/constants';
import { Observable, of } from 'rxjs';
import {
  modelGetDirty,
  modelRegister,
} from '../../../shared/functions/model.function';
import { GatewayService } from '../../services/gateway.service';
import { AppInjector } from '../../../app-injector';
import {
  isNullOrUndefined,
  isUndefinedOrZeroLength,
} from '../../../shared/functions/value.function';
import { catchError, finalize, tap } from 'rxjs/operators';
import { MenuItem } from 'app/shared/models/prime_model';
import { setBodyNomalMode } from 'app/shared/functions/routing.function';

@Component({
  selector: 'app-base-item',
  template: ` <p>base-item works!</p> `,
  styleUrls: ['./base-item.component.scss'],
})
export class BaseItemComponent<T> extends BaseComponent {
  public baseOption: BaseOption = {};
  intervalChecking: boolean;
  model: T = {} as T;
  id: string;
  pathName: string;
  isView: boolean = false;
  pageCustomOptions: OptionModel[] = [];
  fileDirty: boolean = false;

  // K2 workflow
  public isViewWorkflowBtn: boolean;
  public isUpdateMode: boolean = true;
  @Input() set gridOptions(param: OptionModel[]) {
    this.pageCustomOptions = param;
  }
  @Input() set relatedInfoOption(param: MenuItem[]) {
    this.infoCustomItems = param;
  }
  @Input() set functionOption(param: MenuItem[]) {
    this.actionCustomItems = param;
  }
  constructor() {
    super();
  }
  getGroups(): void {
    this.uiService.getGroupOptions().subscribe((data) => {
      this.itemsGroup = data;
      super.setMenuVisibilty();
    });
  }

  checkPageMode(): void {}
  getCanCreate(): boolean {
    return true;
    // return this.accessRight.create !== AccessLevel.None;
  }
  getCanUpdate(): boolean {
    return true;
    // return this.accessRight.update !== AccessLevel.None;
  }
  getCanAction(): boolean {
    return true;
    // return this.accessRight.action !== AccessLevel.None;
  }
  // private getSystemFieldReadOnly(): FieldAccessing[] {
  //   const fields: FieldAccessing[] = [];
  //   const systemGroup = ['CREATED_BY', 'CREATED_DATE_TIME', 'MODIFIED_BY', 'MODIFIED_DATE_TIME', 'COMPANY_ID'];
  //   fields.push({ filedIds: systemGroup, readonly: true });
  //   return fields;
  // }
  checkAccessMode($getAccessRight: Observable<AccessLevelModel>): void {
    // setTimeout(() => {
    // super.setBaseFieldAccessing(this.getSystemFieldReadOnly());
    // }, 2000);

    if (isNullOrUndefined(this.accessRight)) {
      $getAccessRight.subscribe((result) => {
        this.accessRight = result;
      });
    }
  }
  toInfo(param: PathParamModel): void {
    const conflicts = modelGetDirty(this.model);
    param.action = ACTION_PATH.TOREL;
    if (conflicts.length === 0 && !this.fileDirty) {
      this.setRoutingGateway(param);
      // this.uiService.getRelatedMode2(`${param.path}`);
      // this.toNav(param);
    } else {
      const formValid = this.getFormValidation();
      console.log('formValid', formValid);

      if (formValid.invalidId.length === 0) {
        this.notificationService.showConfirmRedirect();
        this.notificationService.isAccept.subscribe((isConfirm) => {
          if (isConfirm) {
            this.setRoutingGateway(param);
          }
        });
      }
    }
  }
  toAction(param: PathParamModel, isWorkflow: boolean = false): void {
    const conflicts = modelGetDirty(this.model);
    param.action = isWorkflow ? ACTION_PATH.TOWORKFLOW : ACTION_PATH.TOITEMFUN;
    if (conflicts.length === 0 && !this.fileDirty) {
      if (!isNullOrUndefined(param.parameters)) {
        this.uiService.functionObject = param.parameters;
        param.parameters = null;
      }
      this.setRoutingGateway(param);
    } else {
      const formValid = this.getFormValidation();
      if (formValid.invalidId.length === 0) {
        this.notificationService.showConfirmRedirect();
        this.notificationService.isAccept.subscribe((isConfirm) => {
          if (isConfirm) {
            if (!isNullOrUndefined(param.parameters)) {
              this.uiService.functionObject = param.parameters;
              param.parameters = null;
            }
            this.setRoutingGateway(param);
          }
        });
      }
    }
  }
  toList(): void {
    const param: PathParamModel = { action: ACTION_PATH.TOLIST };
    if (!isNullOrUndefined(this.redirectPath)) {
      param.path = this.redirectPath;
    }
    if (this.isUpdateMode) {
      const conflicts = modelGetDirty(this.model);
      if (conflicts.length === 0 && !this.fileDirty) {
        this.setRoutingGateway(param);
      } else {
        // const formValid = this.getFormValidation();
        // if (formValid.invalidId.length === 0) {
        // this.notificationService.showConfirmRedirect();
        this.notificationService.isAccept.subscribe((isConfirm) => {
          if (isConfirm) {
            this.setRoutingGateway(param);
          }
        });
        // }
        this.setRoutingGateway(param);
      }
    } else {
      this.setRoutingGateway(param);
    }
  }
  onClose(): void {
    this.toList();
  }
  onCreate($create: Observable<ResponseModel>, isClose: boolean): void {
    $create.subscribe(
      (result) => {
        this.id = result.key;
        // result.model.uuidStamp = this.model['uuidStamp'];
        this.model = result.model;
        // modelRegister(this.model);
        this.notificationService.showSaveSuccess();
        this.toList();
      },
      (error) => {
        this.notificationService.showErrorMessageFromResponse(error);
      }
    );
  }

  onUpdate($update: Observable<ResponseModel>, isClose: boolean): void {
    $update.subscribe(
      (result) => {
        this.id = result.key;
        // result.model.uuidStamp = this.model['uuidStamp'];
        // this.model = result.model;
        // modelRegister(this.model);
        this.notificationService.showSaveSuccess();
        this.toList();
      },
      (error) => {
        this.notificationService.showErrorMessageFromResponse(error);
      }
    );
  }
  onExecuteAction($function: Observable<any>): void {
    $function.subscribe(
      (result) => {
        this.onBack(this.iActionSuccess(result));
        setBodyNomalMode();
      },
      (error) => {
        this.notificationService.showErrorMessageFromResponse(error);
      }
    );
  }
  setUpdateUser(result: any): any {
    if (result['update_date'] != null) {
      const update_date = new Date(result['update_date']);
      result['update_date'] = update_date.toDateString();
    }
    const create_date = new Date(result['create_date']);
    result['create_date'] = create_date.toDateString();
  }
  toReload(): void {
    if (this.isUpdateMode) {
      this.checkPageMode();
    } else {
      const param: PathParamModel = {
        action: ACTION_PATH.RELOAD,
        pageId: this.id,
      };
      this.setRoutingGateway(param);
      this.checkPageMode();
    }
  }

  setDefaultValueSystemFields(): void {
    // setTimeout(() => {
    this.model['branch_uuid'] = this.userDataService.getCurrentBranchGUID();
    this.model['company_uuid'] = this.userDataService.getCurrentCompanyUUID();
    this.model['is_active'] = true;
    this.model['create_by'] = this.userDataService.getUsername();
    this.model['create_date'] = this.getDate();

    // }, 0);
  }

  getDate(): string {
    const date = new Date();
    return date.toDateString();
  }
  getFormValidation(): FormValidationModel {
    this.uiService.setIncreaseReqCounter('formvalidate');
    this.validateService.clearInvalidFiled();
    this.validateService.$formValidate.emit({ isValid: true });
    this.uiService.setDecreaseReqCounter('formvalidate');
    return {
      isValid: this.validateService.invalidFields.length === 0,
      invalidId: this.validateService.invalidFields,
    };
  }
  iActionSuccess(result: any): boolean {
    const notification: NotificationResponse = result['notification'];
    if (!isUndefinedOrZeroLength(notification)) {
      const notificationMessage: any[] = notification['notificationMessage'];
      if (!isUndefinedOrZeroLength(notificationMessage)) {
        const keys = Object.keys(notificationMessage);
        if (keys.some((k) => k.toUpperCase() === 'SUCCESS.00034')) {
          return true;
        }
      }
    }
    return false;
  }
}
