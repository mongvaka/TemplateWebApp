import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { getEnvironment } from '../../shared/config/globalvar.config';
import {
  isNullOrUndefined,
  isNullOrUndefOrEmpty,
} from '../../shared/functions/value.function';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  api: string;
  jsonApi: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}
  public Post(
    url: string,
    data: any,
    defualt?: any,
    option?: any
  ): Observable<any> {
    const env = getEnvironment();
    if (!isNullOrUndefined(env)) {
      this.api = env.baseURL;
    }
    // this.UrlDetecting(url, false);
    return new Observable((observer) => {
      this.http.post(url, data, option).subscribe(
        (res) => {
          observer.next(res);
        },
        (err) => {
          observer.error(err);
        },
        () => {
          observer.complete();
          // this.UrlDetecting(url, true);
        }
      );
    });
  }
  public Get(url: string, option?: any): Observable<any> {
    const env = getEnvironment();
    if (!isNullOrUndefined(env)) {
      this.api = env.baseURL;
    }
    return new Observable((observer) => {
      this.http.get(url, option).subscribe(
        (res) => {
          observer.next(res);
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
