import { Message } from 'primeng/api';
// import { users } from './../layout/data-left-manu';
import { ROUTE_API, ROUTE_MASTER_GEN } from './../constants/constant_gen';
import { HttpClient } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { Url } from '../url';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {
  HandleError,
  HttpErrorHandler,
} from '../services/config/http-error-handler.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MessagingService } from './config/messaging.service';
import { UserDataService } from 'app/core/services/user-data.service';
import {
  isNullOrUndefOrEmpty,
  isUndefinedOrZeroLength,
} from '../functions/value.function';
import { LoginResultModel, MessageModel } from '../models/system_model';
import { StorageKey } from '../constants';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'app/core/services/notificaton.service';
import { url } from 'inspector';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    //Authorization: 'my-auth-token',
  }),
};

@Injectable()

// tslint:disable-next-line: class-name
export class authenService {
  private handleError: HandleError;
  constructor(
    private http: HttpClient,
    private router: Router,
    httpErrorHandler: HttpErrorHandler,
    messagingService: MessagingService,
    private userDataService: UserDataService,
    private translate: TranslateService,
    private notificationService: NotificationService
  ) {
    this.handleError = httpErrorHandler.createHandleError('AuthenService');
  }

  // tslint:disable-next-line: typedef
  login(username: string, password: string) {
    const data = {
      user_name: username,
      user_password: password,
    };
    return this.authentication(data).subscribe((result) => {
      localStorage.clear();
      if (!isNullOrUndefOrEmpty(result)) {
        if (result.code === 500) {
          const messageModel: MessageModel = new MessageModel();
          messageModel.topic = this.translate.instant(result.message);
          messageModel.content = this.translate.instant(result.message);
          this.notificationService.showMultipleToastCustomError(messageModel);

          // window.location.reload();
        } else {
          this.setUserData(result).subscribe((res) => {
            this.router.navigateByUrl(ROUTE_MASTER_GEN.HOME);
            // window.location.reload();
          });
        }
      } else {
        console.log('nullREsult');
      }
    });
  }
  // tslint:disable-next-line: typedef
  private authentication(data: any): Observable<LoginResultModel> {
    return this.http
      .post<any>(
        Url.base_url + ROUTE_MASTER_GEN.AUTH + ROUTE_API.LOGIN,
        data,
        httpOptions
      )
      .pipe(catchError(this.handleError('authentication')));
  }
  private setUserData(result: any): Observable<boolean> {
    if (!isUndefinedOrZeroLength(result)) {
      this.userDataService.setCurrentBranch(result);
      this.userDataService.setCurrentCompany(result);
      this.userDataService.setIsActive(result);
      this.userDataService.setSiteLogin(result);
      this.userDataService.setUserImageContent(result);
      //this.userDataService.setAppLanguage(result);
      this.userDataService.setUsername(result.user_name);
      this.userDataService.setFullName(result.name);
      this.userDataService.setShowSystemLog(result);
      this.userDataService.setCurrentSubscription(result.refresh_token);
      this.userDataService.setAccessToken(result);
      this.userDataService.setRefreshToken(result);
      this.userDataService.setAccessFeature(result);
      this.userDataService.setAppLanguage(result.languageid);
      this.userDataService.setUserDepartment(result.department_uuid);
      this.userDataService.setEmployeeUUID(result.employee_uuid);
      this.userDataService.setUserID(result.user_uuid);
      return of(true);
    } else {
      return of(false);
    }
  }
  public resetStorage(): void {
    localStorage.removeItem(StorageKey.BRANCHUUID);
    localStorage.removeItem(StorageKey.BRANCH_ID);
    localStorage.removeItem(StorageKey.COMPANYUUID);
    localStorage.removeItem(StorageKey.COMPANY_ID);
    localStorage.removeItem(StorageKey.ACCESS_TOKEN);
    localStorage.removeItem(StorageKey.SYSFEATUREROLE);
    localStorage.removeItem(StorageKey.SHOW_LOG);
    localStorage.removeItem(StorageKey.SITE_LOGIN);
    localStorage.removeItem(StorageKey.USER_IMAGE);
    localStorage.removeItem(StorageKey.INACTIVE_USER);
    localStorage.removeItem(StorageKey.USER_NAME);
    localStorage.removeItem(StorageKey.FEATURE_ID);
    localStorage.removeItem(StorageKey.FULLNAME);
    localStorage.removeItem(StorageKey.SUBSCRIPTIONUUID);
    localStorage.removeItem(StorageKey.SUBSCRIPTION_ID);
    localStorage.removeItem(StorageKey.IS_ACTIVE);
    localStorage.removeItem(StorageKey.TABFEATUREROLES);
    localStorage.removeItem(StorageKey.USER_IMAGE);

    localStorage.removeItem(StorageKey.DROPDOWN_CACHE);

    sessionStorage.clear();
  }
  public downloadDoc(): void {
    // this.http
    // .get("http://localhost:5000/downloadDoc", { headers, responseType: "blob" }) //set response Type properly (it is not part of headers)
    // .toPromise()
    // .then(blob => {
    //     saveAs(blob, "dump.gz");
    // })
    // .catch(err => console.error("download error = ", err))
    // this.http.get('http://localhost:5000/downloadDoc').subscribe((response => this.downLoadFile(response, "application/ms-word"));
    this.http
      .get('http://localhost:5000/downloadDoc', {
        responseType: 'blob',
      })
      .subscribe(
        (response) => {
          console.log('respons', response);
          this.downLoadFile(response, 'application/ms-word');
        }

        // this.downLoadFile(response, 'application/ms-word')
      );
  }
  downLoadFile(data: any, type: string): any {
    let blob = new Blob([data], { type: 'txt' });
    // let file = new File([blob], 'name');
    // console.log('file', file);
    //saveAs(blob, 'hi.docx'); // Saves a big corrupted file
    // let url = window.URL.createObjectURL(blob);
    // let pwa = window.open(url);
    // if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
    //   alert('Please disable your Pop-up blocker and try again.');
    // }
  }
}
