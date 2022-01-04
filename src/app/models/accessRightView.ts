import { AccessLevel } from 'app/shared/constants/enum_system';
import { SysUserSettingsItemView } from './sysUserSettingsView';

export class AccessRightView {
  // accessRight: number = 0;
  companyUUID: string = null;
  // roleUUID: string = null;
  sysFeatureTableUUID: string = null;
  sysFeatureTable_FeatureId: string = null;
  sysFeatureTable_ParentFeatureId: string = null;
  sysFeatureTable_Path: string = null;
  sysRoleTable_SiteLoginType: number = null;
  accessLevels: AccessLevelModel = null; // action, read, update, create, delete
}

export class UserLogonView {
  initDataCheck: SystemInitDataCheck = null;
  user: SysUserSettingsItemView = null;
  companyBranch: CompanyBranchView = null;
}

export class SystemInitDataCheck {
  hasAnyCompany: boolean = false;
  hasAnySysUserTable: boolean = false;
}

export class CompanyBranchView {
  companyUUID: string = null;
  companyId: string = null;
  branchUUID: string = null;
  branchId: string = null;
}

export class AccessRightWithCompanyBranchView {
  accessRight: AccessRightView[] = null;
  companyBranch: CompanyBranchView = null;
}

export class AccessLevelModel {
  action: AccessLevel = 0;
  read: AccessLevel = 0;
  update: AccessLevel = 0;
  create: AccessLevel = 0;
  delete: AccessLevel = 0;
}

export class AccessRightBU {
  accessRight: AccessRightView[] = null;
  parentChildBU: string[] = null;
  businessUnitUUID: string = null;
  businessUnitId: string = null;
}

export class UserAccessLevelParm {
  owner: string = null;
  businessUnitUUID: string = null;
  parentChildBU: string[] = null;
}
