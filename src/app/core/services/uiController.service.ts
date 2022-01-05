import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import {
  HTTPTYPE,
  CIENT_PROCESS,
  Ordinal,
  AppConst,
  ElementType,
  EmptyUuid,
  WORKFLOW,
  PathType,
} from 'app/shared/constants';
import {
  setFieldConcat,
  replaceAll,
  trimStart,
  isNullOrUndefOrEmpty,
  isPathWithinUrl,
  isUndefinedOrZeroLength,
  getQueryParamObject,
  isUuid,
  isEditUrl,
  isCreateUrl,
  getSiteFormParam,
  guidValidation,
  pathToBranchType,
  removeUrlId,
} from 'app/shared/functions/value.function';
import { SearchParameter } from 'app/shared/models/system_model';
import {
  FieldAccessing,
  IRequest,
  ISubjectType,
  CustDropdownOnFocusModel,
  OrdinalModel,
  PathParamModel,
  RelatedKeyModel,
} from 'app/shared/models/system_model/miscellaneous_model';
import { Subject, interval, Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root',
})
export class UIControllerService {
  public fieldsAccSubject = new Subject<FieldAccessing[]>();
  public readonlySubject = new Subject<OrdinalModel>();
  public disabledSubject = new Subject<OrdinalModel>();
  public relatedSubject = new Subject<boolean>();
  public ddlLoadFirstFocusSubject = new Subject<CustDropdownOnFocusModel[]>();

  public fullPageSubject = new Subject<boolean>();
  public finishSpinnerListSubject = new Subject<ISubjectType>();
  public finishSpinnerItemSubject = new Subject<ISubjectType>();
  public currentSite: string;
  public branchType: string;

  snapshotHist: ActivatedRouteSnapshot[] = [];
  primaryUrl: string;
  primaryId: string;
  relatedStartUrl: string;
  relatedStartType: PathType;
  skipedUrl: string;
  beforeSkipUrl: string;

