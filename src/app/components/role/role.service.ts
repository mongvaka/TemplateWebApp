import { Injectable } from '@angular/core';
import {
  PageInformationModel,
  SearchParameter,
} from 'app/shared/models/system_model';
import { GatewayService } from 'app/core/services/gateway.service';
@Injectable({
  providedIn: 'root',
})
export class RoleService {
  serviceKey = 'role_uuid';
  servicePath = '';
  constructor(private gateway: GatewayService) {}
  getRoleTableList(search: SearchParameter): any {
    const url = `${this.servicePath}/getRoleTableList`;
    return this.gateway.list(url, search);
  }
  getRoleTableById(id: string): any {
    const url = `${this.servicePath}/getRoleTableById`;
    return this.gateway.get(url, id);
  }
  createRoleTable(data: any): any {
    const url = `${this.servicePath}/createRoleTable`;
    return this.gateway.create(url, data);
  }
  editRoleTable(data: any): any {
    const url = `${this.servicePath}/editRoleTable`;
    return this.gateway.edit(url, data);
  }
  deleteRoleTable(id: string): any {
    const url = `${this.servicePath}/deleteRoleTable`;
    return this.gateway.del(url, id);
  }
  setPath(param: PageInformationModel): void {
    this.gateway.serviceKey = this.serviceKey;
    this.servicePath = param.servicePath;
  }
}
