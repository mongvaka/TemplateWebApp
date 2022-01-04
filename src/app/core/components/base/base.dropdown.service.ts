import { Injectable } from '@angular/core';
import { GatewayService } from 'app/core/services/gateway.service';
import {
  EDUCATION_LEVEL,
  EMPLOYEE_STATUS,
  GENDAR,
  MARNING_TRANS_TYPE,
  REFTYPE,
  SYS_LANGUAGE,
  TITLE,
  WORKTIMETYPE,
  EMPLOYEE_TYPE,
  BANK_CATEGORY,
  REVISION_TIME_TYPE,
  TEMPLATE_TYPE,
  MOVE_TYPE,
  MARITAL_STATUS,
  DEFAULT_BIT,
} from 'app/shared/constants';
import { transformLabel } from 'app/shared/functions/value.function';
import {
  DataServiceModel,
  PageInformationModel,
  SearchCondition,
  SearchParameter,
  SelectItems,
} from 'app/shared/models/system_model';
import { Url } from 'app/shared/url';

@Injectable({
  providedIn: 'root',
})
export class BaseDropdownService {
  servicePath = '';
  constructor(private dataGateway: GatewayService) {}
  setPath(param: PageInformationModel): void {
    this.servicePath = param.servicePath;
  }
  getBranchDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string = Url.base_url + `${this.servicePath}/GetBranchDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getPositionDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getPositionDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getFielChangeDropdown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getFielChangeDropdown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getTimeticket_transDropDown(
    conditions?: SearchCondition[]
  ): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getTimeticket_transDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getAssessment_transDropDown(
    conditions?: SearchCondition[]
  ): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getAssessment_transDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getDepartmentDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getDepartmentDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getAccessRightsDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getAccessRightsDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getAddressDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string = Url.base_url + `${this.servicePath}/getAddressDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getAssessmentTransDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getAssessmentTransDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getBacktoworkDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getBacktoworkDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getBlacklistDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getBlacklistDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getCategoryDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getCategoryDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getCertificateTransDropDown(
    conditions?: SearchCondition[]
  ): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getCertificateTransDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getCompanyDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string = Url.base_url + `${this.servicePath}/getCompanyDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getContactDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string = Url.base_url + `${this.servicePath}/getContactDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getCountryDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string = Url.base_url + `${this.servicePath}/getCountryDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getDistrictDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getDistrictDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getEducationDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getEducationDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getEmergencyContactDropDown(
    conditions?: SearchCondition[]
  ): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getEmergencyContactDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getEmployeeDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getEmployeeDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getReceiveDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string = Url.base_url + `${this.servicePath}/getReceiveDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getInspectDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string = Url.base_url + `${this.servicePath}/getInspectDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getSenderDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string = Url.base_url + `${this.servicePath}/getSenderDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getResponbyDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getEmployeeDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getJobLevelDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getJobLevelDropdown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getJobTransDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getJobTransDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getLeaveTransDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getLeaveTransDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getLeaveTransTypeDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getLeaveTransTypeDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getNationalityTabelDropDown(
    conditions?: SearchCondition[]
  ): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getNationalityTabelDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getPositionTarnsDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getPositionTarnsDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getProvinceDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getProvinceDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getRoleDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string = Url.base_url + `${this.servicePath}/getRoleDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getDocmuentTemplate(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getDocmuentTemplate`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getSalaryDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string = Url.base_url + `${this.servicePath}/getSalaryDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getStatusDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string = Url.base_url + `${this.servicePath}/getStatusDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getSubDistrictDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getSubDistrictDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getTimeticketTransDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getTimeticketTransDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getTrainingTransDetailDropDown(
    conditions?: SearchCondition[]
  ): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getTrainingTransDetailDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getTrainingTransDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getTrainingTransDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getUserDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string = Url.base_url + `${this.servicePath}/getUserDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getWarningTransDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getWarningTransDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getCustomerBranchDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getCustomerBranchDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getCustomerCategoryDropDown(
    conditions?: SearchCondition[]
  ): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getCustomerCategoryDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getUnitDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string = Url.base_url + `${this.servicePath}/getUnitDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getEmployeeCategoryDropDown(
    conditions?: SearchCondition[]
  ): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getEmployeeCategoryDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getWorktimetypeDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getWorktimetypeDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getGendarDropDown(): SelectItems[] {
    return transformLabel(GENDAR);
  }
  getTemplateType(): SelectItems[] {
    return transformLabel(TEMPLATE_TYPE);
  }
  getWarningTransTypeEnumDropDown(): SelectItems[] {
    return transformLabel(MARNING_TRANS_TYPE);
  }
  getEmployeeStatusDropDown(): SelectItems[] {
    return transformLabel(EMPLOYEE_STATUS);
  }
  getBookMarkTypeDropDown(): SelectItems[] {
    return transformLabel(TEMPLATE_TYPE);
  }
  getWorktimetypeEnumDropDown(): SelectItems[] {
    return transformLabel(WORKTIMETYPE);
  }
  getEmployeeTypeDropDown(): SelectItems[] {
    return transformLabel(EMPLOYEE_TYPE);
  }
  getMaritalStatusDropDown(): SelectItems[] {
    return transformLabel(MARITAL_STATUS);
  }
  getTitleDropDown(): SelectItems[] {
    return transformLabel(TITLE);
  }
  getBankCategoreDropDown(): SelectItems[] {
    return transformLabel(BANK_CATEGORY);
  }
  getRefTypeEnumDropDown(): SelectItems[] {
    return transformLabel(REFTYPE);
  }
  getENUMEducationLevelDropDown(): SelectItems[] {
    return transformLabel(EDUCATION_LEVEL);
  }
  getSysLanguageEnumDropDown(): SelectItems[] {
    return transformLabel(SYS_LANGUAGE);
  }
  getMoveTypeDropDown(): SelectItems[] {
    return transformLabel(MOVE_TYPE);
  }
  getRevisionTimeTypeDropDown(): SelectItems[] {
    return transformLabel(REVISION_TIME_TYPE);
  }
  getAssetsDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string = Url.base_url + `${this.servicePath}/getAssetsDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }

  getAssetCategoryDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getAssetCategoryDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getNationalityDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getNationalityDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getTimeticketDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getTimeticketDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  // getEmployeeStatusDropDown(conditions?: SearchCondition[]): DataServiceModel {
  //   const url: string =
  //     Url.base_url + `${this.servicePath}/getEmployeeStatusDropDown`;
  //   return this.dataGateway.getDropdown(url, conditions);
  // }
  getAssessmentTransTypeDropDown(
    conditions?: SearchCondition[]
  ): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getAssessmentTransTypeDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getCertificateTypeDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getCertificateTypeDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getDocumentStatusDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getDocumentStatusDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getDocumentStatusDropDownByAdjustPosition(
    conditions?: SearchCondition[]
  ): DataServiceModel {
    const url: string =
      Url.base_url +
      `${this.servicePath}/getDocumentStatusDropDownByAdjustPosition`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getOnsiteDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string = Url.base_url + `${this.servicePath}/getOnsiteDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getPurchaseHeaderDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getPurchaseHeaderDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getJobDescriptionDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getJobDescriptionDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getWelfareDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string = Url.base_url + `${this.servicePath}/getWelfareDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getWelfareDetailDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getWelfareDetailDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getResponsibilityDeviceDropDown(
    conditions?: SearchCondition[]
  ): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getResponsibilityDeviceDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getSupplierCategoryDropDown(
    conditions?: SearchCondition[]
  ): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getSupplierCategoryDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getSupplierBranchDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getSupplierBranchDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getContactPersonDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getContactPersonDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getCompanyCategoryDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getCompanyCategoryDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getSalaryTransDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getSalaryTransDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getTransferTransDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getTransferTransDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getProbationTransDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getProbationTransDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getAccessDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string = Url.base_url + `${this.servicePath}/getAccessDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getSubscribeDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getSubscribeDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getFeatureDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string = Url.base_url + `${this.servicePath}/getFeatureDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getSubscribeTransDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getSubscribeTransDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getContactTypeDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getContactTypeDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getCustomerDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getCustomerDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getOvertimeDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getOvertimeDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getJobDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string = Url.base_url + `${this.servicePath}/getJobDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getBookBankDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getBookBankDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getBankDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string = Url.base_url + `${this.servicePath}/getBankDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getInventorytransectionDropDown(
    conditions?: SearchCondition[]
  ): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getInventorytransectionDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getPartDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string = Url.base_url + `${this.servicePath}/getPartDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getItemCategoryTabelDropDown(
    conditions?: SearchCondition[]
  ): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getItemCategoryTabelDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getStockoutDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getStockoutDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getStockinDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string = Url.base_url + `${this.servicePath}/getStockinDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getStockcutDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getStockcutDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getStockreturnDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getStockreturnDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getWorkExperiencenDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getWorkExperiencenDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getLegalPunishmentDropDown(conditions?: SearchCondition[]): DataServiceModel {
    const url: string =
      Url.base_url + `${this.servicePath}/getLegalPunishmentDropDown`;
    return this.dataGateway.getDropdown(url, conditions);
  }
  getDefaultBitDropDown(): SelectItems[] {
    return transformLabel(DEFAULT_BIT);
  }
}
