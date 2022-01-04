import { Injectable } from '@angular/core';
import {
  PageInformationModel,
  SearchParameter,
} from 'app/shared/models/system_model';
import { GatewayService } from 'app/core/services/gateway.service';
@Injectable({
  providedIn: 'root',
})
export class StatusService {
  serviceKey = 'status_uuid';
  servicePath = '';
  constructor(private gateway: GatewayService) {}
  getStatusTableList(search: SearchParameter): any {
    const url = `${this.servicePath}/getStatusTableList`;
    return this.gateway.list(url, search);
  }
  getStatusTableById(id: string): any {
    const url = `${this.servicePath}/getStatusTableById`;
    return this.gateway.get(url, id);
  }
  createStatusTable(data: any): any {
    const url = `${this.servicePath}/createStatusTable`;
    return this.gateway.create(url, data);
  }
  editStatusTable(data: any): any {
    const url = `${this.servicePath}/editStatusTable`;
    return this.gateway.edit(url, data);
  }
  deleteStatusTable(id: string): any {
    const url = `${this.servicePath}/deleteStatusTable`;
    return this.gateway.del(url, id);
  }
  setPath(param: PageInformationModel): void {
    this.gateway.serviceKey = this.serviceKey;
    this.servicePath = param.servicePath;
  }
}
