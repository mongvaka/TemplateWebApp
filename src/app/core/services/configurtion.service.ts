import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ConfigurationModel } from '../../shared/models/system_model';
import { Location } from '@angular/common';

@Injectable()
export class ConfigurationService {
  private readonly configUrlPath: string = 'ClientConfiguration';
  private configData: ConfigurationModel;
  constructor(private location: Location, private http: HttpClient) {}

  loadConfigurationData(): Promise<ConfigurationModel> {
    return this.http
      .get(this.location.prepareExternalUrl('/assets/appsettings.json'))
      .toPromise()
      .then((response: Response) => {
        this.configData = <any>response;
        return this.http
          .get(this.location.prepareExternalUrl('/assets/adminsettings.json'))
          .toPromise()
          .then((res) => {
            this.setAdminsettingsValuesToConfigurationModel(res);
            return this.configData;
          })
          .catch((error) => {
            return Promise.reject(error);
          });
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  get config(): ConfigurationModel {
    return this.configData;
  }
  private setAdminsettingsValuesToConfigurationModel(adminSettings: any): void {
    this.configData.toastTimeout = adminSettings.toastTimeout;
  }
}
