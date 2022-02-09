import { Injectable } from '@angular/core';
import {
  PageInformationModel,
  SearchParameter,
} from 'app/shared/models/system_model';
import { GatewayService } from 'app/core/services/gateway.service';
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  serviceKey = 'register_uuid';
  servicePath = '';
  constructor(private gateway: GatewayService) {}
  getRegisterTableList(search: SearchParameter): any {
    const url = `${this.servicePath}/getRegisterTableList`;
    return this.gateway.list(url, search);
  }
  getRegisterTableById(id: string): any {
    const url = `${this.servicePath}/getRegisterTableById`;
    return this.gateway.get(url, id);
  }
  createRegisterTable(data: any): any {
    const url = `${this.servicePath}/createRegisterTable`;
    return this.gateway.create(url, data);
  }
  editRegisterTable(data: any): any {
    const url = `${this.servicePath}/editRegisterTable`;
    return this.gateway.edit(url, data);
  }
  deleteRegisterTable(id: string): any {
    const url = `${this.servicePath}/deleteRegisterTable`;
    return this.gateway.del(url, id);
  }
  setPath(param: PageInformationModel): void {
    this.gateway.serviceKey = this.serviceKey;
    this.servicePath = param.servicePath;
  }
}
