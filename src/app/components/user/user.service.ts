import { Injectable } from '@angular/core';
import {
  PageInformationModel,
  SearchParameter,
} from 'app/shared/models/system_model';
import { GatewayService } from 'app/core/services/gateway.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  serviceKey = 'user_uuid';
  servicePath = '';
  constructor(private gateway: GatewayService) {}
  getUserTableList(search: SearchParameter): any {
    const url = `${this.servicePath}/getUserTableList`;
    return this.gateway.list(url, search);
  }
  getUserTableById(id: string): any {
    const url = `${this.servicePath}/getUserTableById`;
    return this.gateway.get(url, id);
  }
  createUserTable(data: any): any {
    const url = `${this.servicePath}/createUserTable`;
    return this.gateway.create(url, data);
  }
  editUserTable(data: any): any {
    const url = `${this.servicePath}/editUserTable`;
    return this.gateway.edit(url, data);
  }
  deleteUserTable(id: string): any {
    const url = `${this.servicePath}/deleteUserTable`;
    return this.gateway.del(url, id);
  }
  setPath(param: PageInformationModel): void {
    this.gateway.serviceKey = this.serviceKey;
    this.servicePath = param.servicePath;
  }
}