  initialQueryStringUrl: string;
  renderer: Renderer2;
  reqCounter = 0;
  reqsInfo: IRequest[] = [];
  searchStored: SearchParameter[] = [];
  isShowLog: boolean;
  fieldsAccessing: FieldAccessing[] = [];
  readonlyOrdinal: OrdinalModel[] = [];
  disableOrdinal: OrdinalModel[] = [];
  setFullOrdinal: OrdinalModel[] = [];
  setFullPageOrdinal: OrdinalModel[] = [];
  public httpStatus: HTTPTYPE;
  httpTrack: string[] = [];
  clientProcesses = [CIENT_PROCESS.SETREADONLY];
  relatedKey: RelatedKeyModel;
  skipedPath = null;
  functionObject: any;
  initialSerialNumberUrl: string;
  constructor(
    private router: Router,
    private rendererFactory: RendererFactory2,
    // private spinner: NgxSpinnerService,
    // private _location: Location,
    private currentActivatedRoute: ActivatedRoute
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.isShowLog = false;
  }
  setAppStorage(item: string): any {
    localStorage.setItem('appStorage', item);
  }
  getAppStorage(): any {
    return localStorage.getItem('appStorage');
  }
  removeAppStorage(): void {
    localStorage.removeItem('appStorage');
  }
  setReadonly(group: Ordinal): void {
    if (this.readonlyOrdinal.length === 0) {
      this.setIncreaseReqCounter(CIENT_PROCESS.SETREADONLY);
      this.readonlyOrdinal.push({ value: group, fact: true });
      interval(300)
        .pipe(takeWhile((t) => this.readonlyOrdinal.length > 0))
        .subscribe((time) => {
          // console.log(this.reqCounter, 'this.httpTrack', this.httpTrack, 'this.readonlyOrdinal', this.readonlyOrdinal);
          if (this.httpStatus === HTTPTYPE.CLIENTPROCESS) {
            this.readonlySubject.next(this.readonlyOrdinal[0]);
            this.readonlyOrdinal.splice(0, 1);
            if (this.readonlyOrdinal.length === 0) {
              this.setDecreaseReqCounter(CIENT_PROCESS.SETREADONLY);
            }
          }
        });
    } else {
      this.readonlyOrdinal.push({ value: group, fact: true });
    }
  }
  setUIFieldsAccessing(fields: FieldAccessing[]): void {
    if (fields.length > 0 && this.fieldsAccessing.length === 0) {
      this.setIncreaseReqCounter(CIENT_PROCESS.SETREADONLY);
      this.fieldsAccessing = setFieldConcat(this.fieldsAccessing, fields);
      interval(300)
        .pipe(takeWhile((t) => this.fieldsAccessing.length > 0))
        .subscribe((time) => {
          if (this.httpStatus === HTTPTYPE.CLIENTPROCESS) {
            this.fieldsAccSubject.next(this.fieldsAccessing);
            this.fieldsAccessing = [];
            if (this.fieldsAccessing.length === 0) {
              this.setDecreaseReqCounter(CIENT_PROCESS.SETREADONLY);
            }
          }
        });
    } else {
      this.fieldsAccessing = setFieldConcat(this.fieldsAccessing, fields);
    }
  }
  setDisabled(group: Ordinal) {
    if (this.disableOrdinal.length === 0) {
      this.setIncreaseReqCounter(CIENT_PROCESS.SETREADONLY);
      this.disableOrdinal.push({ value: group, fact: true });
      interval(300)
        .pipe(takeWhile((t) => this.disableOrdinal.length > 0))
        .subscribe((time) => {
          if (this.httpStatus === HTTPTYPE.CLIENTPROCESS) {
            this.disabledSubject.next(this.disableOrdinal[0]);
            this.disableOrdinal.splice(0, 1);
            if (this.disableOrdinal.length === 0) {
              this.setDecreaseReqCounter(CIENT_PROCESS.SETREADONLY);
            }
          }
        });
    } else {
      this.disableOrdinal.push({ value: group, fact: true });
    }
  }
  setFullControl(group: Ordinal) {
    if (this.setFullOrdinal.length === 0) {
      this.setIncreaseReqCounter(CIENT_PROCESS.SETREADONLY);
      this.setFullOrdinal.push({ value: group, fact: false });
      interval(300)
        .pipe(takeWhile((t) => this.setFullOrdinal.length > 0))
        .subscribe((time) => {
          if (this.httpStatus === HTTPTYPE.CLIENTPROCESS) {
            this.readonlySubject.next(this.setFullOrdinal[0]);
            this.disabledSubject.next(this.setFullOrdinal[0]);
            this.setFullOrdinal.splice(0, 1);
            if (this.setFullOrdinal.length === 0) {
              this.setDecreaseReqCounter(CIENT_PROCESS.SETREADONLY);
            }
          }
        });
    } else {
      this.setFullOrdinal.push({ value: group, fact: false });
    }
  }
  setFullPage() {
    if (this.setFullPageOrdinal.length === 0) {
      this.setIncreaseReqCounter(CIENT_PROCESS.SETREADONLY);
      this.setFullPageOrdinal.push({ value: Ordinal.Clear, fact: false });
      interval(300)
        .pipe(takeWhile((t) => this.setFullPageOrdinal.length > 0))
        .subscribe((time) => {
          if (this.httpStatus === HTTPTYPE.CLIENTPROCESS) {
            this.readonlySubject.next(this.setFullPageOrdinal[0]);
            this.disabledSubject.next(this.setFullPageOrdinal[0]);
            this.setFullPageOrdinal.splice(0, 1);
            if (this.setFullPageOrdinal.length === 0) {
              this.setDecreaseReqCounter(CIENT_PROCESS.SETREADONLY);
            }
          }
        });
    } else {
      this.setFullPageOrdinal.push({ value: Ordinal.Clear, fact: false });
    }
    // setTimeout(() => {
    //     const model: OrdinalModel = { value: Ordinal.Clear, fact: false };
    //     this.readonlySubject.next(model);
    //     this.disabledSubject.next(model);
    // }, 100);
  }
  // ========= new navigator ==== //
  setHistSnapshot(snapshot: ActivatedRouteSnapshot) {
    this.reqsInfo = [];
    let site = snapshot.params['site'];
    const main = snapshot.params['main'];
    if (isNullOrUndefined(site) && !isNullOrUndefined(main)) {
      site = main.split(':')[0];
    }
    site = getSiteFormParam(site);
    this.currentSite = site;
    this.branchType = pathToBranchType(site);
    // const latestPath = this.snapshotHist.slice(-1).pop();
    // if (isNullOrUndefined(latestPath)
    //     || (snapshot['_routerState'].url !== latestPath['_routerState'].url)) {
    this.snapshotHist.push(snapshot);
    if (this.snapshotHist.length > 10) {
      this.snapshotHist.splice(0, 1);
    }
    // }
  }
  getHistSnapshot(): ActivatedRouteSnapshot[] {
    return this.snapshotHist;
  }
  setHidePopover() {
    const bodies = document.querySelectorAll('div.i-panel-body');
    bodies.forEach((body: HTMLInputElement) => {
      this.renderer.addClass(body, 'hide-popover');
    });
    setTimeout(() => {
      bodies.forEach((body: HTMLInputElement) => {
        this.renderer.removeClass(body, 'hide-popover');
      });
    }, 5000);
  }
  setInitialMode(event: NavigationEnd) {
    if (this.isShowLog) {
    }
    this.setHidePopover();
    const arrPath = event.url.split('/fn/');
    if (arrPath.length > 1) {
      this.primaryUrl = decodeURIComponent(
        this.replaceToPath(arrPath[0].replace(/[/$]/g, ''))
      );
      let tmpId = arrPath[0].split(':')[arrPath[0].split(':').length - 1];

      // check for encoded char
      if (tmpId.includes('%')) {
        const tmpId_decode = decodeURIComponent(tmpId);
        if (tmpId_decode.split('?').length > 1) {
          tmpId = tmpId_decode[0];
        }
      }

      this.primaryId = guidValidation(tmpId) ? tmpId : null;
      if (isNullOrUndefined(this.relatedStartUrl)) {
        if (isNullOrUndefined(this.snapshotHist.slice(-1).pop().params['id'])) {
          this.relatedStartType = PathType.LIST;
          if (event.url.includes('$')) {
            const arrStart = arrPath[0].split('!');
            arrStart.forEach((f, i) => {
              if (f.includes('$')) {
                this.relatedStartUrl = f[i + 1];
              }
            });
          } else {
            this.relatedStartUrl = `/${arrPath[1]}`;
          }
        } else {
          if (
            this.getIsItem(this.snapshotHist.slice(-1).pop().params['main'])
          ) {
            this.relatedStartType = PathType.ITEM;
          } else {
            this.relatedStartType = PathType.LIST;
          }

          if (event.url.includes('$')) {
            const arrStart = arrPath[0].split('!');
            arrStart.forEach((f, i) => {
              if (f.includes('$')) {
                this.relatedStartUrl = arrStart[i + 1];
              }
            });
          } else {
            this.relatedStartUrl = removeUrlId(`/${arrPath[1]}`);
          }
        }
      }
      if (this.isShowLog) {
        console.log('fullPageSubject.next 1');
      }
      const _isFunction =
        event.url.includes(`fn/functions/`) ||
        event.url.includes(`reports/`) ||
        event.url.includes(`fn/workflow/`);
      if (!_isFunction) {
        this.skipedUrl = null;
      }
      this.fullPageSubject.next(_isFunction);
    } else {
      if (event.url.includes('?')) {
        this.initialQueryStringUrl = event.url;
      }
      this.primaryUrl = null;
      this.primaryId = null;
      this.relatedStartUrl = null;
      if (this.isShowLog) {
        console.log('fullPageSubject.next 2');
      }
      this.fullPageSubject.next(false);
    }
    this.relatedSubject.next(!isNullOrUndefined(this.relatedStartUrl));
  }
  getFunctionMode(fnUrl: string, queryParam: any = undefined) {
    if (isNullOrUndefined(this.relatedStartUrl)) {
      this.beforeSkipUrl = this.replaceToPath(this.router.url);
      this.primaryUrl = decodeURIComponent(
        this.replaceToPath(this.router.url.replace('/', ''))
      );
      this.primaryId = this.snapshotHist.slice(-1).pop().params['id'];
    } else {
      if (isNullOrUndefined(this.beforeSkipUrl)) {
        this.beforeSkipUrl = `${this.replaceToParams(
          this.router.url.split('/fn/')[0].replace('/', '')
        )}/fn/${this.router.url.split('/fn/')[1]}`;
      }
      this.primaryUrl = this.router.url.split('/fn/')[0];
      this.primaryUrl = this.replaceToPath(this.primaryUrl.replace('/', ''));
    }

    this.skipedUrl = fnUrl;
    this.router.navigate(
      [
        decodeURIComponent(
          `/${this.replaceToParams(this.primaryUrl)}/fn/${fnUrl}`
        ),
      ],
      {
        skipLocationChange: true,
        queryParams: queryParam,
      }
    );
  }
  setRemovePrimaryUrl() {
    this.initialQueryStringUrl = null;
    this.primaryUrl = null;
  }
  getNavigator(url: string = null) {
    if (this.isShowLog) {
      console.log('getNavigator');
    }
    let currentUrl = isNullOrUndefined(this.router.url.split('/fn/')[1])
      ? null
      : `/${this.router.url.split('/fn/')[1]}`;

    if (!isNullOrUndefined(this.relatedStartUrl)) {
      if (this.relatedStartType === PathType.ITEM) {
        currentUrl = removeUrlId(currentUrl);
      }
    }
    if (url === AppConst.HOMEURL) {
      this.skipedUrl = null;
      this.relatedStartUrl = null;
      if (this.isShowLog) {
        console.log('fullPageSubject.next 5');
      }
      this.fullPageSubject.next(false);
      this.router.navigate([AppConst.HOMEURL]);
    } else if (isNullOrUndefined(url) || url === '') {
      const arrRel = this.router.url.split('!');
      if (isNullOrUndefined(arrRel[1]) && isNullOrUndefined(this.skipedUrl)) {
        this.relatedStartUrl = null;
        if (isNullOrUndefined(this.primaryUrl)) {
          const beforeThis = this.snapshotHist[this.snapshotHist.length - 2];
          if (!isNullOrUndefined(beforeThis)) {
            this.navigateRoute(`${beforeThis['_routerState'].url}`);
          } else {
            this.navigateRoute(`${this.currentSite}/home`);
          }
        } else {
          this.navigateRoute(this.primaryUrl.replace('$', ''));
        }
      } else if (!isNullOrUndefined(this.skipedUrl)) {
        this.navigateRoute(this.beforeSkipUrl);
        this.beforeSkipUrl = null;
      } else {
        this.navigateRoute(
          this.getUrlLastRelated(this.router.url.replace('$', ''))
        );
      }
      this.skipedUrl = null;
      if (this.isShowLog) {
        console.log('fullPageSubject.next 6');
      }
      this.fullPageSubject.next(false);
    } else if (isNullOrUndefined(this.primaryUrl)) {
      if (this.isShowLog) {
        console.log('fullPageSubject.next 7');
      }
      this.fullPageSubject.next(false);
      this.relatedStartUrl = null;
      this.skipedUrl = null;

      if (this.isEqualToInitQueryStringRoute(`${this.currentSite}/${url}`)) {
        this.navigateRoute(this.initialQueryStringUrl);
      } else {
        if (!this.containsInitQueryStringRoute(`${this.currentSite}/${url}`)) {
          this.initialQueryStringUrl = null;
        }
        this.router.navigate([`${this.currentSite}/${url}`]);
      }
    } else if (!isNullOrUndefined(this.skipedUrl)) {
      url = replaceAll(url, '//', '/');
      if (isNullOrUndefined(this.relatedStartUrl)) {
        this.router.navigate([`/${url}`], { skipLocationChange: true });
      } else {
        if (isCreateUrl(this.beforeSkipUrl) && isEditUrl(url)) {
          if (this.isShowLog) {
            console.log('fullPageSubject.next 8');
          }
          this.fullPageSubject.next(false);
          this.skipedUrl = null;
          this.router.navigate([`${this.currentSite}/${url}`]);
        } else {
          const afterFn = this.beforeSkipUrl.split('/fn')[1];
          if (
            isNullOrUndefined(afterFn) ||
            (afterFn === url && !this.router.url.includes('/fn/')) ||
            !url.includes(`fn/functions/`)
          ) {
            if (this.isShowLog) {
              console.log('fullPageSubject.next 20');
            }
            this.fullPageSubject.next(false);
            this.skipedUrl = null;
            if (
              trimStart(
                this.setRemoveIdPath(`${this.currentSite}${url}`),
                '/'
              ) === trimStart(this.setRemoveIdPath(this.beforeSkipUrl), '/')
            ) {
              this.navigateRoute(`${this.currentSite}${url}`);
            } else {
              this.navigateRoute(this.beforeSkipUrl);
            }
            this.beforeSkipUrl = null;
          } else {
            if (this.isShowLog) {
              console.log('fullPageSubject.next 21');
            }
            this.fullPageSubject.next(true);
            const preUrl = `${this.beforeSkipUrl.split('/fn')[0]}/fn${url}`;
            this.router.navigate(
              [
                decodeURIComponent(
                  `${this.beforeSkipUrl.split('/fn')[0]}/fn${url}`
                ),
              ],
              {
                skipLocationChange: true,
              }
            );
          }
        }
      }
    } else if (
      this.relatedStartUrl === currentUrl ||
      this.skipedUrl === currentUrl
    ) {
      // start from related item view > back to primary
      if (this.relatedStartType === PathType.ITEM) {
        if (this.isShowLog) {
          console.log('fullPageSubject.next 9');
        }
        this.fullPageSubject.next(false);
        this.relatedStartUrl = null;
        this.skipedUrl = null;
        this.navigateRoute(this.primaryUrl);
      } else {
        if (this.isShowLog) {
          console.log('fullPageSubject.next 10');
        }
        this.fullPageSubject.next(!isNullOrUndefined(this.skipedUrl));
        this.router.navigate([
          decodeURIComponent(
            `${this.replaceToParams(this.primaryUrl)}/fn${url}`
          ),
        ]);
      }
    } else {
      if (this.isShowLog) {
        console.log('fullPageSubject.next 11');
      }
      this.fullPageSubject.next(!isNullOrUndefined(this.skipedUrl));
      this.initialQueryStringUrl = null;
      this.router.navigate([
        decodeURIComponent(`${this.replaceToParams(this.primaryUrl)}/fn${url}`),
      ]);
    }
  }
  private replaceToPath(url: string): string {
    url = url.replace('TitemT', '');
    return replaceAll(url, ':', '/');
  }
  private replaceToParams(url: string, special = null): string {
    if (!isNullOrUndefOrEmpty(special)) {
      const arr = url.split('/');
      arr[1] = `${arr[1]}${special}`;
      url = '';
      arr.forEach((a) => {
        url = `${url}/${a}`;
      });
      url = url.replace('/', '');
    }
    return replaceAll(url, '/', ':');
  }
  private getUrlLastRelated(url: string): string {
    let arrFn = url.split('/fn/');
    arrFn = arrFn[0].split('!');
    return `${arrFn[0]}/fn/${this.replaceToPath(arrFn.slice(-1).pop())}`;
  }
  private getIsItem(url: string): boolean {
    const paths = url.split(':');
    let isItem = false;
    paths.forEach((path) => {
      if (path === 'TitemT') {
        isItem = true;
      }
    });
    return isItem;
  }
  private setRemoveIdPath(url: string): string {
    const arr = url.split('/');
    const id = arr[arr.length - 1];
    if (isUuid(id)) {
      return url.replace(`/${id}`, '');
    } else {
      return url;
    }
  }
  setAuthorizedBySite(site: string[]): boolean {
    return isNullOrUndefOrEmpty(site.find((o) => o === this.currentSite))
      ? false
      : true;
  }
  setIncreaseReqCounter(url: string): void {
    const req: IRequest = { url, begin: new Date().getTime() };
    this.reqsInfo.unshift(req);
    this.httpTrack.unshift(url);

    this.reqCounter++;
    if (this.reqCounter === 1) {
      if (
        this.httpTrack.every((e) => this.clientProcesses.some((s) => s === e))
      ) {
        this.httpStatus = HTTPTYPE.CLIENTPROCESS;
      } else {
        this.httpStatus = HTTPTYPE.REQUESTING;
      }
      // this.spinner.show();
    }
  }
  setDecreaseReqCounter(url: string): void {
    const index = this.reqsInfo.findIndex((f) => f.url === url);
    const iTrack = this.httpTrack.findIndex((f) => f === url);
    if (index > -1) {
      this.reqsInfo[index].duration =
        new Date().getTime() - this.reqsInfo[index].begin;
    }
    if (iTrack > -1) {
      this.httpTrack.splice(iTrack, 1);
    }
    if (
      this.httpTrack.every((e) => this.clientProcesses.some((s) => s === e))
    ) {
      this.httpStatus = HTTPTYPE.CLIENTPROCESS;
    }
    if (this.reqCounter === 1) {
      this.reqCounter--;
      if (this.reqCounter === 0) {
        setTimeout(() => {
          if (this.reqCounter === 0) {
            this.httpStatus = HTTPTYPE.RESPONSED;
            // this.spinner.hide();
          }
        }, 1000);
      }
    } else {
      this.reqCounter--;
    }
  }

