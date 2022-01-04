import { Injectable } from '@angular/core';
import {
  PageInformationModel,
  SearchParameter,
} from 'app/shared/models/system_model';
import { GatewayService } from 'app/core/services/gateway.service';
@Injectable({
  providedIn: 'root',
})
export class AccessService {
  serviceKey = 'access_uuid';
  servicePath = '';
  constructor(private gateway: GatewayService) {}
  getAccessTableList(search: SearchParameter): any {
    const url = `${this.servicePath}/getAccessTableList`;
    return this.gateway.list(url, search);
  }
  getAccessTableById(id: string): any {
    const url = `${this.servicePath}/getAccessTableById`;
    return this.gateway.get(url, id);
  }
  createAccessTable(data: any): any {
    const url = `${this.servicePath}/createAccessTable`;
    return this.gateway.create(url, data);
  }
  editAccessTable(data: any): any {
    const url = `${this.servicePath}/editAccessTable`;
    return this.gateway.edit(url, data);
  }
  deleteAccessTable(id: string): any {
    const url = `${this.servicePath}/deleteAccessTable`;
    return this.gateway.del(url, id);
  }
  setPath(param: PageInformationModel): void {
    this.gateway.serviceKey = this.serviceKey;
    this.servicePath = param.servicePath;
  }
}
