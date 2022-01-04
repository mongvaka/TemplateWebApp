import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AppInjector } from '../../../app-injector';
import { GatewayService } from '../../services/gateway.service';
import {
  ButtonConfig,
  CalendarConfig,
  DropdownConfig,
  FormatConfig,
  InputSwitchConfig,
  InputTextConfig,
  MultiSelectConfig,
  TextareaConfig,
} from '../../../shared/config/format.config';
import { AccessRightService } from 'app/core/services/access_right_service';
import { AccessLevelModel, UserAccessLevelParm } from 'app/models';
import {
  BaseServiceModel,
  FieldAccessing,
  PageInformationModel,
  PathParamModel,
} from 'app/shared/models/system_model';
import { MenuItem } from 'app/shared/models/prime_model';
import { UIControllerService } from 'app/core/services/uiController.service';
import { UserDataService } from 'app/core/services/user-data.service';
import { ACTION_PATH, ROUTE_INFO_GEN, StorageKey } from 'app/shared/constants';
import { Observable } from 'rxjs';
import {
  deCodePassingObj,
  isNullOrUndefined,
  isUndefinedOrZeroLength,
  switchClass,
} from 'app/shared/functions/value.function';
import {
  setBodyNomalMode,
  setRoutingGateway,
} from 'app/shared/functions/routing.function';
import { NotificationService } from 'app/core/services/notificaton.service';
import { ValidationService } from 'app/core/services/validation.service';
import { ExportExcelService } from 'app/shared/services/exportExcel.service';
import { BaseDropdownService } from './base.dropdown.service';
import { BaseDropdownComponent } from './base.dropdown.component';

@Component({
  selector: 'app-base',
  template: ` <p>base works!</p> `,
})
export class BaseComponent {
  public translate: TranslateService;
  public dropdownService: BaseDropdownService;
  public notificationService: NotificationService;
  public accessService: AccessRightService;
  public accessRight: AccessLevelModel;

  public validateService: ValidationService;
  //public fileService: FileService;
  public router: Router;
  public path: string = '';
  public childPaths: PageInformationModel[] = [];
  public skipingPath: string;
  public infoItems: MenuItem[];
  public actionItems: MenuItem[];
  public itemsGroup: MenuItem[];
  public buttonConfig = ButtonConfig.SAVE;

  public uiService: UIControllerService;
  public userDataService: UserDataService;
  public infoCustomItems: MenuItem[];
  public actionCustomItems: MenuItem[];
  public excelService: ExportExcelService;

  public MONTH = FormatConfig.MONTH;
  public YEAR = FormatConfig.YEAR;
  public INTEGER = FormatConfig.INTEGER;
  public INTEGER_POS = FormatConfig.INTEGER_POS;
  public CURRENCY_13_2 = FormatConfig.CURRENCY_13_2;
  public CURRENCY_13_2_POS = FormatConfig.CURRENCY_13_2_POS;
  public CURRENCY_16_5 = FormatConfig.CURRENCY_16_5;
  public CURRENCY_16_5_POS = FormatConfig.CURRENCY_16_5_POS;
  public PERCENT_13_10 = FormatConfig.PERCENT_13_10;
  public PERCENT_13_10_POS = FormatConfig.PERCENT_13_10_POS;
  public PERCENT_5_2 = FormatConfig.PERCENT_5_2;
  public PERCENT_5_2_POS = FormatConfig.PERCENT_5_2_POS;
  public PERCENT_7_4 = FormatConfig.PERCENT_7_4;
  public PERCENT_7_4_POS = FormatConfig.PERCENT_7_4_POS;
  public ID_INPUTTEXT = InputTextConfig.ID_INPUTTEXT;
  public DEFAULT_INPUTTEXT = InputTextConfig.DEFAULT_INPUTTEXT;
  public DEFAULT_INPUTTEXT_AREA = InputTextConfig.DEFAULT_INPUTTEXT_AREA;
  public SYSTEM_INPUTTEXT = InputTextConfig.DEFAULT_INPUTTEXT;
  public TAX_ID_INPUTTEXT = InputTextConfig.TAX_ID_INPUTTEXT;
  public DEFAULT_DROPDOWN = DropdownConfig.DEFAULT_DROPDOWN;
  public DEFAULT_MULTISELECT = MultiSelectConfig.DEFAULT_MULTISELECT;
  public DATETIME = CalendarConfig.DATETIME;
  public DATE = CalendarConfig.DATE;
  public DATERANGE = CalendarConfig.DATERANGE;
  public TIME = CalendarConfig.TIME;
  public DEFAULT_INPUTSWITCH = InputSwitchConfig.DEFAULT_INPUTSWITCH;
  public SAVE = ButtonConfig.SAVE;
  public SAVE_AND_CLOSE = ButtonConfig.SAVE_AND_CLOSE;
  public CLOSE = ButtonConfig.CLOSE;
  public DEFAULT_TEXTAREA = TextareaConfig.DEFAULT_TEXTAREA;

