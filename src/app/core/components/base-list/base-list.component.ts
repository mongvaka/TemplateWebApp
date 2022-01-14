import { Operators, StorageKey } from './../../../shared/constants/constant';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  DataServiceModel,
  MessageModel,
  OptionModel,
  PageInformationModel,
  Paginator,
  PathParamModel,
  RowIdentity,
  SearchCondition,
  SearchParameter,
  SearchResult,
  SelectItems,
  TranslateModel,
} from '../../../shared/models/system_model';
import { BaseComponent } from '../base/base.component';
import { GatewayService } from '../../services/gateway.service';
import { AppInjector } from '../../../app-injector';
import {
  AccessMode,
  ACTION_PATH,
  ColumnType,
  EmptyUuid,
  SortType,
} from '../../../shared/constants';
import { AccessLevelModel } from '../../../models';
import { AccessLevel } from '../../../shared/constants';
import { interval, Observable } from 'rxjs';
import {
  cloneObject,
  getParentNodeByClass,
  isNullOrUndefined,
  switchAttribute,
} from '../../../shared/functions/value.function';
// import { FileService } from 'core/services/file.service';

@Component({
  selector: 'app-base-list',
  template: ` <p>base-list works!</p> `,
  styleUrls: ['./base-list.component.scss'],
})
export class BaseListComponent<T> extends BaseComponent {
  pageCustomOption: OptionModel;
  // fileService: FileService;
  @Input() set gridOption(param: OptionModel) {
    this.pageCustomOption = param;
  }
  public option: OptionModel = new OptionModel();
  searchResult: SearchResult<T>;
  conditions: SearchCondition[] = [];
  searchParam: SearchParameter;
  exportParam: SearchParameter;
  public canCreate = true;
  lastGetList: Observable<SearchResult<T>>;
  isOverlay = false;
  $baseGetList: Observable<SearchResult<T>>;
  parentId: string;
  accessRightChildPage: string;
  model: T = {} as T;
  @Output() multipleEmit = new EventEmitter<any>();
  @Output() cancelEmit = new EventEmitter<any>();

  constructor() {
    super();
    // this.fileService = AppInjector.get(FileService);
  }
  public onBaseSearch(e: any): void {
    this.searchParam = e;
  }
  //   public getExport(e: any, $getlist: Observable<SearchResult<T>>): void {
  //     $getlist.subscribe(
  //       (result) => {
  //         this.fileService.getResultDataToExcel(result, this.option);
  //       },
  //       (error) => {
  //         this.notificationService.showErrorMessageFromResponse(error);
  //       }
  //     );
  //   }
  public getResultDataToExport(data: any, option: any): void {}
  setBaseReadonly(data: any): void {}
  getReadonly(group: number[], id = null): boolean {
    return true;
  }
  getLogReadonly(group: number[] = [], id = null): void {}
  getCanCreate(): boolean {
    const path = this.router.url;
    const encode = localStorage.getItem(StorageKey.ACCESSRIGHT);
    if (encode === null) {
      return false;
    }
    const encodedData = JSON.parse(atob(encode));

    let canAccess = false;

    encodedData.forEach((item) => {
      if (JSON.parse(JSON.parse(JSON.stringify(item))).path === path) {
        canAccess = item.can_create;
      }
    });
    return canAccess;
    // return this.accessRight.create !== AccessLevel.None;
  }
  getCanView(): boolean {
    return this.accessRight.update !== AccessLevel.None;
  }
  getCanDelete(): boolean {
    return this.accessRight.delete !== AccessLevel.None;
  }
  getCanAction(): boolean {
    return this.accessRight.action !== AccessLevel.None;
  }

