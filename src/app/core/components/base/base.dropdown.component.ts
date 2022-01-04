import { Operators } from './../../../shared/constants/constant';
import { Injectable } from '@angular/core';
import { AppInjector } from 'app/app-injector';
import { GatewayService } from 'app/core/services/gateway.service';
import { AppConst } from 'app/shared/constants';
import {
  isNullOrUndefined,
  isUndefinedOrZeroLength,
} from 'app/shared/functions/value.function';
import {
  SelectItems,
  SearchCondition,
  PageInformationModel,
  DataServiceModel,
  Paginator,
  SearchParameter,
} from 'app/shared/models/system_model';
import { Observable, interval } from 'rxjs';
import { BaseComponent } from './base.component';
import { BaseDropdownService } from './base.dropdown.service';
@Injectable({
  providedIn: 'root',
})
export class BaseDropdownComponent {
  private dataGateway: GatewayService;
  private service: BaseDropdownService;
  constructor() {
    this.dataGateway = AppInjector.get(GatewayService);
    this.service = AppInjector.get(BaseDropdownService);
  }
  setDropdownServicePath(param: PageInformationModel): void {
    this.service.setPath(param);
  }
  private getDropdownOption(
    $service: DataServiceModel,
    options?: SelectItems[]
    // ): Observable<SelectItems[]> {
  ): any {
    if (isNullOrUndefined(options)) {
      const paginator: Paginator = {
        page: 0,
        first: 0,
        rows: -1,
        pageCount: 0,
      };
      const search: SearchParameter = {
        searchCondition: isNullOrUndefined($service.conditions)
          ? []
          : $service.conditions,
        paginator,
      };
      return new Observable((observer) => {
        this.dataGateway.getHttpDropdown($service.url, search).subscribe(
          (result) => {
            observer.next(result);
          },
          (error) => {
            observer.error(error);
          },
          () => {
            observer.complete();
          }
        );
      });
    } else {
      let dataResult: SelectItems[] = [];
      let pageIndex = -300;
      let canReq = true;
      options.length = 0;
      const itemKeyConditionIndex = isNullOrUndefined($service.conditions)
        ? -1
        : $service.conditions.findIndex(
            (s) => s.columnName === AppConst.BINDING_ITEM
          );
      if (itemKeyConditionIndex > -1) {
        const paginator: Paginator = {
          page: pageIndex,
          first: 0,
          rows: 1,
          pageCount: 0,
        };
        const searchItem: SearchParameter = {
          searchCondition: [$service.conditions[itemKeyConditionIndex]],
          paginator,
        };
        $service.conditions.splice(itemKeyConditionIndex, 1);
        this.dataGateway.getHttpDropdown($service.url, searchItem).subscribe(
          (resultItem) => {
            resultItem.forEach((item) => {
              options.push(item);
            });
            console.log('thisResult : ', options);

            // tslint:disable-next-line:no-shadowed-variable
            const paginator: Paginator = {
              page: pageIndex,
              first: 0,
              rows: 300,
              pageCount: 0,
            };
            const search: SearchParameter = {
              searchCondition: $service.conditions,
              paginator,
            };
            const $interval = interval(500).subscribe((val) => {
              if (canReq) {
                paginator.page = paginator.page + 300;
                dataResult = [];
                canReq = false;
                this.dataGateway
                  .getHttpDropdown($service.url, search)
                  .subscribe(
                    (result) => {
                      dataResult = result;
                      if (dataResult.length < 300) {
                        $interval.unsubscribe();
                      }
                      result.forEach((item) => {
                        options.push(item);
                      });
                      canReq = true;
                      pageIndex++;
                    },
                    (error) => {
                      canReq = false;
                      $interval.unsubscribe();
                      // this.notificationService.showErrorMessageFromResponse(error);
                    }
                  );
              }
            });
          },
          (error) => {
            // this.notificationService.showErrorMessageFromResponse(error);
          }
        );
      } else {
        const paginator: Paginator = {
          page: pageIndex,
          first: 0,
          rows: 300,
          pageCount: 0,
        };
        const search: SearchParameter = {
          searchCondition: $service.conditions,
          paginator,
        };
        const $interval = interval(1500).subscribe((val) => {
          if (canReq) {
            paginator.page = paginator.page + 300;
            dataResult = [];
            canReq = false;
            this.dataGateway.getHttpDropdown($service.url, search).subscribe(
              (result) => {
                dataResult = result;
                if (dataResult.length < 300) {
                  $interval.unsubscribe();
                }
                result.forEach((item) => {
                  options.push(item);
                });
                canReq = true;
                pageIndex++;
              },
              (error) => {
                canReq = false;
                $interval.unsubscribe();
                // this.notificationService.showErrorMessageFromResponse(error);
              }
            );
          }
        });
      }
    }
  }
  private getEnumDropdownOption(
    $getDropdownList: SelectItems[],
    options: SelectItems[],
    filterBy?: number[]
  ): SelectItems[] {
    options.length = 0;
    if (!isUndefinedOrZeroLength(filterBy)) {
      $getDropdownList
        .filter((f) => filterBy.includes(f.value))
        .forEach((item) => {
          options.push(item);
        });
    } else {
      $getDropdownList.forEach((item) => {
        options.push(item);
      });
    }
    return options;
  }
  getRelatedItemCondition(keys: string[], values: string[]): SearchCondition[] {
    const conditions: SearchCondition[] = [];
    keys.forEach((item, index) => {
      const condition = new SearchCondition();
      condition.value = values[index];
      condition.columnName = item;
      conditions.push(condition);
    });
    return conditions;
  }
  getBranchDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getBranchDropDown(), options);
  }

  getTimeticket_transDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getTimeticket_transDropDown(),
      options
    );
  }
  getDepartmentDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getDepartmentDropDown(),
      options
    );
  }

  getAssessment_transDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getAssessment_transDropDown(),
      options
    );
  }

  getAccessRightsDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getAccessRightsDropDown(),
      options
    );
  }

  getAddressDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getAddressDropDown(), options);
  }

  getAssessmentTransDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getAssessmentTransDropDown(),
      options
    );
  }

  getBacktoworkDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getBacktoworkDropDown(),
      options
    );
  }

  getBlacklistDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getBlacklistDropDown(), options);
  }

  getCategoryDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getCategoryDropDown(), options);
  }

  getCertificateTransDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getCertificateTransDropDown(),
      options
    );
  }

  getCompanyDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getCompanyDropDown(), options);
  }

  getContactDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getContactDropDown(), options);
  }

  getCountryDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getCountryDropDown(), options);
  }

  getDistrictDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getDistrictDropDown(), options);
  }
  getDistrictByDropDown(
    keys: string[],
    values: string[],
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    const conditions: SearchCondition[] = this.getRelatedItemCondition(
      keys,
      values
    );
    return this.getDropdownOption(
      this.service.getDistrictDropDown(conditions),
      options
    );
  }
  getEducationDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getEducationDropDown(), options);
  }

  getEmergencyContactDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getEmergencyContactDropDown(),
      options
    );
  }

  getEmployeeDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getEmployeeDropDown(), options);
  }
  getReceiveDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getReceiveDropDown(), options);
  }
  getInspectDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getInspectDropDown(), options);
  }
  getSenderDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getSenderDropDown(), options);
  }
  getJobLevelDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getJobLevelDropDown(), options);
  }
  getStockreturnDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getStockreturnDropDown(),
      options
    );
  }
  getJobTransDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getJobTransDropDown(), options);
  }
  getLeaveTransDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getLeaveTransDropDown(),
      options
    );
  }
  getInventorytransectionDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getInventorytransectionDropDown(),
      options
    );
  }
  getLeaveTransTypeDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getLeaveTransTypeDropDown(),
      options
    );
  }

  getNationalityTabelDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getNationalityTabelDropDown(),
      options
    );
  }

  getPositionDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getPositionDropDown(), options);
  }
  getFielChangeDropdown(
    depId,
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getFielChangeDropdown(depId),
      options
    );
  }
  getPositionTarnsDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getPositionTarnsDropDown(),
      options
    );
  }

  getProvinceDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getProvinceDropDown(), options);
  }
  getProvinceByDropDown(
    keys: string[],
    values: string[],
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    const conditions: SearchCondition[] = this.getRelatedItemCondition(
      keys,
      values
    );
    return this.getDropdownOption(
      this.service.getProvinceDropDown(conditions),
      options
    );
  }
  getDocumentStatusByResignDropDown(
    keys: string[],
    values: string[],
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    const conditions: SearchCondition[] = this.getRelatedItemCondition(
      keys,
      values
    );
    return this.getDropdownOption(
      this.service.getDocumentStatusDropDown(conditions),
      options
    );
  }
  getDocumentStatusByLeaveTransDropDown(
    keys: string[],
    values: string[],
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    const conditions: SearchCondition[] = this.getRelatedItemCondition(
      keys,
      values
    );
    return this.getDropdownOption(
      this.service.getDocumentStatusDropDown(conditions),
      options
    );
  }
  getRoleDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getRoleDropDown(), options);
  }
  getDocmuentTemplate(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getDocmuentTemplate(), options);
  }
  getSalaryDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getSalaryDropDown(), options);
  }

  getStatusDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getStatusDropDown(), options);
  }

  getSubDistrictDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getSubDistrictDropDown(),
      options
    );
  }
  getSubDistrictByDropDown(
    keys: string[],
    values: string[],
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    const conditions: SearchCondition[] = this.getRelatedItemCondition(
      keys,
      values
    );
    return this.getDropdownOption(
      this.service.getSubDistrictDropDown(conditions),
      options
    );
  }
  getPositionByDropDown(
    keys: string[],
    values: string[],
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    const conditions: SearchCondition[] = this.getRelatedItemCondition(
      keys,
      values
    );
    return this.getDropdownOption(
      this.service.getPositionDropDown(conditions),
      options
    );
  }

  getTimeticketTransDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getTimeticketTransDropDown(),
      options
    );
  }
  getTrainingTransDetailDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getTrainingTransDetailDropDown(),
      options
    );
  }

  getTrainingTransDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getTrainingTransDropDown(),
      options
    );
  }

  getUserDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getUserDropDown(), options);
  }

  getWarningTransDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getWarningTransDropDown(),
      options
    );
  }
  getUnitDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getUnitDropDown(), options);
  }
  getGendarDropDown(options: SelectItems[]): void {
    this.getEnumDropdownOption(this.service.getGendarDropDown(), options);
  }
  getTemplateType(options: SelectItems[]): void {
    this.getEnumDropdownOption(this.service.getTemplateType(), options);
  }
  getTitleDropDown(options: SelectItems[]): void {
    this.getEnumDropdownOption(this.service.getTitleDropDown(), options);
  }
  getBankCategoreDropDown(options: SelectItems[]): void {
    this.getEnumDropdownOption(this.service.getBankCategoreDropDown(), options);
  }
  getMoveTypeDropDown(options: SelectItems[]): void {
    this.getEnumDropdownOption(this.service.getMoveTypeDropDown(), options);
  }
  getENUMEducationLevelDropDown(options: SelectItems[]): void {
    this.getEnumDropdownOption(
      this.service.getENUMEducationLevelDropDown(),
      options
    );
  }
  getEmployeeCategoryDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getEmployeeCategoryDropDown(),
      options
    );
  }

  getCustomerBranchDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getCustomerBranchDropDown(),
      options
    );
  }
  getCustomerCategoryDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getCustomerCategoryDropDown(),
      options
    );
  }
  getAssetsDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getAssetsDropDown(), options);
  }
  getAssetCategoryDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getAssetCategoryDropDown(),
      options
    );
  }
  getWorktimetypeDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getWorktimetypeDropDown(),
      options
    );
  }
  getNationalityDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getNationalityDropDown(),
      options
    );
  }
  getTimeticketDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getTimeticketDropDown(),
      options
    );
  }
  getEmployeeStatusDropDown(options: SelectItems[]): void {
    this.getEnumDropdownOption(
      this.service.getEmployeeStatusDropDown(),
      options
    );
  }

  getBookMarkTypeDropDown(options: SelectItems[]): void {
    this.getEnumDropdownOption(this.service.getBookMarkTypeDropDown(), options);
  }
  getWorktimetypeEnumDropDown(options: SelectItems[]): void {
    this.getEnumDropdownOption(
      this.service.getWorktimetypeEnumDropDown(),
      options
    );
  }
  getEmployeeTypeDropDown(options: SelectItems[]): void {
    this.getEnumDropdownOption(this.service.getEmployeeTypeDropDown(), options);
  }
  getMaritalStatusDropDown(options: SelectItems[]): void {
    this.getEnumDropdownOption(
      this.service.getMaritalStatusDropDown(),
      options
    );
  }
  getAssessmentTransTypeDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getAssessmentTransTypeDropDown(),
      options
    );
  }
  getCertificateTypeDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getCertificateTypeDropDown(),
      options
    );
  }
  getDocumentStatusDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getDocumentStatusDropDown(),
      options
    );
  }
  getDocumentStatusDropDownByAdjustPosition(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getDocumentStatusDropDownByAdjustPosition(),
      options
    );
  }
  getResponbyDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getResponbyDropDown(), options);
  }
  getOnsiteDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getOnsiteDropDown(), options);
  }
  getPurchaseHeaderDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getPurchaseHeaderDropDown(),
      options
    );
  }
  getJobDescriptionDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getJobDescriptionDropDown(),
      options
    );
  }

  getWelfareDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getWelfareDropDown(), options);
  }

  getRefTypeEnumDropDown(options: SelectItems[]): void {
    this.getEnumDropdownOption(this.service.getRefTypeEnumDropDown(), options);
  }
  getWelfareDetailDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getWelfareDetailDropDown(),
      options
    );
  }
  getResponsibilityDeviceDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getResponsibilityDeviceDropDown(),
      options
    );
  }
  getSalaryTransDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getSalaryTransDropDown(),
      options
    );
  }
  getContactPersonDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getContactPersonDropDown(),
      options
    );
  }
  getWarningTransTypeEnumDropDown(options: SelectItems[]): void {
    this.getEnumDropdownOption(
      this.service.getWarningTransTypeEnumDropDown(),
      options
    );
  }
  getSupplierCategoryDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getSupplierCategoryDropDown(),
      options
    );
  }
  getCompanyCategoryDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getCompanyCategoryDropDown(),
      options
    );
  }
  getSupplierBranchDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getSupplierBranchDropDown(),
      options
    );
  }
  getTransferTransDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getTransferTransDropDown(),
      options
    );
  }
  getProbationTransDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getProbationTransDropDown(),
      options
    );
  }
  getAccessDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getAccessDropDown(), options);
  }
  getSubscribeDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getSubscribeDropDown(), options);
  }
  getFeatureDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getFeatureDropDown(), options);
  }
  getContactTypeDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getContactTypeDropDown(),
      options
    );
  }
  getCustomerDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getCustomerDropDown(), options);
  }
  getSubscribeTransDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getSubscribeTransDropDown(),
      options
    );
  }
  getSysLanguageEnumDropDown(options: SelectItems[]): void {
    this.getEnumDropdownOption(
      this.service.getSysLanguageEnumDropDown(),
      options
    );
  }
  getOvertimeDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getOvertimeDropDown(), options);
  }
  getJobDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getJobDropDown(), options);
  }
  getBookBankDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getBookBankDropDown(), options);
  }
  getBankDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getBankDropDown(), options);
  }
  getPartDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getPartDropDown(), options);
  }
  getItemCategoryTabelDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getItemCategoryTabelDropDown(),
      options
    );
  }
  getStockcutDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getStockcutDropDown(), options);
  }
  getStockinDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getStockinDropDown(), options);
  }
  getStockoutDropDown(options?: SelectItems[]): Observable<SelectItems[]> {
    return this.getDropdownOption(this.service.getStockoutDropDown(), options);
  }
  getLegalPunishmentDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getLegalPunishmentDropDown(),
      options
    );
  }
  getEmployeeByDropDown(
    keys: string[],
    values: string[],
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    const conditions: SearchCondition[] = this.getRelatedItemCondition(
      keys,
      values
    );

    return this.getDropdownOption(
      this.service.getEmployeeDropDown(conditions),
      options
    );
  }

  getRevisionTimeTypeDropDown(options: SelectItems[]): void {
    this.getEnumDropdownOption(
      this.service.getRevisionTimeTypeDropDown(),
      options
    );
  }
  getWorkExperiencenDropDown(
    options?: SelectItems[]
  ): Observable<SelectItems[]> {
    return this.getDropdownOption(
      this.service.getWorkExperiencenDropDown(),
      options
    );
  }
  getDefaultBitDropDown(options: SelectItems[]): void {
    this.getEnumDropdownOption(this.service.getDefaultBitDropDown(), options);
  }
}
