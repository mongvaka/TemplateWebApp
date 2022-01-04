import { Injectable } from '@angular/core';
import {
  PageInformationModel,
  SearchParameter,
} from 'app/shared/models/system_model';
import { GatewayService } from 'app/core/services/gateway.service';
@Injectable({
  providedIn: 'root',
})
export class AccessFeatureCreateAutoService {
  serviceKey = 'employee_uuid';
  servicePath = '';
  constructor(private gateway: GatewayService) {}
  getAdjustTransferList(search: SearchParameter): any {
    const url = `${this.servicePath}/getEmployeeTableList`;
    return this.gateway.list(url, search);
  }
  getAdjustTransferById(id: string): any {
    const url = `${this.servicePath}/getInitialDataAdjustTransfer`;
    return this.gateway.get(url, id);
  }
  createTransferTrans(data: any): any {
    const url = `${this.servicePath}/createTransferTransTable`;
    return this.gateway.create(url, data);
  }
  editAdjustTransfer(data: any): any {
    const url = `${this.servicePath}/editAdjustTransfer`;
    return this.gateway.edit(url, data);
  }
  deleteAdjustTransfer(id: string): any {
    const url = `${this.servicePath}/deleteEmployeeTable`;
    return this.gateway.del(url, id);
  }
  postAdjustTransfer(data: any): any {
    const url = `${this.servicePath}/postStatusAdjustTransfer`;
    return this.gateway.edit(url, data);
  }
  setPath(param: PageInformationModel): void {
    this.gateway.serviceKey = this.serviceKey;
    this.servicePath = param.servicePath;
  }
}
