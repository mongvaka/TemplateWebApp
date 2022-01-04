import { Injectable } from '@angular/core';
import {
  PageInformationModel,
  SearchParameter,
} from 'app/shared/models/system_model';
import { GatewayService } from 'app/core/services/gateway.service';
@Injectable({
  providedIn: 'root',
})
export class SubscribeService {
  serviceKey = 'subscribe_uuid';
  servicePath = '';
  constructor(private gateway: GatewayService) {}
  getSubscribeTableList(search: SearchParameter): any {
    const url = `${this.servicePath}/getSubscribeTableList`;
    return this.gateway.list(url, search);
  }
  getSubscribeTableById(id: string): any {
    const url = `${this.servicePath}/getSubscribeTableById`;
    return this.gateway.get(url, id);
  }
  createSubscribeTable(data: any): any {
    const url = `${this.servicePath}/createSubscribeTable`;
    return this.gateway.create(url, data);
  }
  editSubscribeTable(data: any): any {
    const url = `${this.servicePath}/editSubscribeTable`;
    return this.gateway.edit(url, data);
  }
  deleteSubscribeTable(id: string): any {
    const url = `${this.servicePath}/deleteSubscribeTable`;
    return this.gateway.del(url, id);
  }
  setPath(param: PageInformationModel): void {
    this.gateway.serviceKey = this.serviceKey;
    this.servicePath = param.servicePath;
  }
}
