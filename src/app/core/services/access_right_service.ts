import { Injectable } from '@angular/core';

import { Subject, of, Observable, BehaviorSubject } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  ActivatedRoute,
  Router,
} from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

import { tap, catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import {
  decryptObject,
  encryptObject,
  getTranslateMessage,
  isNullOrUndefined,
  isSiteValid,
  isUndefinedOrZeroLength,
  isZero,
} from 'app/shared/functions/value.function';
import { getEncryptionKey } from 'app/shared/config/globalvar.config';
import { AccessMode, AppConst, StorageKey } from 'app/shared/constants';
import { MenuItem, TreeNode } from 'app/shared/models/prime_model';
import { HttpClientService } from './httpclient.service';
import { UserDataService } from './user-data.service';
import { UIControllerService } from './uiController.service';
import { NotificationService } from './notificaton.service';
import {
  AccessLevelModel,
  AccessRightView,
  AccessRightWithCompanyBranchView,
  CompanyBranchView,
  SysUserSettingsItemView,
  UserLogonView,
} from 'app/models';

export const userAPI = {
  getfeaturerolesbyuseridUrl: 'SysAccessRight/SysFeatureRoleView/GetByUser/', // +'userId'
  getuseraccessrightatlogin:
    'SysAccessRight/UserDefaultBranchCompanyAccessRight/', // + 'userId'
  getuseraccessrightcashier: 'SysAccessRight/UserAccessRightCashier/', // + 'userId'
  getuseraccessrightbycompany: 'SysAccessRight/UserAccessRightByCompany/', // + 'userId/companyguid'
  getuserlogonviewbycompany: 'SysAccessRight/UserLogonViewByCompany/', // + 'userId/companyguid'
};

export class RouteAndOutlet {
  outlet: string = null;
  route: string = null;
}

@Injectable({
  providedIn: 'root',
})
export class AccessRightService {
  sysAccessRight = [];
  tree: TreeNode[] = [];

  accessRightLoadedSubject = new Subject<any>();
  secretSiteAcessRightLoadedSubject = new Subject<any>();

  siteAndCompanyBranchSelected = new BehaviorSubject<boolean>(false);

  errorCode: string;
  errorParams: string[];
  constructor(
    private http: HttpClient,
    private location: Location,
    private httpService: HttpClientService,
    private userDataService: UserDataService,
    private uiService: UIControllerService,
    //private authService: AuthService,
    private translateService: TranslateService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  loadUserAccessRightAtLogin(
    userId,
    site,
    companyGUID = null
  ): Observable<any> {
    return this.loadUserDataAccessRight(userId, site, companyGUID).pipe(
      tap((result: UserLogonView) => {
        const user = result.user;
        const initDataCheck = result.initDataCheck;
        // set accessRight, site, user language, showLog, company/branch to storage
        this.userDataService.setSiteLogin(site);
        if (!isUndefinedOrZeroLength(user)) {
          if (!isUndefinedOrZeroLength(user.accessRights)) {
            const encKey = getEncryptionKey();
            const item = encryptObject(
              encKey,
              JSON.stringify(user.accessRights)
            );
            localStorage.setItem(StorageKey.ACCESSRIGHT, item);
          } else {
            localStorage.removeItem(StorageKey.ACCESSRIGHT);
          }
          // inactive user
          if (user.inActive) {
            this.userDataService.setInactiveUser(AppConst.TRUE);
          } else {
            this.userDataService.setInactiveUser(AppConst.FALSE);
          }

          // set current company/branch
          if (companyGUID === null) {
            this.setUserDefaultBranchCompanyToCurrent(user, site);
          } else {
            this.setCurrentCompanyBranchByCompanyBranchView(
              result.companyBranch,
              site
            );
          }

          // user language
          if (!isUndefinedOrZeroLength(user.languageId)) {
            this.userDataService.setAppLanguage(user.languageId);
            this.translateService.use(user.languageId);
            this.userDataService.languageChangeSubject.next(true);
          }
          // show system log
          if (!isUndefinedOrZeroLength(user.showSystemLog)) {
            this.userDataService.setShowSystemLog(
              user.showSystemLog ? AppConst.TRUE : AppConst.FALSE
            );
          } else {
            this.userDataService.setShowSystemLog('false');
          }
          // user image
          if (!isUndefinedOrZeroLength(user.userImage)) {
            this.userDataService.setUserImageContent(
              `data:image/png;base64,${user.userImage}`
            );
          }
          // set username
          localStorage.setItem(StorageKey.USER_NAME, 'test');
        } else {
          // result = null
          localStorage.removeItem(StorageKey.ACCESSRIGHT);
        }
        // check data initialization
        if (!initDataCheck.hasAnyCompany) {
          this.router.navigate([`/initdata`], { skipLocationChange: true });
        } else {
          this.accessRightLoadedSubject.next(true);
        }
      }),
      catchError((error) => {
        this.userDataService.setSiteLogin(site);
        if (!isUndefinedOrZeroLength(error)) {
          if (error.status === 401) {
            this.siteAndCompanyBranchSelected.next(false);
            //this.authService.setDisplaySubject.next(false);
          } else if (error.status === 0) {
            this.siteAndCompanyBranchSelected.next(false);
            //this.authService.setDisplaySubject.next(false);
          } else if (error.status === 400 || error.status === 500) {
            this.notificationService.showErrorMessageFromResponse(error);
          }
        }
        localStorage.removeItem(StorageKey.ACCESSRIGHT);
        this.accessRightLoadedSubject.next(error);
        return of([]);
      })
    );
  }
  // load access right after company/branch selected
  loadUserAccessRight(userId): Observable<any> {
    return this.loadAccessRight(userId).pipe(
      tap((result) => {
        this.setAccessRightToStorage(result.accessRight);
        // this.setBusinessUnitGUIDToStorage(result.businessUnitGUID);
        // this.setBusinessUnitIdToStorage(result.businessUnitId);
        // this.setParentChildBUToStorage(result.parentChildBU);

        this.siteAndCompanyBranchSelected.next(true);
        this.accessRightLoadedSubject.next(true);
      }),
      catchError((error) => {
        if (!isUndefinedOrZeroLength(error)) {
          if (error.status === 400 || error.status === 500) {
            this.notificationService.showErrorMessageFromResponse(error);
          }
        }
        localStorage.removeItem(StorageKey.ACCESSRIGHT);
        this.siteAndCompanyBranchSelected.next(true);
        this.accessRightLoadedSubject.next(error);
        return of([]);
      })
    );
  }
  // load access right by company from workflow
  loadUserAccessRightByCompany(
    userId: string,
    companyGUID: string
  ): Observable<any> {
    return this.loadAccessRightByCompany(userId, companyGUID).pipe(
      tap((result) => {
        if (!isUndefinedOrZeroLength(result)) {
          this.setAccessRightToStorage(result.accessRight);
          if (!isUndefinedOrZeroLength(result.companyBranch)) {
            const site = this.userDataService.getSiteLogin();
            if (site === AppConst.BACK) {
              result.companyBranch.branchId = null;
              result.companyBranch.branchUUID = null;
            }
          }
          this.userDataService.setCurrentCompany(result.companyBranch);
        }

        this.siteAndCompanyBranchSelected.next(true);
        this.accessRightLoadedSubject.next(true);
        //this.authService.setDisplaySubject.next(true);
      }),
      catchError((error) => {
        if (!isUndefinedOrZeroLength(error)) {
          if (error.status === 400 || error.status === 500) {
            this.notificationService.showErrorMessageFromResponse(error);
          }
        }
        localStorage.removeItem(StorageKey.ACCESSRIGHT);
        this.siteAndCompanyBranchSelected.next(true);
        this.accessRightLoadedSubject.next(error);
        return of([]);
      })
    );
  }
  // load access right for site ob
  loadUserAccessRightForOB(
    userId: string
  ): Observable<AccessRightWithCompanyBranchView> {
    return this.loadAccessRightForOB(userId).pipe(
      tap((result) => {
        if (!isUndefinedOrZeroLength(result)) {
          this.setAccessRightToStorage(result.accessRight);
          this.userDataService.setSiteLogin(AppConst.OB);
          if (!isUndefinedOrZeroLength(result.companyBranch)) {
            result.companyBranch.branchId = null;
            result.companyBranch.branchUUID = null;
          }
          this.userDataService.setCurrentCompany(result.companyBranch);
        }
        this.siteAndCompanyBranchSelected.next(true);
        this.accessRightLoadedSubject.next(true);
        this.secretSiteAcessRightLoadedSubject.next(true);
      }),
      catchError((error) => {
        if (!isUndefinedOrZeroLength(error)) {
          if (error.status === 400 || error.status === 500) {
            this.notificationService.showErrorMessageFromResponse(error);
          }
        }
        localStorage.removeItem(StorageKey.ACCESSRIGHT);
        this.siteAndCompanyBranchSelected.next(true);
        this.accessRightLoadedSubject.next(error);
        throw error;
      })
    );
  }

  checkExistingUser(userId: string, userName: string): Observable<any> {
    const url: string = `SysUser/CheckExistingUser`;
    return this.httpService.Post(url, { userName: userName, id: userId });
  }
  // load at login (with no stored branch,company)
  // companyGUID !== null => case companyGUID from workflow
  loadUserDataAccessRight(
    userId,
    site,
    companyGUID = null
  ): Observable<UserLogonView> {
    const url =
      !isUndefinedOrZeroLength(companyGUID) && site !== AppConst.CASHIER
        ? `${userAPI.getuserlogonviewbycompany}${userId}/${companyGUID}`
        : site === AppConst.CASHIER
        ? `${userAPI.getuseraccessrightcashier}${userId}`
        : `${userAPI.getuseraccessrightatlogin}${userId}`;
    return this.httpService.Get(url, { headers: { SiteHeader: site } });
  }

  // load access right with explicit input company (use with workflow)
  loadAccessRightByCompany(
    userId: string,
    companyGUID: string
  ): Observable<AccessRightWithCompanyBranchView> {
    const url: string = `${userAPI.getuseraccessrightbycompany}${userId}/${companyGUID}`;
    const site: string = this.userDataService.getSiteLogin();
    return this.httpService.Get(url, { headers: { SiteHeader: site } });
  }

  // load access right for ob site
  loadAccessRightForOB(
    userId: string
  ): Observable<AccessRightWithCompanyBranchView> {
    const url: string = `SysAccessRight/UserAccessRightForOB/${userId}`;
    return this.httpService.Get(url, { headers: { SiteHeader: AppConst.OB } });
  }
  setAccessRightToStorage(result: AccessRightView[]): void {
    if (!isUndefinedOrZeroLength(result)) {
      const encKey = getEncryptionKey();
      const item = encryptObject(encKey, JSON.stringify(result));
      localStorage.setItem(StorageKey.ACCESSRIGHT, item);
    } else {
      localStorage.removeItem(StorageKey.ACCESSRIGHT);
    }
  }
  // setBusinessUnitGUIDToStorage(result: string): void {
  //   if (!isUndefinedOrZeroLength(result)) {
  //     const encKey = getEncryptionKey();
  //     const item = encryptObject(encKey, JSON.stringify(result));
  //     localStorage.setItem(StorageKey.BUSINESSUNITGUID, item);
  //   } else {
  //     localStorage.removeItem(StorageKey.BUSINESSUNITGUID);
  //   }
  // }
  // setBusinessUnitIdToStorage(result: string): void {
  //   if (!isUndefinedOrZeroLength(result)) {
  //     const encKey = getEncryptionKey();
  //     const item = encryptObject(encKey, JSON.stringify(result));
  //     localStorage.setItem(StorageKey.BUSINESSUNIT_ID, item);
  //   } else {
  //     localStorage.removeItem(StorageKey.BUSINESSUNIT_ID);
  //   }
  // }
  // setParentChildBUToStorage(result: string[]): void {
  //   if (!isUndefinedOrZeroLength(result)) {
  //     const encKey = getEncryptionKey();
  //     const item = encryptObject(encKey, JSON.stringify(result));
  //     localStorage.setItem(StorageKey.PARENTCHILDBU, item);
  //   } else {
  //     localStorage.removeItem(StorageKey.PARENTCHILDBU);
  //   }
  // }
  setUserDefaultBranchCompanyToCurrent(
    user: SysUserSettingsItemView,
    site: string
  ): void {
    // default company/branch
    if (site !== AppConst.CASHIER) {
      if (!isUndefinedOrZeroLength(user.defaultCompanyGUID)) {
        const defaultBC = {
          companyId: user.company_CompanyId,
          companyGUID: user.defaultCompanyGUID,
          branchId: user.branch_BranchId,
          branchGUID: user.defaultBranchGUID,
        };
        if (!isUndefinedOrZeroLength(user.defaultBranchGUID)) {
          if (site === AppConst.BACK) {
            defaultBC.branchId = null;
            defaultBC.branchGUID = null;
          }
          this.userDataService.setCurrentCompany(defaultBC);
          //this.authService.setDisplaySubject.next(true);
          this.siteAndCompanyBranchSelected.next(true);
        } else {
          if (site === AppConst.BACK) {
            this.userDataService.setCurrentCompany(defaultBC);
            //this.authService.setDisplaySubject.next(true);
            this.siteAndCompanyBranchSelected.next(true);
          }
        }
      }
    }
  }
  setCurrentCompanyBranchByCompanyBranchView(
    input: CompanyBranchView,
    site: string
  ): void {
    if (!isUndefinedOrZeroLength(input)) {
      if (site !== AppConst.CASHIER) {
        if (!isUndefinedOrZeroLength(input.companyUUID)) {
          if (!isUndefinedOrZeroLength(input.branchUUID)) {
            if (site === AppConst.BACK) {
              input.branchId = null;
              input.branchUUID = null;
            }
            this.userDataService.setCurrentCompany(input);
            //this.authService.setDisplaySubject.next(true);
            this.siteAndCompanyBranchSelected.next(true);
          } else {
            if (site === AppConst.BACK) {
              this.userDataService.setCurrentCompany(input);
              //this.authService.setDisplaySubject.next(true);
              this.siteAndCompanyBranchSelected.next(true);
            }
          }
        }
      }
    }
  }
  // call from component
  getAccessRight(): Observable<AccessLevelModel> {
    console.log('param : ', this.router.url);

    return of(new AccessLevelModel());
    // if (
    //   isUndefinedOrZeroLength(sessionStorage.getItem(StorageKey.SYSFEATUREROLE))
    // ) {
    //   return of(null);
    // }
    // const encKey = getEncryptionKey();
    // const storeItem = decryptObject(
    //   encKey,
    //   sessionStorage.getItem(StorageKey.SYSFEATUREROLE)
    // );
    // const fromActivatedPath = JSON.parse(storeItem);
    // // not found in sessionStorage
    // if (isUndefinedOrZeroLength(fromActivatedPath)) {
    //   return of(null);
    // }

    // const sysFeatureRole = this.getActivatedFeatureRole(
    //   fromActivatedPath,
    //   false
    // );
    // const isAttachment =
    //   sysFeatureRole.sysFeatureTable_Path.split('/').pop() === 'attachment';
    // if (!isAttachment) {
    //   sessionStorage.removeItem(StorageKey.SYSFEATUREROLE);
    // }
    // sessionStorage.removeItem(StorageKey.TABFEATUREROLES);
    // if (isUndefinedOrZeroLength(sysFeatureRole)) {
    //   return of(null);
    // } else {
    //   return of(sysFeatureRole.accessLevels);
    // }
  }
  // // call from component
  // getAccessRight(): number {
  //     if (isUndefinedOrZeroLength(sessionStorage.getItem(StorageKey.SYSFEATUREROLE))) {
  //         return AccessMode.noAccess;
  //     }
  //     const encKey = getEncryptionKey();
  //     const storeItem = decryptObject(encKey,
  //         sessionStorage.getItem(StorageKey.SYSFEATUREROLE));
  //     const fromActivatedPath = JSON.parse(storeItem);
  //     // not found in sessionStorage
  //     if (isUndefinedOrZeroLength(fromActivatedPath)) {
  //         return AccessMode.noAccess;
  //     }

  //     const sysFeatureRole = this.getActivatedFeatureRole(fromActivatedPath, false);
  //     const isAttachment = sysFeatureRole.sysFeatureTable_Path.split('/').pop() === 'attachment';
  //     if (!isAttachment) {
  //         sessionStorage.removeItem(StorageKey.SYSFEATUREROLE);
  //     }
  //     sessionStorage.removeItem(StorageKey.TABFEATUREROLES);
  //     if (isUndefinedOrZeroLength(sysFeatureRole)) {
  //         return AccessMode.noAccess;
  //     }
  //     else {
  //         return sysFeatureRole.accessRight;
  //     }
  // }

  // call from component with child component (e.g. item with list)
  getNestedComponentAccessRight(
    isChild: boolean,
    componentName: string = ''
  ): Observable<AccessLevelModel> {
    const encKey = getEncryptionKey();
    if (
      isUndefinedOrZeroLength(sessionStorage.getItem(StorageKey.SYSFEATUREROLE))
    ) {
      return of(null);
    }
    const storeItem = decryptObject(
      encKey,
      sessionStorage.getItem(StorageKey.SYSFEATUREROLE)
    );
    const fromActivatedPath = JSON.parse(storeItem);
    // not found in sessionStorage
    if (isUndefinedOrZeroLength(fromActivatedPath)) {
      return of(null);
    }
    const sysFeatureRole = this.getActivatedFeatureRole(
      fromActivatedPath,
      isChild,
      componentName
    );

    if (isUndefinedOrZeroLength(sysFeatureRole)) {
      return of(null);
    } else {
      return of(sysFeatureRole.accessLevels);
    }
  }

  getActivatedRoutePath(activatedRoute: ActivatedRouteSnapshot): string {
    // get only from primary outlet
    const routeAndOutlets = this.getRouteAndOutlet(activatedRoute.pathFromRoot);
    if (isUndefinedOrZeroLength(routeAndOutlets)) {
      return null;
    }
    const activatedPath = routeAndOutlets[0].route;
    return activatedPath;
  }

  loadTree(site: string): Observable<TreeNode[]> {
    const link: string = `/assets/auth_data/auth_group_tree_${site}.json`;
    return this.http.get<TreeNode[]>(this.location.prepareExternalUrl(link));
  }

  loadMenuStructure(site: string): Observable<MenuItem[]> {
    const link: string = `/assets/layout/menus/${site}.json`;
    return this.http.get<MenuItem[]>(this.location.prepareExternalUrl(link));
  }
  // check if there's any access right at all
  hasAnyAccessRight(): boolean {
    const fromLocalStorage = localStorage.getItem(StorageKey.ACCESSRIGHT);
    if (isUndefinedOrZeroLength(fromLocalStorage)) {
      return false;
    } else {
      return true;
    }
  }
  isPermittedByAccessRight(): boolean {
    if (this.userDataService.getInactiveUser()) {
      return false;
    }
    return this.hasAnyAccessRight();
  }
  isPermittedBySite(): boolean {
    const site = this.uiService.currentSite;
    const loginSite = this.userDataService.getSiteLogin();
    if (!isUndefinedOrZeroLength(loginSite) && !isUndefinedOrZeroLength(site)) {
      if (!isSiteValid(site) || !isSiteValid(loginSite)) {
        return false;
      } else {
        if (site !== loginSite) {
          return false;
        } else {
          return true;
        }
      }
    } else if (
      !isUndefinedOrZeroLength(loginSite) &&
      isUndefinedOrZeroLength(site)
    ) {
      return isSiteValid(loginSite);
    } else {
      return false;
    }
  }
  getActivatedFeatureRole(
    sysFeatureRole: any[],
    isChild: boolean,
    componentName: string = ''
  ): any {
    // no access
    if (isUndefinedOrZeroLength(sysFeatureRole)) {
      return null;
    } else {
      // TODO: to be removed
      if (sysFeatureRole[0]['sysFeatureTable_Path'].startsWith('/:site/demo')) {
        return sysFeatureRole[0];
      }
      if (isChild) {
        const currentCompany = this.userDataService.getCurrentCompanyUUID();
        const childFeature = isUndefinedOrZeroLength(componentName)
          ? sysFeatureRole.find(
              (item) =>
                !isUndefinedOrZeroLength(
                  item.sysFeatureTable_ParentFeatureId
                ) && item.companyGUID === currentCompany
            )
          : sysFeatureRole.find(
              (item) =>
                !isUndefinedOrZeroLength(
                  item.sysFeatureTable_ParentFeatureId
                ) &&
                item.sysFeatureTable_FeatureId === componentName &&
                item.companyGUID === currentCompany
            );
        // no access
        if (isNullOrUndefined(childFeature)) {
          return null;
        } else {
          return childFeature;
        }
      } else {
        const currentCompany = this.userDataService.getCurrentCompanyUUID();
        const parentFeature = sysFeatureRole.find(
          (item) =>
            isUndefinedOrZeroLength(item.sysFeatureTable_ParentFeatureId) &&
            item.companyGUID === currentCompany
        );
        // no access
        if (isNullOrUndefined(parentFeature)) {
          return null;
        } else {
          return parentFeature;
        }
      }
    }
  }

  getTabbedActivatedFeatureRole(
    sysFeatureRole: any[],
    componentName: string
  ): any {
    if (isUndefinedOrZeroLength(sysFeatureRole)) {
      return null;
    } else {
      const currentCompany = this.userDataService.getCurrentCompanyUUID();
      const tabbedFeature = sysFeatureRole.find(
        (item) =>
          item.sysFeatureTable_FeatureId === componentName &&
          item.companyGUID === currentCompany
      );
      if (isUndefinedOrZeroLength(tabbedFeature)) {
        return null;
      } else {
        return tabbedFeature;
      }
    }
  }
  // call in route-guard
  getFeatureRoleFromActivatedPath(path: string): AccessRightView[] {
    // TODO: to be removed
    if (path.startsWith('/:site/demo') && !path.includes('/workflow/')) {
      const demo: any = [
        {
          sysFeatureTable_Path: '/:site/demo',
          sysFeatureTable_FeatureId: 'demo',
          sysFeatureTable_ParentFeatureId: null,
          accessLevels: {
            action: 0,
            read: 4,
            update: 4,
            create: 4,
            delete: 4,
          },
        },
      ];
      const storeItems = encryptObject(
        getEncryptionKey(),
        JSON.stringify(demo)
      );
      sessionStorage.setItem(StorageKey.SYSFEATUREROLE, storeItems);
      return demo;
    }

    const fromLocalStorage = localStorage.getItem(StorageKey.ACCESSRIGHT);
    const encKey = getEncryptionKey();

    if (isUndefinedOrZeroLength(fromLocalStorage)) {
      const storeItems = encryptObject(encKey, JSON.stringify([]));
      sessionStorage.setItem(StorageKey.SYSFEATUREROLE, storeItems);
      //return;
    }
    const data = decryptObject(
      encKey,
      localStorage.getItem(StorageKey.ACCESSRIGHT)
    );
    const sysAccessRight = JSON.parse(data);

    if (isUndefinedOrZeroLength(sysAccessRight)) {
      const storeItems = encryptObject(encKey, JSON.stringify([]));
      sessionStorage.setItem(StorageKey.SYSFEATUREROLE, storeItems);
      //return;
    }
    const featureRole = sysAccessRight.filter(
      (item) => item.sysFeatureTable_Path === path
    );

    const storeItem = encryptObject(encKey, JSON.stringify(featureRole));
    sessionStorage.setItem(StorageKey.SYSFEATUREROLE, storeItem);
    return featureRole;
  }

  // check function route
  isFunctionRoute(activatedRoute: ActivatedRoute): boolean {
    const path = this.getActivatedRoutePath(activatedRoute.snapshot);
    const isFunction = path.indexOf('functions') !== -1;
    return isFunction;
  }

  // call from tabbed component
  getTabbedComponentAccessRight(componentName: string): number {
    const encKey = getEncryptionKey();
    if (
      isUndefinedOrZeroLength(sessionStorage.getItem(StorageKey.SYSFEATUREROLE))
    ) {
      return AccessMode.noAccess;
    }
    const storeItem = decryptObject(
      encKey,
      sessionStorage.getItem(StorageKey.SYSFEATUREROLE)
    );
    const fromActivatedPath = JSON.parse(storeItem);
    // not found in sessionStorage
    if (isUndefinedOrZeroLength(fromActivatedPath)) {
      return AccessMode.noAccess;
    }

    const sysFeatureRole = this.getTabbedActivatedFeatureRole(
      fromActivatedPath,
      componentName
    );

    if (isUndefinedOrZeroLength(sysFeatureRole)) {
      return AccessMode.noAccess;
    } else {
      return sysFeatureRole.accessRight;
    }
  }
  // call in parent component (calcsheet, additionalcost)
  setTabsAccessRight(activatedRoute: ActivatedRoute): void {
    const activatedPath: string = this.getActivatedRoutePath(
      activatedRoute.snapshot
    );
    const path = activatedPath.split('/:page')[0] + '/:page';

    const tabFeatureRoles = sessionStorage.getItem(StorageKey.TABFEATUREROLES);

    if (isUndefinedOrZeroLength(tabFeatureRoles)) {
      this.setTabAccessRight(path);
    } else {
      const encKey = getEncryptionKey();
      const data = decryptObject(
        encKey,
        sessionStorage.getItem(StorageKey.TABFEATUREROLES)
      );
      const tabFeatureRoleItems = JSON.parse(data);
      const existingPath = tabFeatureRoleItems[0].sysFeatureTable_Path;
      if (path !== existingPath) {
        this.setTabAccessRight(path);
      }
    }
  }
  private setTabAccessRight(path: string): any {
    const fromLocalStorage = localStorage.getItem(StorageKey.ACCESSRIGHT);
    const encKey = getEncryptionKey();

    if (isUndefinedOrZeroLength(fromLocalStorage)) {
      const storeItems = encryptObject(encKey, JSON.stringify([]));
      sessionStorage.setItem(StorageKey.TABFEATUREROLES, storeItems);
      return;
    }
    const data = decryptObject(
      encKey,
      localStorage.getItem(StorageKey.ACCESSRIGHT)
    );
    const sysAccessRight = JSON.parse(data);

    if (isUndefinedOrZeroLength(sysAccessRight)) {
      const storeItems = encryptObject(encKey, JSON.stringify([]));
      sessionStorage.setItem(StorageKey.TABFEATUREROLES, storeItems);
      return;
    }

    const fromActivatedPath = sysAccessRight.filter(
      (item) => item.sysFeatureTable_Path === path
    );

    const storeItem = encryptObject(encKey, JSON.stringify(fromActivatedPath));
    sessionStorage.setItem(StorageKey.TABFEATUREROLES, storeItem);
  }
  getCalcSheetTabsAccessRight(tabName: string): AccessMode {
    const tabFeatureRoles = sessionStorage.getItem(StorageKey.TABFEATUREROLES);
    const encKey = getEncryptionKey();

    if (isUndefinedOrZeroLength(tabFeatureRoles)) {
      return AccessMode.noAccess;
    }
    const data = decryptObject(
      encKey,
      sessionStorage.getItem(StorageKey.TABFEATUREROLES)
    );
    const tabFeatureRoleItems = JSON.parse(data);

    if (isUndefinedOrZeroLength(tabFeatureRoleItems)) {
      return AccessMode.noAccess;
    }

    let index: number = 0;
    switch (tabName) {
      case 'insurance':
        index = tabFeatureRoleItems.findIndex(
          (item) =>
            item.sysFeatureTable_FeatureId ===
            'ApplicationCalcInsuranceListComponent'
        );

        return index !== -1
          ? tabFeatureRoleItems[index].accessRight
          : AccessMode.noAccess;
      case 'compulsory':
        index = tabFeatureRoleItems.findIndex(
          (item) =>
            item.sysFeatureTable_FeatureId ===
            'ApplicationCalcCompulsoryListComponent'
        );

        return index !== -1
          ? tabFeatureRoleItems[index].accessRight
          : AccessMode.noAccess;
      case 'vehicletax':
        index = tabFeatureRoleItems.findIndex(
          (item) =>
            item.sysFeatureTable_FeatureId ===
            'ApplicationCalcVehicleTaxListComponent'
        );

        return index !== -1
          ? tabFeatureRoleItems[index].accessRight
          : AccessMode.noAccess;
      case 'maintenance':
        index = tabFeatureRoleItems.findIndex(
          (item) =>
            item.sysFeatureTable_FeatureId ===
            'ApplicationCalcMaintenanceListComponent'
        );

        return index !== -1
          ? tabFeatureRoleItems[index].accessRight
          : AccessMode.noAccess;
      case 'othercost':
        index = tabFeatureRoleItems.findIndex(
          (item) =>
            item.sysFeatureTable_FeatureId ===
            'ApplicationCalcOtherCostListComponent'
        );

        return index !== -1
          ? tabFeatureRoleItems[index].accessRight
          : AccessMode.noAccess;
      default:
        return AccessMode.noAccess;
    }
  }
  getAdditionalCostTabsAccessRight(tabName: string): AccessMode {
    const encKey = getEncryptionKey();

    const tabFeatureRoles = sessionStorage.getItem(StorageKey.TABFEATUREROLES);

    if (isUndefinedOrZeroLength(tabFeatureRoles)) {
      return AccessMode.noAccess;
    }
    const data = decryptObject(
      encKey,
      sessionStorage.getItem(StorageKey.TABFEATUREROLES)
    );
    const tabFeatureRoleItems = JSON.parse(data);

    if (isUndefinedOrZeroLength(tabFeatureRoleItems)) {
      return AccessMode.noAccess;
    }

    let index: number = 0;
    switch (tabName) {
      case 'insurance':
        index = tabFeatureRoleItems.findIndex(
          (item) =>
            item.sysFeatureTable_FeatureId ===
            'AgreementCalcInsuranceListViewComponent'
        );

        return index !== -1
          ? tabFeatureRoleItems[index].accessRight
          : AccessMode.noAccess;
      case 'compulsory':
        index = tabFeatureRoleItems.findIndex(
          (item) =>
            item.sysFeatureTable_FeatureId ===
            'AgreementCalcCompulsoryListViewComponent'
        );

        return index !== -1
          ? tabFeatureRoleItems[index].accessRight
          : AccessMode.noAccess;
      case 'vehicletax':
        index = tabFeatureRoleItems.findIndex(
          (item) =>
            item.sysFeatureTable_FeatureId ===
            'AgreementCalcVehicleTaxListViewComponent'
        );

        return index !== -1
          ? tabFeatureRoleItems[index].accessRight
          : AccessMode.noAccess;
      case 'maintenance':
        index = tabFeatureRoleItems.findIndex(
          (item) =>
            item.sysFeatureTable_FeatureId ===
            'AgreementCalcMaintenanceListViewComponent'
        );

        return index !== -1
          ? tabFeatureRoleItems[index].accessRight
          : AccessMode.noAccess;
      case 'othercost':
        index = tabFeatureRoleItems.findIndex(
          (item) =>
            item.sysFeatureTable_FeatureId ===
            'AgreementCalcOtherCostListViewComponent'
        );

        return index !== -1
          ? tabFeatureRoleItems[index].accessRight
          : AccessMode.noAccess;
      default:
        return AccessMode.noAccess;
    }
  }

  /* ======================
   * Helper
   * ======================
   */
  loadAccessRight(userId: string): Observable<any> {
    const url: string = `${userAPI.getfeaturerolesbyuseridUrl}${userId}`;
    const site: string = this.userDataService.getSiteLogin();
    return this.httpService.Get(url, { headers: { SiteHeader: site } });
    // return this.getMockAccessRightLogin();
  }
  getRouteAndOutlet(routes: ActivatedRouteSnapshot[]): RouteAndOutlet[] {
    const routesWithOutlet: RouteAndOutlet[] = [];
    for (let i = 1; i < routes.length; i++) {
      const routeOutlet = routes[i].outlet;
      let path = '/' + routes[i].routeConfig.path;
      for (let j = i + 1; j < routes.length; j++) {
        if (routes[j].outlet === routeOutlet) {
          if (j > i) {
            path += '/';
          }
          path += routes[j].routeConfig.path;
        } else {
          i = j - 1;
          break;
        }
      }

      const routeAndOutletItem = new RouteAndOutlet();
      routeAndOutletItem.outlet = routeOutlet;
      routeAndOutletItem.route = path;
      routesWithOutlet.push(routeAndOutletItem);

      if (i + 1 < routes.length) {
        const peek = routes[i + 1].outlet;
        if (peek === routeOutlet) {
          break;
        }
      }
    }
    return routesWithOutlet;
  }

  setAccessMode(
    logicAccess: AccessMode,
    defaultAccess: AccessMode
  ): AccessMode {
    switch (logicAccess) {
      case AccessMode.full:
        if (defaultAccess !== AccessMode.full) {
          return defaultAccess;
        } else {
          return logicAccess;
        }
      case AccessMode.creator:
        if (
          defaultAccess === AccessMode.editor ||
          defaultAccess === AccessMode.viewer ||
          defaultAccess === AccessMode.noAccess
        ) {
          return defaultAccess;
        } else {
          return logicAccess;
        }
      case AccessMode.editor:
        if (
          defaultAccess === AccessMode.viewer ||
          defaultAccess === AccessMode.noAccess
        ) {
          return defaultAccess;
        } else {
          return logicAccess;
        }
      case AccessMode.viewer:
        if (defaultAccess === AccessMode.noAccess) {
          return defaultAccess;
        } else {
          return logicAccess;
        }
      case AccessMode.noAccess:
        return logicAccess;
    }
  }

  setErrorCode(errorCode: string, params: string[] = []): void {
    this.errorCode = errorCode;
    if (!isUndefinedOrZeroLength(params)) {
      this.errorParams = params;
    }
  }
  getTranslatedUnauthorizedError(): string {
    return getTranslateMessage({
      code: this.errorCode,
      parameters: this.errorParams,
    });
  }

  isNoAccess(accessLevels: AccessLevelModel, activatedPath: string): boolean {
    if (
      activatedPath.includes('/function/') ||
      activatedPath.includes('/report/') ||
      activatedPath.includes('/workflow/')
    ) {
      if (activatedPath.includes('actionhistory')) {
        return isZero(accessLevels.read);
      }
      return isZero(accessLevels.action);
    } else {
      return isZero(accessLevels.read);
    }
  }
  // ------------ mock data
  getMockAccessRightLogin(): Observable<AccessRightView[]> {
    const result: AccessRightView[] = [
      {
        companyUUID: '0a099e6f-9ba8-4a06-9e7e-5cc28123a90e',
        sysFeatureTableUUID: 'A2640A6F-0CEC-4DE3-9438-8C4F387E2323',
        sysFeatureTable_FeatureId: 'CustomerTableItemViewComponent',
        sysFeatureTable_ParentFeatureId: null,
        sysFeatureTable_Path: '/:site/master/customertable/:id',
        sysRoleTable_SiteLoginType: 1,
        accessLevels: {
          action: 0,
          read: 4,
          update: 4,
          create: 4,
          delete: 4,
        },
      },
      {
        companyUUID: '0a099e6f-9ba8-4a06-9e7e-5cc28123a90e',
        sysFeatureTableUUID: 'D145A4FE-19BC-4B4D-BB1F-B78098FE5C4F',
        sysFeatureTable_FeatureId: 'CustomerTableListViewComponent',
        sysFeatureTable_ParentFeatureId: null,
        sysFeatureTable_Path: '/:site/master/customertable/',
        sysRoleTable_SiteLoginType: 1,
        accessLevels: {
          action: 0,
          read: 4,
          update: 4,
          create: 4,
          delete: 4,
        },
      },
    ];
    return of(result);
  }
  // getUserBusinessUnitGUID(): string {
  //   if (
  //     isUndefinedOrZeroLength(localStorage.getItem(StorageKey.BUSINESSUNITUID))
  //   ) {
  //     return null;
  //   }
  //   const encKey = getEncryptionKey();
  //   const storeItem = decryptObject(
  //     encKey,
  //     localStorage.getItem(StorageKey.BUSINESSUNITGUID)
  //   );
  //   const result = JSON.parse(storeItem);
  //   // not found in localStorage
  //   if (isUndefinedOrZeroLength(result)) {
  //     return null;
  //   } else {
  //     return result;
  //   }
  // }
  // getUserBusinessUnitId(): string {
  //   if (
  //     isUndefinedOrZeroLength(localStorage.getItem(StorageKey.BUSINESSUNIT_ID))
  //   ) {
  //     return null;
  //   }
  //   const encKey = getEncryptionKey();
  //   const storeItem = decryptObject(
  //     encKey,
  //     localStorage.getItem(StorageKey.BUSINESSUNIT_ID)
  //   );
  //   const result = JSON.parse(storeItem);
  //   // not found in localStorage
  //   if (isUndefinedOrZeroLength(result)) {
  //     return null;
  //   } else {
  //     return result;
  //   }
  // }
  // getUserParentChildBU(): Observable<string[]> {
  //   if (
  //     isUndefinedOrZeroLength(localStorage.getItem(StorageKey.PARENTCHILDBU))
  //   ) {
  //     return of(null);
  //   }
  //   const encKey = getEncryptionKey();
  //   const storeItem = decryptObject(
  //     encKey,
  //     localStorage.getItem(StorageKey.PARENTCHILDBU)
  //   );
  //   const result = JSON.parse(storeItem);
  //   // not found in localStorage
  //   if (isUndefinedOrZeroLength(result)) {
  //     return of(null);
  //   } else {
  //     return of(result);
  //   }
  // }
}
