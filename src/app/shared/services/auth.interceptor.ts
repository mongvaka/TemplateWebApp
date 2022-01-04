import { Url } from 'app/shared/url';
import { UserDataService } from 'app/core/services/user-data.service';
import { HttpClientService } from './../../core/services/httpclient.service';
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, finalize } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenModel } from '../models/system_model/tokenModel';
import { SearchCondition } from '../models/system_model';
import { LoaderService } from 'app/core/services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  jwtHelper = new JwtHelperService();
  constructor(
    private http: HttpClientService,
    private userDataService: UserDataService,
    public loaderService: LoaderService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.loaderService.isLoading.next(true);

    if (
      req.url.indexOf('getRefreshToken') > -1 ||
      req.url.indexOf('assets') > -1 ||
      req.url.indexOf('login') > -1
    ) {
      return next.handle(req).pipe(
        finalize(() => {
          this.loaderService.isLoading.next(false);
        })
      );
    }

    const userData = this.getUser();
    if (userData && userData.access_token) {
      const modelToken = this.jwtHelper.decodeToken(userData.access_token);
      if (Date.now() < Number(modelToken.exp) * 1000) {
        const token = this.getBearer();
        const newReq = req.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        return next.handle(newReq).pipe(
          finalize(() => {
            this.loaderService.isLoading.next(false);
          })
        );
      } else {
        return this.refreshToken(req).pipe(
          map((result) => {
            const token = this.getBearer();
            this.userDataService.setAccessToken(result);
            const newReq = req.clone({
              setHeaders: {
                'Content-Type': 'application/json',
                Authorization: token,
              },
            });
            return next.handle(newReq).pipe(
              finalize(() => {
                this.loaderService.isLoading.next(false);
              })
            );
          })
        );
      }
    } else {
      return next.handle(req).pipe(
        finalize(() => {
          this.loaderService.isLoading.next(false);
        })
      );
    }
  }
  getBearer(): string {
    return (
      this.userDataService.getAccessToken() +
      ' ' +
      this.userDataService.getCurrentCompanyUUID() +
      ' ' +
      this.userDataService.getCurrentBranchGUID()
    );
  }
  refreshToken(req: any): Observable<any> {
    const refreshReq = req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.getRefreshToken(),
      }),
    });
    const url = Url.base_url + '/auth/getRefreshToken';
    return this.http.Post(url, {}, null, refreshReq);
  }
  getRefreshToken(): string {
    const data = this.userDataService.getRefreshToken();
    return this.userDataService.getRefreshToken();
  }
  getUser(): TokenModel {
    const data = {
      access_token: localStorage.getItem('access_token'),
      refresh_token: localStorage.getItem('refresh_token'),
    };
    return data;
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
}
