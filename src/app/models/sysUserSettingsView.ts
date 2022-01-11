import { SysUserBranchMappingView } from '.';
import { AccessRightView } from './accessRightView';

export class SysUserSettingsItemView {
  public id: string = null;
  public userName: string = null;
  public email: string = null;
  public phoneNumber: string = null;
  public name: string = null;
  public dateFormatId: string = null;
  public timeFormatId: string = null;
  public numberFormatId: string = null;
  public inActive: boolean = false;
  public languageId: string = null;
  public showSystemLog: boolean = null;
  public defaultCompanyGUID: string = null;
  public defaultBranchGUID: string = null;
  public company_CompanyId: string = null;
  public branch_BranchId: string = null;
  public userImage: string = null;

  public accessRights: AccessRightView[] = null;
  public sysUserCompanyMappings: SysUserBranchMappingView[] = null;
}
