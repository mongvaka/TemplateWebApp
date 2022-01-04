import { Injectable } from '@angular/core';
import {
  PageInformationModel,
  SearchParameter,
} from 'app/shared/models/system_model';
import { GatewayService } from 'app/core/services/gateway.service';
@Injectable({
  providedIn: 'root',
})
export class AccessRightsService {
  serviceKey = 'access_rights_uuid';
  servicePath = '';
  constructor(private gateway: GatewayService) {}
  getAccessRightsTableList(search: SearchParameter): any {
    const url = `${this.servicePath}/getAccessRightsTableList`;
    return this.gateway.list(url, search);
  }
  getAccessRightsTableById(id: string): any {
    const url = `${this.servicePath}/getAccessRightsTableById`;
    return this.gateway.get(url, id);
  }
  createAccessRightsTable(data: any): any {
    const url = `${this.servicePath}/createAccessRightsTable`;
    return this.gateway.create(url, data);
  }
  editAccessRightsTable(data: any): any {
    const url = `${this.servicePath}/editAccessRightsTable`;
    return this.gateway.edit(url, data);
  }
  deleteAccessRightsTable(id: string): any {
    const url = `${this.servicePath}/deleteAccessRightsTable`;
    return this.gateway.del(url, id);
  }
  setPath(param: PageInformationModel): void {
    this.gateway.serviceKey = this.serviceKey;
    this.servicePath = param.servicePath;
  }
}
