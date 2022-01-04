import { Injectable } from '@angular/core';
import {
  PageInformationModel,
  SearchParameter,
} from 'app/shared/models/system_model';
import { GatewayService } from 'app/core/services/gateway.service';
@Injectable({
  providedIn: 'root',
})
export class SubscribeTransService {
  serviceKey = 'subscribe_trans_uuid';
  servicePath = '';
  constructor(private gateway: GatewayService) {}
  getSubscribeTransTableList(search: SearchParameter): any {
    const url = `${this.servicePath}/getSubscribeTransTableList`;
    return this.gateway.list(url, search);
  }
  getSubscribeTransTableById(id: string): any {
    const url = `${this.servicePath}/getSubscribeTransTableById`;
    return this.gateway.get(url, id);
  }
  createSubscribeTransTable(data: any): any {
    const url = `${this.servicePath}/createSubscribeTransTable`;
    return this.gateway.create(url, data);
  }
  editSubscribeTransTable(data: any): any {
    const url = `${this.servicePath}/editSubscribeTransTable`;
    return this.gateway.edit(url, data);
  }
  deleteSubscribeTransTable(id: string): any {
    const url = `${this.servicePath}/deleteSubscribeTransTable`;
    return this.gateway.del(url, id);
  }
  setPath(param: PageInformationModel): void {
    this.gateway.serviceKey = this.serviceKey;
    this.servicePath = param.servicePath;
  }
}