  onSearch($getlist: Observable<SearchResult<T>>): void {
    this.$baseGetList = $getlist;
    $getlist.subscribe(
      (result) => {
        this.searchResult = result as any;
        this.setDisableExport();
        if (!this.isOverlay) {
          this.isOverlay = true;
        }
      },
      (error) => {
        this.notificationService.showErrorMessageFromResponse(error);
      }
    );
  }
  onReload($getlist: Observable<SearchResult<T>>): void {
    $getlist.subscribe(
      (result) => {
        this.searchResult = result as any;
        this.setDisableExport();

        if (!this.isOverlay) {
          this.isOverlay = true;
        }
      },
      (error) => {
        this.notificationService.showErrorMessageFromResponse(error);
      }
    );
  }
  setGridOptionMapping(): void {
    if (!isNullOrUndefined(this.pageCustomOption)) {
      const keys = Object.keys(this.pageCustomOption);
      keys.forEach((key) => {
        if (
          key !== 'columns' &&
          !isNullOrUndefined(this.pageCustomOption[key])
        ) {
          this.option[key] = this.pageCustomOption[key];
        }
      });
      if (!isNullOrUndefined(this.pageCustomOption.columns)) {
        if (
          isNullOrUndefined(this.option.columns) ||
          this.option.columns.length === 0
        ) {
          this.option.columns = this.pageCustomOption.columns;
        } else {
          this.pageCustomOption.columns.forEach((customCol) => {
            const index = this.option.columns.findIndex(
              (f) =>
                f.textKey === customCol.textKey && f.label === customCol.label
            );
            if (index > -1) {
              this.pageCustomOption.columns.forEach((customCol) => {
                const index = this.option.columns.findIndex(
                  (f) =>
                    f.textKey === customCol.textKey &&
                    f.label === customCol.label
                );
                if (index > -1) {
                  const customColKey = Object.keys(customCol);
                  customColKey.forEach((k) => {
                    if (k !== 'masterList') {
                      this.option.columns[index][k] = customCol[k];
                    }
                  });
                } else {
                  this.option.columns.push(customCol);
                }
              });
            } else {
              this.option.columns.push(customCol);
            }
          });
        }
      }
    }
    this.setSearchParam();
  }
  setSearchParam(): void {
    const isAscs: boolean[] = [];
    const sortColumns: string[] = [];
    this.searchParam = new SearchParameter();
    this.option.columns.forEach((item) => {
      if (item.parentKey) {
        const condition = new SearchCondition();
        condition.columnName = item.textKey;
        condition.tableName = item.tableName;
        condition.feildName = item.fieldName;
        condition.equalityOperator = item.equalityOperator;
        condition.operator = item.operator;
        condition.values = item.values;
        condition.bracket = item.bracket;
        condition.sortKey = item.sortingKey;
        condition.sortType = item.sorting;
        condition.value = item.parentKey;
        this.conditions.push(condition);
        if (item.sortingKey !== null) {
          if (item.sorting === SortType.ASC) {
            isAscs.push(true);
          } else {
            isAscs.push(false);
          }
          sortColumns.push(item.sortingKey);
        }
      }
    });
    this.searchParam.searchCondition = this.conditions;
  }
  onCreate(row?: RowIdentity): void {
    const param: PathParamModel = {
      pageId: EmptyUuid,
      path: isNullOrUndefined(this.redirectPath)
        ? this.path
        : this.redirectPath,
    };
    this.toItem(param);
    // row.isChild ? this.toChildItem(param) : this.toItem(param);
  }
  onView(row: RowIdentity): void {
    const param: PathParamModel = {
      pageId: row.uuid,
      path: isNullOrUndefined(this.redirectPath)
        ? this.path
        : this.redirectPath,
    };
    this.toItem(param);

    // row.isChild ? this.toChildItem(param) : this.toItem(param);
  }
  onCreateStore(row: RowIdentity): void {
    const param: PathParamModel = { pageId: '-1', path: this.path };
    this.toItem(param);
  }
  onViewStore(row: RowIdentity): void {
    const param: PathParamModel = {
      pageId: `${row.rowIndex}`,
      path: this.path,
    };
    this.toItem(param);
  }
  onDelete(row: RowIdentity, $setDelete: Observable<boolean>): void {
    this.notificationService.showDeletionDialog();
    this.notificationService.isAccept.subscribe((isConfirm) => {
      if (isConfirm) {
        $setDelete.subscribe(
          (result) => {
            this.notificationService.showDeletedSuccess();
          },
          (error) => {
            this.notificationService.showErrorMessageFromResponse(error);
          },
          () => {
            this.onReload(this.$baseGetList);
          }
        );
      }
      this.notificationService.isAccept.observers = [];
    });
  }
  toItem(param: PathParamModel): void {
    param.action = ACTION_PATH.TOITEM;
    this.setRoutingGateway(param);
  }
  toChildItem(param: PathParamModel): void {
    param.action = ACTION_PATH.TOCHILDITEM;
    this.setRoutingGateway(param);
  }
  setExportParam(search: SearchParameter): void {
    this.searchParam = search;
    this.exportParam = cloneObject(search);
    this.exportParam.paginator.rows = -1;
  }
  checkAccessMode($getAccessRight: Observable<AccessLevelModel>): void {
    $getAccessRight.subscribe((result) => {
      this.accessRight = result;
    });
  }

  toAction(param: PathParamModel): void {
    param.action = ACTION_PATH.TOLISTFUN;
    if (!isNullOrUndefined(param.parameters)) {
      this.uiService.functionObject = param.parameters;
    }
    this.setRoutingGateway(param);
  }
  getRowAuthorize(model: any[]): void {
    model.forEach((item) => {
      item.rowAuthorize = this.getDeleteAccessLevelRowAuth(item);
    });
  }
  private getDeleteAccessLevelRowAuth(model: any): AccessMode {
    const props = Object.keys(model);
    if (props.includes('owner') && props.includes('ownerBusinessUnitGUID')) {
      const deleteAccessLevel: AccessLevel = this.accessRight.delete;
      switch (deleteAccessLevel) {
        case AccessLevel.None:
          return AccessMode.viewer;
        case AccessLevel.User:
          return model.owner === this.userAccessLevelParm.owner
            ? AccessMode.full
            : AccessMode.viewer;
        // case AccessLevel.BusinessUnit:
        //   return model.ownerBusinessUnitGUID === this.userAccessLevelParm.businessUnitGUID ? AccessMode.full : AccessMode.viewer;
        // case AccessLevel.ParentChildBU:
        //   return this.userAccessLevelParm.parentChildBU.includes(model.ownerBusinessUnitGUID) ? AccessMode.full : AccessMode.viewer;
        case AccessLevel.Company:
          return AccessMode.full;
        default:
          return AccessMode.viewer;
      }
    } else {
      return AccessMode.full;
    }
  }
  // call in override getRowAuthorize()
  getSingleRowAuthorize(businessRowAuth: AccessMode, model: any): AccessMode {
    const deleteAccessLevelRowAuth = this.getDeleteAccessLevelRowAuth(model);
    return businessRowAuth < deleteAccessLevelRowAuth
      ? businessRowAuth
      : deleteAccessLevelRowAuth;
  }
  private setDisableExport(): void {
    if (!isNullOrUndefined(this.searchParam)) {
      const inputs = document.getElementsByName(this.searchParam.tableKey);
      const panel = getParentNodeByClass(inputs[0], 'cust-panel');
      if (!isNullOrUndefined(panel)) {
        const btns = panel.querySelectorAll('.p-button-text');
        btns.forEach((btn: Element) => {
          if (btn.textContent === 'Export') {
            switchAttribute(
              btn,
              'disabled',
              '',
              this.searchResult.results.length === 0
            );
          }
        });
      }
    }
  }
}
