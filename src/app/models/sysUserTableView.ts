import { ViewBaseEntity } from 'app/core/components/base/viewBaseEntity';

export class SysUserTableView extends ViewBaseEntity {
  public id: string = null;
  public userName: string = null;
  public email: string = null;
  public normalizedEmail: string = null;
  public normalizedUserName: string = null;
  public phoneNumber: string = null;
  public name: string = null;
  public dateFormatId: string = null;
  public timeFormatId: string = null;
  public numberFormatId: string = null;
  public inActive: boolean = false;

  public languageId: string = null;

  public employeeMappingList: UserEmployeeMappingView[] = null;
}
export class UserEmployeeMappingView {
  public employeeTableGUID: string = null;
  public employeeId: string = null;
  public name: string = null;
  public userId: string = null;
  public companyGUID: string = null;
}