  private Gateway: GatewayService;
  public baseDropdown: BaseDropdownComponent;
  public refType: number;
  public refGuid: string;
  public passingModel: any;

  fields: FieldAccessing[] = [];
  //#endregion
  userAccessLevelParm: UserAccessLevelParm;
  baseService: BaseServiceModel<any>;
  parentId: string;
  isRelatedMode = false;
  isFunctionMode = false;
  redirectPath: string;

  itemPageMode = [ROUTE_INFO_GEN.ADDRESS_TRANS, ROUTE_INFO_GEN.MEMO];
  //public workflowItems: MenuItem[];
  constructor() {
    this.excelService = AppInjector.get(ExportExcelService);
    this.translate = AppInjector.get(TranslateService);
    this.dropdownService = AppInjector.get(BaseDropdownService);
    this.router = AppInjector.get(Router);
    this.uiService = AppInjector.get(UIControllerService);
    this.userDataService = AppInjector.get(UserDataService);
    this.notificationService = AppInjector.get(NotificationService);
    this.accessService = AppInjector.get(AccessRightService);
    this.Gateway = AppInjector.get(GatewayService);
    this.baseDropdown = AppInjector.get(BaseDropdownComponent);
    this.validateService = AppInjector.get(ValidationService);
    //this.fileService = AppInjector.get(FileService);
    //this.k2Service = AppInjector.get(K2Service);
    this.baseService = {
      translate: this.translate,
      //dropdownService: this.dropdownService,
      router: this.router,
      uiService: this.uiService,
      userDataService: this.userDataService,
      notificationService: this.notificationService,
      accessService: this.accessService,
      Gateway: this.Gateway,
      //baseDropdown: this.baseDropdown,
      validateService: this.validateService,
      //fileService: this.fileService,
    };
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setInfoOptions();
      this.setActionOptions();
      this.userDataService.languageChangeSubject.next(true);
    });
    // this.accessService.getUserParentChildBU().subscribe((result) => {
    //     this.userAccessLevelParm = new UserAccessLevelParm();
    //     this.userAccessLevelParm.parentChildBU = result;
    //     this.userAccessLevelParm.owner = this.userDataService.getUsernameFromToken();
    //     this.userAccessLevelParm.businessUnitGUID = this.accessService.getUserBusinessUnitGUID();
    //   });
    this.uiService = AppInjector.get(UIControllerService);
    if (this.uiService.finishSpinnerItemSubject.observers.length > 1) {
      this.uiService.finishSpinnerItemSubject.observers.splice(
        1,
        this.uiService.finishSpinnerItemSubject.observers.length - 1
      );
    }
    this.isRelatedMode = this.router.url.indexOf('info') > -1;
    this.isFunctionMode = !isNullOrUndefined(this.uiService.skipedPath);
  }
  exportToExcel(value: any): void {
    this.excelService.exportToExcel(value);
  }

  setRoutingGateway(param: PathParamModel, removeSN: boolean = false): void {
    setRoutingGateway(
      param,
      this.path,
      this.itemPageMode,
      this.redirectPath,
      removeSN
    );
    this.redirectPath = null;
  }
  onBack(removeSerialNumber: boolean = false): void {
    const param: PathParamModel = { action: ACTION_PATH.GOBACK };
    this.setRoutingGateway(param, removeSerialNumber);
  }
  onFunctionBack(): void {
    const param: PathParamModel = { action: ACTION_PATH.GOBACK };

    this.setRoutingGateway(param, false);
    setBodyNomalMode();
  }
  setPath(param: PageInformationModel): void {
    this.path = param.pagePath;
    this.childPaths = param.childPaths;
    this.skipingPath = param.skipingPath;
    this.baseDropdown.setDropdownServicePath(param);
  }
  public getPassingObject(route?: ActivatedRoute): any {
    if (this.isFunctionMode) {
      const obj = Object.assign({}, this.uiService.functionObject);
      this.uiService.functionObject = null;
      return obj;
    } else {
      if (
        !isNullOrUndefined(route) &&
        !isNullOrUndefined(route.snapshot.queryParams)
      ) {
        const splitedPath = Object.keys(route.snapshot.queryParams);
        const obj =
          route.snapshot.queryParams[splitedPath[splitedPath.length - 1]];
        return isNullOrUndefined(obj)
          ? null
          : JSON.parse(deCodePassingObj(obj));
      } else {
        return null;
      }
    }
  }
  setMenuVisibilty(): void {
    const relatedBtn = document.querySelector('#MENUINFO');
    const functionBtn = document.querySelector('#MENUACTION');
    const groupBtn = document.querySelector('#MENUGROUP');
    console.log('relatedBtn', relatedBtn);

    if (
      !isNullOrUndefined(relatedBtn) &&
      !isNullOrUndefined(relatedBtn.nextSibling)
    ) {
      switchClass(
        relatedBtn.nextSibling,
        'disabled',
        isNullOrUndefined(this.infoItems) || this.infoItems.length === 0
      );
    }
    if (
      !isNullOrUndefined(functionBtn) &&
      !isNullOrUndefined(functionBtn.nextSibling)
    ) {
      switchClass(
        functionBtn.nextSibling,
        'disabled',
        isNullOrUndefined(this.actionItems) || this.actionItems.length === 0
      );
    }
    if (
      !isNullOrUndefined(groupBtn) &&
      !isNullOrUndefined(groupBtn.nextSibling)
    ) {
      switchClass(
        groupBtn.nextSibling,
        'disabled',
        isNullOrUndefined(this.itemsGroup) || isNullOrUndefined(this.itemsGroup)
      );
    }
  }
  setBaseFieldAccessing(fields: FieldAccessing[]): void {
    if (isNullOrUndefined(fields)) {
      fields = [];
    }
    // fields.push(this.getSystemFieldReadOnly());
    if (!isNullOrUndefined(fields)) {
      this.uiService.setUIFieldsAccessing(fields);
    }
  }
  setInfoOptions(model?: any): void {
    if (isNullOrUndefined(this.infoItems)) {
      this.infoItems = [];
    } else {
      this.infoItems.forEach((item) => {
        item.label = this.translate.instant(item.label);
        if (!isNullOrUndefined(item.items)) {
          item.items.forEach((sub) => {
            sub.label = this.translate.instant(sub.label);
          });
        }
      });
    }
    if (isNullOrUndefined(this.infoCustomItems)) {
      this.infoCustomItems = [];
    } else {
      if (isNullOrUndefined(this.infoCustomItems)) {
        this.infoCustomItems = [];
      }
      this.infoCustomItems.forEach((item) => {
        item.label = this.translate.instant(item.label);
        item.fragment = 'custom';
        if (!isNullOrUndefined(item.items)) {
          item.items.forEach((sub) => {
            sub.label = this.translate.instant(sub.label);
            sub.fragment = 'custom';
          });
        }
      });
    }
    if (this.infoItems.length === 0) {
      if (isNullOrUndefined(this.infoCustomItems)) {
        this.infoCustomItems = [];
      }
      this.infoCustomItems.forEach((customItem) => {
        this.infoItems.push(this.setRelatedinfoCustomCommand(customItem));
      });
    } else {
      if (isNullOrUndefined(this.infoCustomItems)) {
        this.infoCustomItems = [];
      }
      this.infoCustomItems.forEach((customItem) => {
        const index = this.infoItems.findIndex(
          (f) => f.label === customItem.label
        );
        if (index > -1) {
          this.infoItems[index] = this.setRelatedinfoCustomCommand(customItem);
        } else {
          this.infoItems.push(this.setRelatedinfoCustomCommand(customItem));
        }
      });
    }
    this.infoItems.forEach((item) => {
      if (!isNullOrUndefined(item.items)) {
        for (let i = 0; i < item.items.length; i++) {
          item.items[i] = this.setRelatedinfoCustomCommand(item.items[i]);
        }
      }
    });

    this.infoItems.forEach((item) => {
      if (isNullOrUndefined(item['tabindex'])) {
        item['tabindex'] = '999';
      }
    });
    this.infoItems.sort(this.compare);
    this.setMenuVisibilty();
  }
  setActionOptions(model?: any): void {
    if (isNullOrUndefined(this.actionItems)) {
      this.actionItems = [];
    } else {
      this.actionItems.forEach((item) => {
        item.label = this.translate.instant(item.label);
        item.fragment = 'custom';
        if (!isNullOrUndefined(item.items)) {
          item.items.forEach((sub) => {
            sub.label = this.translate.instant(sub.label);
            sub.fragment = 'custom';
          });
        }
      });
    }
    if (isNullOrUndefined(this.actionItems)) {
      this.actionItems = [];
    } else {
      this.actionItems.forEach((item) => {
        item.label = this.translate.instant(item.label);
        if (!isNullOrUndefined(item.items)) {
          item.items.forEach((sub) => {
            sub.label = this.translate.instant(sub.label);
          });
        }
      });
    }
    if (this.actionItems.length === 0) {
      this.actionCustomItems.forEach((customItem) => {
        this.actionItems.push(this.setFunctionCustomCommand(customItem));
      });
    } else {
      if (isNullOrUndefined(this.infoCustomItems)) {
        this.infoCustomItems = [];
      }
      this.actionCustomItems.forEach((customItem) => {
        const index = this.actionItems.findIndex(
          (f) => f.label === customItem.label
        );
        if (index > -1) {
          this.actionItems[index] = this.setFunctionCustomCommand(customItem);
        } else {
          this.actionItems.push(this.setFunctionCustomCommand(customItem));
        }
      });
    }
    this.actionItems.forEach((item) => {
      if (!isNullOrUndefined(item.items)) {
        for (let i = 0; i < item.items.length; i++) {
          item.items[i] = this.setFunctionCustomCommand(item.items[i]);
        }
      }
    });
    this.actionItems.forEach((item) => {
      if (isNullOrUndefined(item['tabindex'])) {
        item['tabindex'] = '999';
      }
    });
    this.actionItems.sort(this.compare);
    this.setMenuVisibilty();
  }
  private compare(a: MenuItem, b: MenuItem): any {
    if (Number(a.tabindex) < Number(b.tabindex)) {
      return -1;
    }
    if (Number(a.tabindex) > Number(b.tabindex)) {
      return 1;
    }
    return 0;
  }
  private setFunctionCustomCommand(custom: MenuItem): MenuItem {
    const keys = Object.keys(custom);
    const item: MenuItem = {};
    keys.forEach((key) => {
      item[key] = custom[key];
    });
    if (!isNullOrUndefined(custom.command)) {
      if (item.fragment === 'custom') {
        item.command = () => this.toRelatedInfo(custom.command() as any);
      }
    }
    return item;
  }
  private setRelatedinfoCustomCommand(custom: MenuItem): MenuItem {
    const keys = Object.keys(custom);
    const item: MenuItem = {};
    keys.forEach((key) => {
      item[key] = custom[key];
    });

    if (!isNullOrUndefined(custom.command)) {
      if (item.fragment === 'custom') {
        item.command = () => this.toRelatedInfo(custom.command() as any);
      }
    }
    return item;
  }
  toRelatedInfo(param: PathParamModel): void {}
}
