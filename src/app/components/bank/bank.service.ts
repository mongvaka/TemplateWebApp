import { Injectable } from '@angular/core';
import {
  PageInformationModel,
  SearchParameter,
} from 'app/shared/models/system_model';
import { GatewayService } from 'app/core/services/gateway.service';
@Injectable({
  providedIn: 'root',
})
export class BankService {
  serviceKey = 'bank_uuid';
  servicePath = '';
  constructor(private gateway: GatewayService) {}
  getBankTableList(search: SearchParameter): any {
    const url = `${this.servicePath}/getBankTableList`;
    return this.gateway.list(url, search);
  }
  getBankTableById(id: string): any {
    const url = `${this.servicePath}/getBankTableById`;
    return this.gateway.get(url, id);
  }
  createBankTable(data: any): any {
    const url = `${this.servicePath}/createBankTable`;
    return this.gateway.create(url, data);
  }
  editBankTable(data: any): any {
    const url = `${this.servicePath}/editBankTable`;
    return this.gateway.edit(url, data);
  }
  deleteBankTable(id: string): any {
    const url = `${this.servicePath}/deleteBankTable`;
    return this.gateway.del(url, id);
  }
  setPath(param: PageInformationModel): void {
    this.gateway.serviceKey = this.serviceKey;
    this.servicePath = param.servicePath;
  }
}
