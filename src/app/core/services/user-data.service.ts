import { Subject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
//import { OAuthStorage } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';
import { getEncryptionKey } from '../../shared/config/globalvar.config';
import { StorageKey, AppConst } from '../../shared/constants';
import * as crypto from 'crypto-js';
import {
  decryptObject,
  encryptObject,
  isNullOrUndefined,
  isUndefinedOrZeroLength,
} from 'app/shared/functions/value.function';
import { HttpClientService } from './httpclient.service';
import { AccessLevelModel, SysUserSettingsItemView } from 'app/models';
import { TranslateService } from '@ngx-translate/core';
import { access } from 'fs';
export const userAPI = {
  sysusertableUrl: 'sysusertable/',
  getUserDataUrl: 'SysUser/SysUserTableView/Get/',
  getcompaniesbyuserUrl: 'sysusercompanymapping/companies/',
  getUserSettingsUrl: 'SysUser/UserSettings/',
  updateusersettingsUrl: 'SysUser/UpdateSettings/',
};

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  userDataService() {
    throw new Error('Method not implemented.');
  }
  getDisplayNameSubject = new Subject<string>();
  getCompanyMappingSubject = new Subject<any>();
  getUserDataSubject = new Subject<any>();
  getFeatureRoleSubject = new Subject<any>();
  languageChangeSubject = new Subject<any>();
  staticCompanyBranchSelectorLoadedSubject = new Subject<any>();
  showCompanyBranchSelectorSubject = new Subject<any>();
  companyChangeSubject = new Subject<any>();
  userCompanyMappingUrl: string = userAPI.getcompaniesbyuserUrl;
  userDataUrl: string = userAPI.getUserDataUrl;
  userKey: any = ['id'];
  getUserSettingsUrl: string = userAPI.getUserSettingsUrl;
  updateUserDataUrl: string = 'http://localhost:5000/api/User/UpdateSettings';

  constructor(
    private httpService: HttpClientService,
    private translate: TranslateService
  ) {}
  //   constructor(private oAuthStorage: OAuthStorage, private httpService: HttpClientService) {}
  loadCompanyMapping(): Observable<SysUserSettingsItemView> {
    const userId = this.getUserIdFromToken();
    const url = `SysAccessRight/UserDefaultBranchCompanyMappings/${userId}`;
    return this.httpService.Get(url);
  }
  loadUserSettings(username): Observable<SysUserSettingsItemView> {
    const url = `${this.getUserSettingsUrl + username}`;
    return this.httpService.Get(url);
  }
  getCompanyBranchByCurrentUser(): Observable<any> {
    const userId = this.getUserIdFromToken();
    const url = `SysUser/GetUserSettingMappedBranchCompanyByUserName/${userId}`;
    return this.httpService.Get(url);
  }
  updateUserData(data: any): Observable<any> {
    const url = `${this.updateUserDataUrl}`;
    return this.httpService.Post(url, data);
  }

  getCurrentCompanyUUID(): string {
    return localStorage.getItem(StorageKey.COMPANYUUID);
  }

  getCurrentCompanyId(): string {
    return localStorage.getItem(StorageKey.COMPANY_ID);
  }
  setCurrentCompany(data: any): any {
    if (isUndefinedOrZeroLength(data)) {
      return;
    }
    if (!isUndefinedOrZeroLength(data.company_uuid)) {
      localStorage.setItem(StorageKey.COMPANYUUID, data.company_uuid);
    }
    if (!isUndefinedOrZeroLength(data.company_id)) {
      localStorage.setItem(StorageKey.COMPANY_ID, data.company_id);
    }
    this.setCurrentBranch(data);
  }
  getCurrentBranchGUID(): string {
    return localStorage.getItem(StorageKey.BRANCHUUID);
  }

  getCurrentBranchId(): string {
    return localStorage.getItem(StorageKey.BRANCH_ID);
  }

  setCurrentBranch(data: any): any {
    if (isUndefinedOrZeroLength(data)) {
      return;
    }
    if (!isUndefinedOrZeroLength(data.branch_uuid)) {
      localStorage.setItem(StorageKey.BRANCHUUID, data.branch_uuid);
    }
    if (!isUndefinedOrZeroLength(data.branch_id)) {
      localStorage.setItem(StorageKey.BRANCH_ID, data.branch_id);
    }
  }
  setCurrentSubscription(data: any): any {
    if (isUndefinedOrZeroLength(data)) {
      return;
    }
    const currentSubscription = {
      subscriptionUUID: data.subcription_uuid,
      subscriptionId: data.subscription_Id,
    };
    if (!isUndefinedOrZeroLength(currentSubscription.subscriptionUUID)) {
      StorageKey.SUBSCRIPTIONUUID = currentSubscription.subscriptionUUID;
    }
    if (!isUndefinedOrZeroLength(currentSubscription.subscriptionId)) {
      StorageKey.SUBSCRIPTION_ID = currentSubscription.subscriptionId;
    }
  }
  setAccessToken(result: any): any {
    if (isUndefinedOrZeroLength(result)) {
      return;
    }
    if (!isUndefinedOrZeroLength(result.access_token)) {
      localStorage.setItem(StorageKey.ACCESS_TOKEN, result.access_token);
    }
  }
  setRefreshToken(result: any): any {
    if (isUndefinedOrZeroLength(result)) {
      return;
    }
    if (!isUndefinedOrZeroLength(result.refresh_token)) {
      localStorage.setItem(StorageKey.REFRESH_TOKEN, result.refresh_token);
    }
  }
  setAccessFeature(result: any): any {
    if (isUndefinedOrZeroLength(result)) {
      return;
    }
    if (!isUndefinedOrZeroLength(result.access_feature)) {
      localStorage.setItem(StorageKey.ACCESSRIGHT, result.access_feature);
    }
  }
  getAccessFeature(): any {
    const encode = localStorage.getItem(StorageKey.ACCESSRIGHT);
    const encodedData = JSON.parse(atob(encode));
    encodedData.forEach((item) => {});
  }
  getAccessByPath(path: string): boolean {
    const correctPath = this.cleanPath(path);

    const encode = localStorage.getItem(StorageKey.ACCESSRIGHT);
    const encodedData = JSON.parse(atob(encode));

    let canAccess = false;
    encodedData.forEach((item) => {
      if (
        JSON.parse(JSON.parse(JSON.stringify(item))).path.trim() ===
        correctPath.trim()
      ) {
        canAccess = true;
      }
    });
    return canAccess;
  }
  cleanPath(path: string): string {
    const pathList = path.split('/');
    let pathStr = '';
    pathList.forEach((item) => {
      if (item.split('-').length === 5) {
        pathStr = pathStr + '/:id';
      } else {
        pathStr = pathStr + '/' + item;
      }
    });
    return pathStr.replace('//', '/');
  }
  loggedIn(): boolean {
    const log = localStorage.getItem(StorageKey.ACCESS_TOKEN) !== null;

    return log;
  }
  getAccessToken(): any {
    return localStorage.getItem(StorageKey.ACCESS_TOKEN);
  }
  getRefreshToken(): any {
    return localStorage.getItem(StorageKey.REFRESH_TOKEN);
  }
  getCurrentSubscription(): string {
    return StorageKey.SUBSCRIPTION_ID;
  }
  getIsActive(): string {
    return StorageKey.IS_ACTIVE;
  }
  setIsActive(data: any): any {
    if (isUndefinedOrZeroLength(data)) {
      return;
    }
    const currentis_active = {
      is_active: data.is_active,
    };
    if (!isUndefinedOrZeroLength(currentis_active.is_active)) {
      StorageKey.IS_ACTIVE = currentis_active.is_active;
    }
  }
  getAppLanguage(): string {
    return localStorage.getItem(StorageKey.USER_LANGUAGE);
  }
  setAppLanguage(languageId: string): void {
    localStorage.setItem(StorageKey.USER_LANGUAGE, languageId);
  }
  getEmployeeUUID(): string {
    return localStorage.getItem(StorageKey.USER_EMPLOYEEUUID);
  }
  setEmployeeUUID(EmployeeId: string): void {
    localStorage.setItem(StorageKey.USER_EMPLOYEEUUID, EmployeeId);
  }
  getUserDepartment(): string {
    return localStorage.getItem(StorageKey.USER_DEPARTMENTUUID);
  }
  setUserDepartment(DepartmentId: string): void {
    localStorage.setItem(StorageKey.USER_DEPARTMENTUUID, DepartmentId);
  }

  getUserID(): string {
    return localStorage.getItem(StorageKey.User_ID);
  }
  setUserID(userID: string): void {
    localStorage.setItem(StorageKey.User_ID, userID);
  }
  getShowSystemLog(): string {
    return localStorage.getItem(StorageKey.SHOW_LOG);
  }
  setShowSystemLog(showLog: string): void {
    localStorage.setItem(StorageKey.SHOW_LOG, showLog);
  }
  getDisplayName(): any {
    // const token = this.oAuthStorage.getItem(StorageKey.ACCESS_TOKEN);

    // const tokenPayload: any = !isNullOrUndefined(token) ? jwt_decode(token) : null;

    const token = StorageKey.ACCESS_TOKEN;

    const tokenPayload: any = !isNullOrUndefined(token)
      ? jwt_decode(token)
      : null;

    const name = tokenPayload !== null ? tokenPayload.name : null;
    const username = tokenPayload !== null ? tokenPayload.username : null;
    return name != null ? name : username;
  }
  getUserImageContent(): string {
    return localStorage.getItem(StorageKey.USER_IMAGE);
  }
  // base64 content with data mime type
  setUserImageContent(img: any): void {
    localStorage.setItem(StorageKey.USER_IMAGE, img.user_image);
  }
  /*
   * Get/Set site login
   */
  getSiteLogin(): string {
    const fromStorage = localStorage.getItem(StorageKey.SITE_LOGIN);
    if (isUndefinedOrZeroLength(fromStorage)) {
      return null;
    } else {
      const key = getEncryptionKey();
      let site = decryptObject(key, fromStorage);
      if (!isUndefinedOrZeroLength(site)) {
        return site;
      } else {
        return null;
      }
    }
  }
  setSiteLogin(site: string): void {
    const key = getEncryptionKey();
    //const item = encryptObject(key, site);
    const item = key;
    localStorage.setItem(StorageKey.SITE_LOGIN, item);
  }
  clearUsageData(): void {
    localStorage.removeItem(StorageKey.DROPDOWN_CACHE);
  }
  getUsernameFromToken(): string {
    const tokenPayload: any = jwt_decode(StorageKey.ACCESS_TOKEN);
    if (!isNullOrUndefined(tokenPayload)) {
      return tokenPayload.username;
    }
    return null;
  }

  getUserIdFromToken(): any {
    const tokenPayload: any = jwt_decode(StorageKey.ACCESS_TOKEN);
    if (!isNullOrUndefined(tokenPayload)) {
      return tokenPayload.usubj;
    }
    return null;
  }
  getInactiveUser(): boolean {
    const fromStorage = localStorage.getItem(StorageKey.INACTIVE_USER);
    if (isUndefinedOrZeroLength(fromStorage)) {
      return true;
    } else {
      const key = getEncryptionKey();
      const inactiveUser = decryptObject(key, fromStorage);
      if (!isUndefinedOrZeroLength(inactiveUser)) {
        return inactiveUser === AppConst.TRUE ? true : false;
      } else {
        return false;
      }
    }
  }
  setInactiveUser(inactiveUser: string): void {
    const key = getEncryptionKey();
    const item = encryptObject(key, inactiveUser);
    localStorage.setItem(StorageKey.INACTIVE_USER, item);
  }
  setUsername(username: string): void {
    const key = getEncryptionKey();
    const item = encryptObject(key, username);
    localStorage.setItem(StorageKey.USER_NAME, item);
  }
  getUsername(): any {
    const fromStorage = localStorage.getItem(StorageKey.USER_NAME);
    if (isUndefinedOrZeroLength(fromStorage)) {
      return true;
    } else {
      const key = getEncryptionKey();
      const username = decryptObject(key, fromStorage);
      if (!isUndefinedOrZeroLength(username)) {
        return username;
      } else {
        return null;
      }
    }
  }
  setFullName(fullname: string): void {
    const key = getEncryptionKey();
    const item = encryptObject(key, fullname);
    localStorage.setItem(StorageKey.FULLNAME, item);
  }
  getFullName(): any {
    const fromStorage = localStorage.getItem(StorageKey.FULLNAME);
    if (isUndefinedOrZeroLength(fromStorage)) {
      return true;
    } else {
      const key = getEncryptionKey();
      const fullname = decryptObject(key, fromStorage);
      if (!isUndefinedOrZeroLength(fullname)) {
        return fullname;
      } else {
        return null;
      }
    }
  }

  // getEmployeeUUID(){
  //   return localStorage.getItem("EmployeeUUID");
  // }
  // setEmplayeeUUID(employee: any){
  //   localStorage.setItem("EmployeeUUID", employee);
  // }

  checkCanAccessByLabel(label: string): boolean {
    const encode = localStorage.getItem(StorageKey.ACCESSRIGHT);
    if (encode === null) {
      return false;
    }
    const encodedData = JSON.parse(atob(encode));

    let canAccess = false;
    encodedData.forEach((item) => {
      if (
        JSON.parse(JSON.parse(JSON.stringify(item))).feature_label === label
      ) {
        canAccess = true;
      }
    });
    return canAccess;
  }
  checkCanAccessByLabelTranslate(label: string): boolean {
    const encode = localStorage.getItem(StorageKey.ACCESSRIGHT);
    if (encode === null) {
      return false;
    }
    const encodedData = JSON.parse(atob(encode));

    let canAccess = false;

    encodedData.forEach((item) => {
      if (
        JSON.parse(JSON.parse(JSON.stringify(item))).feature_label ===
        'LABEL.' + label
      ) {
        canAccess = true;
      }
    });
    return canAccess;
  }
}
