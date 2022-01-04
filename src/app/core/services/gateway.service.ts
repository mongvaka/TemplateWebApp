import { SearchParameter } from './../../shared/models/system_model/search_param_model';
import { Injectable } from '@angular/core';
import { HttpClientService } from './httpclient.service';
import { Observable, Subject } from 'rxjs';
import {
  DataServiceModel,
  ResponseModel,
  SearchCondition,
  SearchResult,
  SelectItems,
} from '../../shared/models/system_model';
import { UIControllerService } from './uiController.service';
import {
  isNullOrUndefined,
  isNullOrUndefOrEmpty,
  replaceAll,
} from '../../shared/functions/value.function';
import { ColumnType } from '../../shared/constants';
import { HttpHeaders } from '@angular/common/http';
import { Url } from 'app/shared/url';
import { UserDataService } from './user-data.service';
import { AppInjector } from 'app/app-injector';

// import { NotificationService } from './notification.service';
@Injectable({
  providedIn: 'root',
})
export class GatewayService {
  public getDropdownSub = new Subject<SelectItems[]>();
  public types = [];
  serviceKey: string;
  public userDataService: UserDataService;

  private getTableUrlSegment(param: string): any {
    const segments = param.split('/');
    const index = segments.findIndex((f) =>
      /(GET\w+BYID)/g.test(f.toUpperCase())
    );
    if (index > -1 && !isNullOrUndefined(segments[index + 1])) {
      return {
        table: segments[index],
        key: segments[index + 1].replace('id=', ''),
      };
    } else {
      return null;
    }
  }
  private getTableName(param: string): string {
    if (!isNullOrUndefined(param)) {
      const pUpper = param.toUpperCase();
      if (/(GET\w+BYID)/g.test(pUpper)) {
        return pUpper.replace('GET', '').replace('BYID', '');
      } else if (/(\w+GUID)/g.test(pUpper)) {
        return pUpper.replace('UUID', '');
      } else {
        return pUpper;
      }
    } else {
      return null;
    }
  }
  constructor(
    private http: HttpClientService,
    private uiService: UIControllerService // private notificationService: NotificationService
  ) {
    this.userDataService = AppInjector.get(UserDataService);
  }
  private getFilterUrlToRelatedKey(url: string): void {
    if (!isNullOrUndefined(url)) {
      const urlSegment = this.getTableUrlSegment(Url.base_url + url);
      if (!isNullOrUndefined(urlSegment)) {
        if (
          this.getTableName(urlSegment.table) ===
          this.getTableName(this.serviceKey)
        ) {
          this.uiService.relatedKey = {
            key: urlSegment.key,
            textKey: this.serviceKey,
          };
        } else {
          this.uiService.relatedKey = null;
        }
      } else {
        this.uiService.relatedKey = null;
      }
    } else {
      this.uiService.relatedKey = null;
    }
  }
  private setDefaultData(model: any): void {
    if (!isNullOrUndefined(model)) {
      const keys = Object.keys(model);
      keys.forEach((key) => {
        // check unbound field
        if (key.indexOf('_') === -1) {
          const field = this.types.find((f) => f.id === key.toUpperCase());
          if (!isNullOrUndefined(field)) {
            if (isNullOrUndefined(model[key])) {
              switch (field.type) {
                case ColumnType.STRING:
                  model[key] = '';
                  break;
                case ColumnType.INT:
                  model[key] = 0;
                  break;
                default:
                  break;
              }
            }
          }
        }
      });
    }
  }
  get(url: string, id: string): Observable<any> {
    const data = { primaryKey: id };
    this.getFilterUrlToRelatedKey(url);
    const $result = this.http.Post(Url.base_url + url, data);
    return new Observable((observer) => {
      $result.subscribe(
        (res) => {
          observer.next(res);
        },
        (err) => {
          // this.notificationService.showErrorMessageFromResponse(err);
          observer.error(err);
        },
        () => {
          observer.complete();
        }
      );
    });
  }
  view(url: string, data: any): Observable<any> {
    this.getFilterUrlToRelatedKey(url);
    const $result = this.http.Post(Url.base_url + url, data);
    return new Observable((observer) => {
      $result.subscribe(
        (res) => {
          observer.next(res);
        },
        (err) => {
          // this.notificationService.showErrorMessageFromResponse(err);
          observer.error(err);
        },
        () => {
          observer.complete();
        }
      );
    });
  }
  post(url: string, data: any): Observable<any> {
    const $result = this.http.Post(Url.base_url + url, data);
    return new Observable((observer) => {
      $result.subscribe(
        (res) => {
          observer.next(res);
        },
        (err) => {
          // this.notificationService.showErrorMessageFromResponse(err);
          observer.error(err);
        },
        () => {
          observer.complete();
        }
      );
    });
  }
  list(url: string, searchParameter: SearchParameter): Observable<any> {
    console.log('searchParameter', searchParameter);

    const $result = this.http.Post(Url.base_url + url, searchParameter);
    return new Observable((observer) => {
      $result.subscribe(
        (res) => {
          observer.next(res);
        },
        (err) => {
          // this.notificationService.showErrorMessageFromResponse(err);
          observer.error(err);
        },
        () => {
          observer.complete();
        }
      );
    });
  }
  getCompanyCondition(): SearchCondition {
    const searchCondition: SearchCondition = new SearchCondition();
    searchCondition.columnName = 'company_uuid';
    searchCondition.value = this.userDataService.getCurrentCompanyUUID();
    return searchCondition;
  }
  getBranchCondition(): SearchCondition {
    const searchCondition: SearchCondition = new SearchCondition();
    searchCondition.columnName = 'branch_uuid';
    searchCondition.value = this.userDataService.getCurrentBranchGUID();
    return searchCondition;
  }
  create(url: string, data: any, key?: string): Observable<ResponseModel> {
    data.company_uuid = this.userDataService.getCurrentCompanyUUID();
    data.branch_uuid = this.userDataService.getCurrentBranchGUID();
    // this.setDefaultData(data);
    const $result = this.http.Post(Url.base_url + url, data);
    if (isNullOrUndefOrEmpty(key)) {
      return $result;
    } else {
      return new Observable((observer) => {
        $result.subscribe(
          (res) => {
            observer.next({ key: res[key], model: res });
          },
          (err) => {
            observer.error(err);
          },
          () => {
            observer.complete();
          }
        );
      });
    }
  }
  edit(url: string, data: any, key?: string): Observable<ResponseModel> {
    this.setDefaultData(data);
    const $result = this.http.Post(Url.base_url + url, data);
    if (isNullOrUndefOrEmpty(key)) {
      return $result;
    } else {
      return new Observable((observer) => {
        $result.subscribe(
          (res) => {
            observer.next({ key: res[key], model: res });
          },
          (err) => {
            observer.error(err);
          },
          () => {
            observer.complete();
          }
        );
      });
    }
  }
  del(url: string, id: string): Observable<any> {
    const data = { primaryKey: id };
    return this.http.Post(Url.base_url + url, data);
  }
  dropdown(url: string, conditions?: SearchCondition[]): DataServiceModel {
    return { url, conditions };
  }
  getHttpDropdown(
    url: string,
    search: SearchParameter
  ): Observable<SelectItems[]> {
    return this.http.Post(url, search);
  }
  // getList(url: string, search: any): Observable<any> {
  //   data.company_uuid = '12a3cf93-a095-4391-a57d-8021302b6e59';
  //   data.branch_uuid = '12a3cf93-a095-4391-a57d-8021302b6e59';
  //   return this.http.Post(url, search);
  // }
  setDataType(id: string, type?: ColumnType): void {
    id = replaceAll(id, '_', '').toUpperCase();
    const index = this.types.findIndex((f) => f.id === id);
    if (isNullOrUndefined(type)) {
      if (index > -1) {
        this.types.splice(index, 1);
      }
    } else {
      if (index === -1) {
        this.types.push({ id, type });
      }
    }
  }
  getDropdown(url: string, conditions?: SearchCondition[]): DataServiceModel {
    return { url, conditions };
  }
}