  setSearchStored(search: SearchParameter) {
    const main = this.snapshotHist.slice(-1).pop().params['main'];
    const index = this.searchStored.findIndex(
      (s) => s.tableKey === search.tableKey
    );
    if (index > -1) {
      this.searchStored.splice(index, 1);
    }
    if (
      search.searchCondition.some(
        (s) =>
          (!isNullOrUndefOrEmpty(s.value) || !isNullOrUndefOrEmpty(s.values)) &&
          !s.isParentKey
      )
    ) {
      this.searchStored.push(JSON.parse(JSON.stringify(search)));
    }
  }

  getSearchStored(tableKey: string) {
    const dels = [];
    for (let i = 0; i < this.searchStored.length; i++) {
      if (!isPathWithinUrl(this.searchStored[i].urlPath, this.router)) {
        dels.push(i);
      }
    }
    for (let i = 0; i < dels.length; i++) {
      this.searchStored.splice(dels[i], 1);
    }
    return this.searchStored.find((f) => f.tableKey === tableKey);
  }
  setInitStored(index = '') {
    this.searchStored = [];
  }

  setBlockBody() {
    const body = document.querySelector('body');
    if (!body.classList.contains('iv-viewonly')) {
      this.renderer.addClass(body, 'iv-viewonly');
    }
  }
  private navigateRoute(path: string) {
    const path_decoded = decodeURIComponent(path);
    const route = path_decoded.split('?');
    if (route.length > 1) {
      let routePath = route[0];
      if (route.length > 2) {
        for (let i = 1; i < route.slice(route.length - 2).length; i++) {
          routePath = routePath.concat('?', route[i]);
        }
      }
      this.router.navigate([routePath], {
        queryParams: getQueryParamObject(route.slice(-1).pop()),
      });
    } else {
      this.router.navigate([path_decoded]);
    }
  }

  private containsInitQueryStringRoute(path: string): boolean {
    path = '/' + replaceAll(path, '//', '/');
    if (isUndefinedOrZeroLength(this.initialQueryStringUrl)) {
      return false;
    }
    const routeWithNoQS = this.initialQueryStringUrl.split('?')[0];
    return decodeURIComponent(path).includes(routeWithNoQS);
  }
  private isEqualToInitQueryStringRoute(path: string): boolean {
    path = '/' + replaceAll(path, '//', '/');
    if (isUndefinedOrZeroLength(this.initialQueryStringUrl)) {
      return false;
    }
    let routeWithNoQS = this.initialQueryStringUrl.split('?')[0];

    if (routeWithNoQS.includes('/wf')) {
      routeWithNoQS = routeWithNoQS.replace('/wf', '');
    }

    return path === routeWithNoQS;
  }
  getGroupOptions(): Observable<any> {
    return new Observable((observer) => {
      setTimeout(() => {
        let _group = document.getElementsByClassName('ui-fieldset-legend');
        if (_group.length === 0) {
          _group = document.getElementsByClassName('p-fieldset-legend');
        }
        if (isUndefinedOrZeroLength(_group)) {
          observer.next([]);
        }
        const arr = Array.from(_group);
        observer.next(
          arr.map((item: HTMLElement, idx) => {
            let content = item.nextElementSibling.querySelector(
              '.ui-fieldset-content'
            );
            if (isNullOrUndefined(content)) {
              content = item.nextElementSibling.querySelector(
                '.p-fieldset-content'
              );
            }
            const elements: NodeListOf<HTMLInputElement> =
              content.querySelectorAll(`${ElementType.INPUT},${ElementType.P_CALENDAR},${ElementType.P_CHECKBOX},
                    ${ElementType.P_DROPDOWN},${ElementType.P_INPUTSWITCH},${ElementType.P_MULTISELECT},${ElementType.P_RADIOBUTTON}
                    ,${ElementType.TEXTAREA}`);
            return {
              label: item.textContent,
              command: () => {
                window.scrollTo({
                  top: item.offsetTop - 100,
                  left: 0,
                  behavior: 'smooth',
                });
                if (
                  elements[0].tagName === ElementType.TEXTAREA ||
                  elements[0].tagName === ElementType.INPUT
                ) {
                  elements[0].focus();
                } else {
                  const input: NodeListOf<HTMLInputElement> =
                    elements[0].querySelectorAll(`${ElementType.INPUT}`);
                  input[0].focus();
                }
              },
            };
          })
        );
      }, 1000);
    });
  }

  getQueryStringValue(key: string): string {
    const value = this.currentActivatedRoute.snapshot.queryParamMap.get(key);
    if (
      isUndefinedOrZeroLength(decodeURIComponent(value)) ||
      decodeURIComponent(value) === 'null' ||
      decodeURIComponent(value) === 'undefined'
    ) {
      return '';
    } else {
      return decodeURIComponent(value);
    }
  }

  isWorkFlowMode(): boolean {
    if (
      /(%3FSN%3D)\w+/.test(window.location.href) ||
      /(\?SN\=)\w+/.test(window.location.href)
    ) {
      return true;
    } else if (
      !isUndefinedOrZeroLength(this.getQueryStringValue(WORKFLOW.SN))
    ) {
      return true;
    } else {
      return false;
    }
  }
  getKey(name: string): string {
    const routeParam = this.snapshotHist.slice(-1).pop()[
      '_urlSegment'
    ].segments;
    const idx = routeParam.findIndex((o) => o.path === name);
    if (idx >= 0) {
      return decodeURIComponent(routeParam[idx + 1].path).split('?')[0];
    }
    return EmptyUuid;
  }
  getRelatedInfoOriginTableName(): string {
    const routeParam = this.snapshotHist.slice(-1).pop()[
      '_urlSegment'
    ].segments;
    const idx = routeParam.findIndex((o) => o.path === 'info');
    if (idx >= 0) {
      if (
        decodeURIComponent(routeParam[idx - 2])
          .split('?')[0]
          .includes('-child')
      ) {
        return decodeURIComponent(routeParam[idx - 4]).split('?')[0];
      } else {
        return decodeURIComponent(routeParam[idx - 2]).split('?')[0];
      }
    }
    return null;
  }
  getRelatedInfoParentTableName(): string {
    const routeParam = this.snapshotHist.slice(-1).pop()[
      '_urlSegment'
    ].segments;
    let reverseRouteParm = routeParam.slice().reverse();
    const idx = reverseRouteParm.findIndex((o) => o.path === 'info');
    if (idx >= 0) {
      return decodeURIComponent(reverseRouteParm[idx + 2]).split('?')[0];
    }
    return null;
  }
  getParentTableName(): string {
    const routeParam = this.snapshotHist.slice(-1).pop()[
      '_urlSegment'
    ].segments;
    let reverseRouteParm = routeParam.slice().reverse();
    return reverseRouteParm[0].path;
  }
  getRelatedInfoActiveTableName(): string {
    return this.getActiveTableName('info');
  }
  getWorkflowActiveTableName(): string {
    return this.getActiveTableName('workflow');
  }
  getWorkflowActiveTableKey(): string {
    const routeParam = this.snapshotHist.slice(-1).pop()[
      '_urlSegment'
    ].segments;
    const idx = routeParam.findIndex((o) => o.path === 'workflow');
    if (idx >= 0) {
      return decodeURIComponent(routeParam[idx - 1]).split('?')[0];
    }
    return EmptyUuid;
  }
  private getActiveTableName(param: string): string {
    const routeParam = this.snapshotHist.slice(-1).pop()[
      '_urlSegment'
    ].segments;
    const idx = routeParam.findIndex((o) => o.path === param);
    if (idx >= 0) {
      return decodeURIComponent(routeParam[idx + 1]).split('?')[0];
    }
    return null;
  }
  getRelatedInfoOriginTableKey(): string {
    const routeParam = this.snapshotHist.slice(-1).pop()[
      '_urlSegment'
    ].segments;
    const idx = routeParam.findIndex((o) => o.path === 'info');
    if (idx >= 0) {
      if (
        decodeURIComponent(routeParam[idx - 2])
          .split('?')[0]
          .includes('-child')
      ) {
        return decodeURIComponent(routeParam[idx - 3]).split('?')[0];
      } else {
        return decodeURIComponent(routeParam[idx - 1]).split('?')[0];
      }
    }
    return EmptyUuid;
  }
  getRelatedInfoParentTableKey(): string {
    const routeParam = this.snapshotHist.slice(-1).pop()[
      '_urlSegment'
    ].segments;
    let reverseRouteParm = routeParam.slice().reverse();
    const idx = reverseRouteParm.findIndex((o) => o.path === 'info');
    if (idx >= 0) {
      return decodeURIComponent(reverseRouteParm[idx + 1]).split('?')[0];
    }
    return EmptyUuid;
  }
  getRelatedInfoActiveTableKey(): string {
    const routeParam = this.snapshotHist.slice(-1).pop()[
      '_urlSegment'
    ].segments;
    const idx = routeParam.findIndex((o) => o.path === 'info');
    if (idx >= 0) {
      return decodeURIComponent(routeParam[idx + 2]).split('?')[0];
    }
    return EmptyUuid;
  }
  toRelatedInfo(param: PathParamModel): PathParamModel {
    return param;
  }
  toFunction(param: PathParamModel): PathParamModel {
    return param;
  }
  getMasterRoute(shift: number = 0): string {
    const routeParam = this.snapshotHist.slice(-1).pop()[
      '_urlSegment'
    ].segments;
    const idx = routeParam.findIndex(
      (o) => o.path === 'back' || o.path.includes('back!')
    );
    if (idx >= 0) {
      return decodeURIComponent(routeParam[idx + 1 + shift].path).split('?')[0];
    }
    return null;
  }
}
